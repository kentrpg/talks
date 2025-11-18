import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup(async (_monaco) => {
  return {
    editorOptions: {
      fontSize: 14,
    },
  }
})