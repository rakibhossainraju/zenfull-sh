# ============================================================================
# PROMPT SETUP
# ============================================================================

autoload -Uz promptinit
promptinit
prompt adam1

# ============================================================================
# HISTORY SETTINGS
# ============================================================================

HISTSIZE=5000
SAVEHIST=5000
HISTFILE=~/.zsh_history
setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_dups
setopt hist_find_no_dups

# ============================================================================
# KEYBINDINGS
# ============================================================================

bindkey -e
bindkey '^p' history-search-backward
bindkey '^n' history-search-forward
bindkey '^[w' kill-region

# ============================================================================
# COMPLETION SYSTEM
# ============================================================================

autoload -Uz compinit
compinit

eval "$(dircolors -b)"

zstyle ':completion:*' auto-description 'specify: %d'
zstyle ':completion:*' completer _expand _complete _correct _approximate
zstyle ':completion:*' format 'Completing %d'
zstyle ':completion:*' group-name ''
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' menu select=2
zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
zstyle ':completion:*' use-compctl false
zstyle ':completion:*' verbose true
zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'ls --color $realpath'
zstyle ':fzf-tab:complete:__zoxide_z:*' fzf-preview 'ls --color $realpath'

# ============================================================================
# PATH EXPORTS
# ============================================================================

export NVM_DIR="$HOME/.nvm"
export PATH="$HOME/.local/bin:$PATH"

# ============================================================================
# SHELL INTEGRATIONS
# ============================================================================

# Load nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


# ============================================================================
# PLUGIN MANAGER SETUP (ZINIT)
# ============================================================================

# Powerlevel10k instant prompt
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Homebrew setup (macOS)
if [[ -f "/opt/homebrew/bin/brew" ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Set up zinit directory
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

# Download zinit if not present
if [ ! -d "$ZINIT_HOME" ]; then
  mkdir -p "$(dirname $ZINIT_HOME)"
  git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

# Load zinit
source "${ZINIT_HOME}/zinit.zsh"

# ============================================================================
# PLUGINS AND SNIPPETS
# ============================================================================

# Theme
zinit ice depth=1
zinit light romkatv/powerlevel10k

# Core plugins
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light Aloxaf/fzf-tab

# OMZ snippets
zinit snippet OMZL::git.zsh
zinit snippet OMZP::git
zinit snippet OMZP::sudo
zinit snippet OMZP::archlinux
zinit snippet OMZP::aws
zinit snippet OMZP::kubectl
zinit snippet OMZP::kubectx
zinit snippet OMZP::command-not-found

# Replay cached completions
zinit cdreplay -q

# ============================================================================
# THEME AND TOOL CONFIGURATIONS
# ============================================================================

# Powerlevel10k customization
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# Fuzzy finder
if [ ! -f ~/.fzf.zsh ]; then
  if [ ! -d ~/.fzf ]; then
    echo "Installing fzf..."
    git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
    ~/.fzf/install --all
  fi
fi
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# ============================================================================
# ALIASES
# ============================================================================

alias ls='ls --color'
alias vim='nvim'
alias c='clear'
alias zi='zoxide query -i'
alias vpn-on='warp-cli connect'
alias vpn-off='warp-cli disconnect'

# ============================================================================
# ADDITIONAL SHELL INTEGRATIONS
# ============================================================================

eval "$(fzf --zsh)"
eval "$(zoxide init zsh)"
