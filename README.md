# @light_yagami/zenfull-sh

A CLI tool for personal ZSH environment setup automation. Stop cloning 100 repos manually—setup your perfect ZSH environment with a single command.

## Features

- ⚡ **Automated Setup**: Installs and configures your ZSH environment in seconds.
- 🛠️ **Toolchain Management**: Automatically sets up path aliases and configurations for `nvm`, `yarn`, `node`, `rust`, and more.
- 🧩 **Extensions**: Downloads and configures essential ZSH extensions and themes.
- 📦 **Personalized**: Designed as a personal setup automation tool—tweak the ZSH files once and deploy everywhere.

## Usage

You can set up your environment using this tool with a single command:

```bash
npx @light_yagami/zenfull-sh-setup
```

## Getting Started

If you want to customize the setup for your own environment:

1. Clone this repository.
2. Tweak the ZSH configuration files in the `bin/` directory.
3. Run the installation script locally:
   ```bash
   node bin/install.js
   ```

## Project Structure

```text
zenfull-sh/
├── bin/
│   ├── .zshrc          # ZSH configuration template
│   └── install.js      # Main installation script
├── src/                # Core logic
├── openspec/           # OpenSpec change management
└── package.json        # Project metadata
```

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.
