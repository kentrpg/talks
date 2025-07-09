#!/bin/bash

# Generate Index Page Script

set -e

TEMPLATE_FILE="scripts/templates/index.html"
if [ ! -f "$TEMPLATE_FILE" ]; then
  echo "template file not found: $TEMPLATE_FILE"
  exit 1
fi

if [ ! -d "dist" ]; then
  echo "dist directory not found"
  exit 1
fi

TEMPLATE_CONTENT=$(cat "$TEMPLATE_FILE")

PRESENTATION_ITEMS=""
presentation_count=0

for folder_path in dist/*/; do
  if [ ! -d "$folder_path" ]; then
    continue
  fi

  folder=$(basename "$folder_path")
  
  ITEM_HTML=$(cat << EOF
      <a href="./$folder/" class="presentation-item">
        <span class="material-symbols-outlined">folder_open</span>
        <span class="presentation-name">$folder</span>
      </a>
EOF
)
  
  PRESENTATION_ITEMS="$PRESENTATION_ITEMS$ITEM_HTML"
  presentation_count=$((presentation_count + 1))
done

if [ $presentation_count -eq 0 ]; then
  PRESENTATION_ITEMS='
      <div style="color: #666; font-style: italic; padding: 2rem;">
        <p>no presentations available</p>
      </div>'
fi


OUTPUT_CONTENT="${TEMPLATE_CONTENT//\{\{PRESENTATION_ITEMS\}\}/$PRESENTATION_ITEMS}"

echo "$OUTPUT_CONTENT" > dist/index.html

echo "success generate index page with $presentation_count presentations" 