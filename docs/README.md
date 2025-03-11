# TS to JSON Schema Documentation

This directory contains the documentation website for TS to JSON Schema.

## Requirements

- Node.js >= 18.0.0
- Yarn or npm

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Adding New Languages

The documentation supports multiple languages. To add a new language:

1. Create a new directory with the language code (e.g., `fr` for French)
2. Copy the content from the `en` directory
3. Translate the content
4. Update the configuration in `.vitepress/config.mts`

## Contributing

When making changes to the documentation:

1. Start the development server
2. Make your changes
3. Test in all supported languages
4. Build for production to ensure everything works
5. Create a pull request 