---
trigger: always_on
---

# Code Quality & Verification Rules

## Purpose

These rules establish standards for code quality, static analysis, type checking, and verification workflows in Campus Compass.

---

## 1. Verification-Driven Definition of Done

Code changes are NOT complete simply because source files were edited without syntax errors.

A feature, fix, or refactor is complete ONLY after following this workflow:

```text
Plan  -->  Implement  -->  Lint  -->  Build  -->  Verify Runtime  -->  Commit
```

- **Static Analysis**: Run `npm run lint` to ensure zero ESLint errors or warnings.
- **Type Compilation**: Run `npm run build` to confirm TypeScript type-checking (`tsc -b`) and Vite production bundle compilation succeed cleanly.
- **Empirical Verification**: Verify UI rendering, interaction, and map behaviors before declaring success.

---

## 2. Code Quality & Formatting Standards

- **ESLint & TypeScript Rules**: Follow configured ESLint (`@eslint/js`, `eslint-plugin-react-hooks`, `typescript-eslint`) standards strictly.
- **Clean Console Output**: Code must not introduce unhandled exceptions, console errors, or unhandled promise rejections in browser runtime.
- **No Swallowed Exceptions**: Never use empty `catch` blocks or suppress error logging without handling root causes.

---

## 3. Preserving Documentation & API Contracts

- **Comments & Annotations**: Preserve existing comments, docstrings, and licensing headers when modifying codebase files.
- **Signature Integrity**: When altering component prop definitions or helper signatures, update all invocation sites across the project.
