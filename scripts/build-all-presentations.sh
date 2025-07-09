#!/bin/bash

# Build All Slidev Presentations Script 

set -e

mkdir -p dist
found_valid_slidev=false

for src_path in */src; do
  if [ ! -d "$src_path" ]; then
    continue
  fi

  folder=$(dirname "$src_path")

  if [[ ! $folder =~ ^[0-9]{4}- ]]; then
    continue
  fi

  if [ ! -f "$src_path/slides.md" ]; then
    continue
  fi

  found_valid_slidev=true

  # install and build
  cd "$src_path"
  nci

  REPO_NAME=${1:-talks}
  nr build --base "/$REPO_NAME/$folder/"

  mkdir -p "../../dist/$folder"
  cp -r dist/* "../../dist/$folder/"

  cd ../..

  echo "success build $folder"
done

if [ "$found_valid_slidev" = false ]; then
  echo "no valid slidev project"
  exit 1
fi