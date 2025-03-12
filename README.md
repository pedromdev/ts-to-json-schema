# TypeScript to JSON Schema

[![Unit Tests](https://github.com/pedromdev/ts-to-json-schema/actions/workflows/tests.yml/badge.svg)](https://github.com/pedromdev/ts-to-json-schema/actions/workflows/tests.yml)

> Get JSON Schema from TypeScript types without Generators/CLIs

## Documentation

Visit the [official documentation](https://pedromdev.github.io/ts-to-json-schema/) for detailed information on how to use this library.

## Prerequisites

TypeScript: 4.1 or newer

## Magic's secret

While you use `toJsonSchema` function from `@ts-to-json-schema/core` to retrieve JSON schemas of your application types, the `@ts-to-json-schema/transform` package
use [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get information of these types, convert into JSON Schemas and
adds them to `toJsonSchema` calls.

So you'll always need `@ts-to-json-schema/core` (as main dependency) and `@ts-to-json-schema/transform` (as dev dependency) packages.

## Installation

```bash
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch
```

## Usage

Follow the instructions in the [@ts-to-json-schema/core](/packages/core/README.md) to know how to use the core function.