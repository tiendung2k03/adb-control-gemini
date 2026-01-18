# Contributing to AureDroid

First off, thank you for considering contributing to AureDroid! It's people like you who make this tool better for the AI and Android automation community.

To maintain the quality and stability of the project, please follow these guidelines.

## 🛡️ The Golden Rule: Protect the main Branch

To ensure the stability of the production code:

* Never push changes directly to the main branch.
* All changes must be submitted via a Pull Request (PR).
* The main branch is reserved for stable, reviewed, and tested code.

## 🚀 How to Contribute

### 1. Fork & Clone

* Fork this repository to your own GitHub account.
* Clone your fork to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/adb-control-gemini.git
cd adb-control-gemini
```

### 2. Create a Feature Branch

Always create a new branch for your work. Use descriptive names:

```bash
# For new features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/issue-description
```

### 3. Set Up Your Environment

Since this project uses both Python and TypeScript, ensure you have the requirements installed:

* **Python (ADB Logic & OpenCV):**

```bash
pip install -r requirements.txt
```

* **TypeScript (MCP Server):**

```bash
cd mcp-server
npm install
npm run build
```

### 4. Development Guidelines

* **Adding ADB Commands:** New commands should be added as .toml files in the `commands/android/` directory.
* **Complex Logic:** Use the `utils/` directory for Python-based logic (OpenCV, screen processing, etc.).
* **MCP Protocol:** Modify the TypeScript source in `mcp-server/` if you are updating how the AI interacts with the server.
* **Code Style:**
  * Python: Follow PEP 8 standards.
  * TypeScript: Use Prettier for formatting.

### 5. Commit and Push

* Keep your commits small and focused.
* Use clear commit messages:

```bash
git commit -m "feat: add support for biometric authentication bypass"
```

* Push to your fork:

```bash
git push origin feature/your-feature-name
```

### 6. Submit a Pull Request (PR)

* Go to the original tiendung2k03/adb-control-gemini repository.
* Click "Compare & pull request".
* Provide a detailed description of what you changed and why.
* Reference any related Issues (e.g., `Closes #123`).

## 📋 Pull Request Checklist

Before submitting your PR, please make sure:

* [ ] Your code runs correctly on a real Android device or emulator.
* [ ] You have not included any sensitive information (API keys, personal logs).
* [ ] Your branch is up-to-date with the latest main branch.
* [ ] The documentation (README or specific .md files) is updated if necessary.

## ⚖️ License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

Thank you for your support! 🚀

If you have any questions, feel free to open an Issue or reach out via our Telegram community.
