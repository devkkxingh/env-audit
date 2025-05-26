# 🔍 env-audit

> A powerful CLI tool to audit environment variable usage in your JavaScript/TypeScript projects. Scan your codebase to find missing, unused, and properly configured environment variables.

[![npm version](https://badge.fury.io/js/env-audit.svg)](https://badge.fury.io/js/env-audit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔍 **Smart Code Scanning** - Analyzes JavaScript, TypeScript, JSX, and TSX files
- 📋 **Comprehensive Audit** - Identifies missing, unused, and properly configured environment variables
- 🎨 **Beautiful Output** - Color-coded results with clear visual indicators
- ⚡ **Fast Performance** - Uses AST parsing for accurate detection
- 🛡️ **Error Handling** - Gracefully handles unreadable files and parsing errors
- 📁 **Smart Filtering** - Automatically ignores common build directories

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g env-audit
```

### Local Installation

```bash
npm install --save-dev env-audit
```

### Using npx (No Installation Required)

```bash
npx env-audit
```

## 📖 Usage

Navigate to your project directory and run:

```bash
env-audit
```

The tool will:

1. Look for a `.env` file in your current directory
2. Scan all JavaScript/TypeScript files in your project
3. Analyze `process.env` usage patterns
4. Generate a comprehensive audit report

## 📊 Output Example

```
┌──────────────────────────────────────────────┐
│                                              │
│            ENV-AUDIT CLI TOOL                │
│     Validate & Audit Your .env Usage         │
│                                              │
└──────────────────────────────────────────────┘

✅ .env loaded
   └─ /path/to/your/project/.env
   └─ Found 5 keys

🔎 Scanning project for used environment variables...

📋 Audit Result:

❌ Missing in .env:
   ✗ API_SECRET
   ✗ WEBHOOK_URL

⚠️ Unused keys in .env:
   • OLD_DATABASE_URL
   • DEPRECATED_KEY

🧩 Used & present in .env:
   • DATABASE_URL
   • API_KEY
   • NODE_ENV

──────────────────────────────────────────────
📦 Scanned 42 files | 5 used env keys
──────────────────────────────────────────────
```

## 🎯 What It Detects

### Missing Variables

Environment variables used in your code but not defined in your `.env` file:

```javascript
// This will be flagged if API_SECRET is not in .env
const secret = process.env.API_SECRET;
```

### Unused Variables

Environment variables defined in your `.env` file but never used in your code:

```bash
# .env
UNUSED_VARIABLE=some_value  # Will be flagged as unused
```

### Properly Configured Variables

Environment variables that are both defined in `.env` and used in your code:

```javascript
// ✅ Properly configured if DATABASE_URL exists in .env
const dbUrl = process.env.DATABASE_URL;
```

## 📁 File Support

The tool scans the following file types:

- `.js` - JavaScript files
- `.ts` - TypeScript files
- `.jsx` - React JSX files
- `.tsx` - React TypeScript files

### Automatically Ignored Directories

- `node_modules/`
- `dist/`
- `.next/`
- `build/`

## 🔧 Requirements

- Node.js 14.0.0 or higher
- A `.env` file in your project root
- JavaScript/TypeScript project with `process.env` usage

## 🛠️ Development

### Local Development Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd env-audit
```

2. Install dependencies:

```bash
npm install
```

3. Run the tool locally:

```bash
npm start
```

### Project Structure

```
env-audit/
├── bin/
│   └── env-audit.js     # CLI entry point
├── src/
│   └── index.js         # Main application logic
├── package.json         # Package configuration
└── README.md           # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [existing issues](../../issues)
2. Create a new issue with detailed information
3. Include your Node.js version and operating system

## 🙏 Acknowledgments

Built with:

- [Babel Parser](https://babeljs.io/docs/en/babel-parser) - JavaScript/TypeScript AST parsing
- [Chalk](https://github.com/chalk/chalk) - Terminal styling
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable loading
- [fast-glob](https://github.com/mrmlnc/fast-glob) - Fast file system globbing

---

Made with ❤️ by [Krishna](https://github.com/krishna)
