import { transformerNotationHighlight } from '@shikijs/transformers'
import { defineShikiSetup } from '@slidev/types'

function createCustomAnnotationTransformer() {
  const annotatedLines = new Map<number, { type: string, message: string }>()

  return {
    ...transformerNotationHighlight(),
    name: 'custom-annotations',
    preprocess(code: string) {
      annotatedLines.clear()
      const lines = code.split('\n')

      lines.forEach((line, lineIndex) => {
        const match = line.match(/^(\s*)\/\/\s*@(warn|error|log|annotate):(.*)$/)
        if (match) {
          const [, , type, message] = match
          annotatedLines.set(lineIndex, {
            type: type.trim(),
            message: message.trim(),
          })
        }
      })

      return code
    },
    span(node: any, line: number, _col: number) {
      const lineIndex = line - 1
      if (annotatedLines.has(lineIndex) && node.children && node.children[0]) {
        const annotation = annotatedLines.get(lineIndex)!
        const tokenContent = node.children[0].value || ''
        const annotationRegex = new RegExp(`^(\\s*)//\\s*@${annotation.type}:(.*)$`)
        const match = tokenContent.match(annotationRegex)

        if (match) {
          const [, indent, message] = match
          const cleanContent = `${indent}${message.trim()}`
          node.children[0].value = cleanContent
        }
      }
    },
    line(node: any, line: number) {
      const lineIndex = line - 1
      if (annotatedLines.has(lineIndex)) {
        const annotation = annotatedLines.get(lineIndex)!
        this.addClassToHast(node, 'twoslash-tag-line')
        if (annotation.type !== 'log') {
          this.addClassToHast(node, `twoslash-tag-${annotation.type}-line`)
        }
      }
    },
  }
}

export default defineShikiSetup(() => {
  return {
    transformers: [createCustomAnnotationTransformer()],
  }
})