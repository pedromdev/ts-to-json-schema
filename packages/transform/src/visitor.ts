import * as ts from "typescript";
import { ExpressionBuilder } from "./expression.builder";
import { SchemaTransformer } from "./schema.transformer";
import { transformChain } from "./chain/chain";
import { CycleResolver } from "./cycle.resolver";
import { TypescriptAdapter } from "./typescript.adapter";

export class Visitor {
  private readonly typescriptAdapter = new TypescriptAdapter(this.typeChecker);

  constructor(
    private readonly typeChecker: ts.TypeChecker,
    private readonly context: ts.TransformationContext,
  ) {}

  public visit(source: ts.SourceFile) {
    return ts.visitEachChild(source, node => this.visitNode(node), this.context);
  }

  private visitNode(node: ts.Node): ts.VisitResult<ts.Node> {
    return this.isToJsonSchemaCall(node)
      ? this.updateCallExpression(node)
      : ts.visitEachChild(node, n => this.visitNode(n), this.context);
  }

  private isToJsonSchemaCall(node: ts.Node): node is ts.CallExpression {
    if (!ts.isCallExpression(node)) {
      return false;
    }

    const symbolAtLocation = this.typeChecker.getSymbolAtLocation(node.expression);

    if (!symbolAtLocation || !(symbolAtLocation.flags & ts.SymbolFlags.Alias)) {
      return false;
    }

    const originalSymbol = this.typeChecker.getAliasedSymbol(symbolAtLocation!);

    return originalSymbol.getName() === 'toJsonSchema' && this.isImportedFrom(originalSymbol, '@ts-to-json-schema/core');
  }

  private isImportedFrom(symbol: ts.Symbol, module: string) {
    const [declaration] = symbol.getDeclarations() || [];
    let parent = declaration?.parent;

    while (!ts.isModuleDeclaration(parent) && parent.parent) {
      parent = parent.parent;
    }

    return ts.isModuleDeclaration(parent) && parent.name.getText().includes(module);
  }

  private updateCallExpression(node: ts.CallExpression) {
    const typeArgument = node.typeArguments![0];
    const transformer = new SchemaTransformer(this.typeChecker, typeArgument, transformChain);
    const type = this.typeChecker.getTypeAtLocation(typeArgument);
    const schema = transformer.transform(type);
    const resolvedCyclesSchema = CycleResolver.parse(schema);
    const expression = ExpressionBuilder.build(resolvedCyclesSchema);
    const newCallExpression = this.typescriptAdapter.createCallExpression(
      node.expression,
      undefined,
      [expression],
    );

    return this.typescriptAdapter.updateCallExpression(
      node,
      newCallExpression,
      node.typeArguments,
      node.arguments,
    );
  }
}
