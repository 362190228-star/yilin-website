#!/bin/bash
# 双击即可预览网站。会自动启动本地服务器并打开浏览器。
# 关闭预览：回到这个终端窗口按 Control + C，或直接关掉窗口。

cd "$(dirname "$0")" || exit 1

echo ""
echo "  ┌───────────────────────────────────────────┐"
echo "  │   蔡艺琳 作品集 · 本地预览                │"
echo "  └───────────────────────────────────────────┘"
echo ""

# --- 检查 Node 是否装了 -------------------------------------------------
if ! command -v npm >/dev/null 2>&1; then
  # 双击运行时 PATH 可能不含 Homebrew / nvm，手动补上常见位置
  export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
  [ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "  ✗ 没有找到 Node.js。"
  echo ""
  echo "    请先到 https://nodejs.org 下载安装 LTS 版本，"
  echo "    装完之后再双击这个文件一次。"
  echo ""
  echo "  按回车键关闭…"
  read -r
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[ -n "$BRANCH" ] && echo "  当前分支：$BRANCH"

# --- 首次运行时装依赖 ---------------------------------------------------
if [ ! -d node_modules ]; then
  echo "  首次运行，正在安装依赖（可能要几分钟）…"
  echo ""
  npm install || {
    echo ""
    echo "  ✗ 依赖安装失败。把上面的报错发给 Claude 看看。"
    echo "  按回车键关闭…"
    read -r
    exit 1
  }
fi

# --- 等服务器起来后自动开浏览器 -----------------------------------------
(
  for _ in $(seq 1 40); do
    sleep 0.5
    if curl -s -o /dev/null "http://localhost:5173"; then
      open "http://localhost:5173"
      break
    fi
  done
) &

echo ""
echo "  正在启动… 浏览器会自动打开 http://localhost:5173"
echo "  想停下来：在这个窗口按 Control + C"
echo ""

npm run dev

echo ""
echo "  预览已停止。按回车键关闭窗口…"
read -r
