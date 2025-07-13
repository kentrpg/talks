#!/bin/bash

# =============================================
# Script: run-nektos-act.sh
#
# 主要用途：
# - 互動式選擇 .github/workflows 下的 workflow yml 檔案
# - 使用 nektos/act 執行指定的 GitHub Actions workflow
# - 解壓縮產生的 artifacts，並將內容展開到 talks 目錄
# - 啟動本地 server (npx serve) 預覽 talks 靜態網頁
#
# 適用於 macOS，需安裝 act、gh、npx、ditto、tar 等工具
# =============================================

set -e

cleanup_folder() {
    if [ -d "$1" ]; then
        rm -rf "$1"
        echo "✅  Success - cleaned up folder: $1"
    fi
}

select_workflow() {
    workflows=($(ls .github/workflows/*.yml 2>/dev/null | xargs -n1 basename))
    if [ ${#workflows[@]} -eq 0 ]; then
        echo "❌  No workflow files found in .github/workflows/"
        exit 1
    fi

    echo "Please enter the number to select a workflow file to run:"
    select workflow in "${workflows[@]}"; do
    if [ -n "$workflow" ]; then
        break
    else
        echo "please enter a valid option."
    fi
    done
}

extract_artifacts() {
    zip_file=".artifacts/1/github-pages/github-pages.zip"
    if [ -f "$zip_file" ]; then
        cd .artifacts/1/github-pages/
        cleanup_folder talks
        echo  "🚀  Start extracting $zip_file"
        ditto -x -k github-pages.zip .
        mkdir -p talks
        tar -xf artifact.tar -C talks
        echo "✅  Success - extracted artifacts to talks folder"
        rm -f artifact.tar
    else
        echo "❌  Error - artifact zip file not found: $zip_file" >&2
        exit 1
    fi
}

npx_serve() {
    npx serve -l 4173 . &
    sleep 2
    open "http://localhost:4173/talks/"
    wait
}

cleanup_folder .artifacts

select_workflow

DOCKER_HOST=unix:///Users/kent/.orbstack/run/docker.sock act \
    -s GITHUB_TOKEN="$(gh auth token)" \
    --container-architecture linux/amd64 \
    -W .github/workflows/$workflow \
    -j validate-and-build \
    --artifact-server-path "$PWD/.artifacts"

extract_artifacts

npx_serve