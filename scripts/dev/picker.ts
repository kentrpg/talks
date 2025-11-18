import fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import prompts from 'prompts'

function handleError(error: unknown, context: string) {
  console.error(`❌ ${context}:`, error)
  process.exit(1)
}

class PickerPhaseError extends Error {
  constructor(
    public readonly context: 'folder parser 失敗' | '執行失敗',
    message: string,
    public readonly originalError?: unknown,
  ) {
    super(message)
    this.name = 'PickerPhaseError'
  }
}

type FolderParserResult = {
  folder: string
  sanitizedArgs: string[]
}

async function parseFolder(args: string[]): Promise<FolderParserResult> {
  try {
    const rootDir = new URL('../../', import.meta.url)
    const folders = (await fs.readdir(rootDir, { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(folder => folder.match(/^\d{4}-/))
      .sort((a, b) => -a.localeCompare(b))

    if (folders.length === 0)
      throw new PickerPhaseError('folder parser 失敗', '❌ 沒有找到符合格式的日期目錄 (YYYY-MM-DD)')

    const hasYesFlag = args.includes('-y')
    const sanitizedArgs = hasYesFlag ? args.filter(arg => arg !== '-y') : [...args]
    let folder: string | undefined

    if (hasYesFlag) {
      folder = folders[0]
      console.log(`✅ 自動選擇最新目錄: ${folder}`)
    } else {
      try {
        const result = await prompts([
          {
            type: 'select',
            name: 'folder',
            message: 'Pick a folder',
            choices: folders.map(entry => ({ title: entry, value: entry })),
          },
        ])
        folder = result.folder
      } catch (error) {
        throw new PickerPhaseError('folder parser 失敗', '互動式選擇被中止', error)
      }
    }

    if (!folder)
      throw new PickerPhaseError('folder parser 失敗', '❌ 未選擇目錄')

    return {
      folder,
      sanitizedArgs,
    }
  } catch (error) {
    if (error instanceof PickerPhaseError)
      throw error
    throw new PickerPhaseError('folder parser 失敗', '讀取日期目錄失敗', error)
  }
}

async function runScript(folder: string, args: string[]) {
  const subdirectory = 'src'
  const slidevName = 'slides.md'
  const srcPath = new URL(`../../${folder}/${subdirectory}`, import.meta.url)
  const slidevPath = new URL(`${srcPath}/${slidevName}`, import.meta.url)
  const commandArgs = [...args]

  try {
    if (commandArgs[0] === 'dev') {
      execa('cursor', [fileURLToPath(slidevPath)]).catch((error) => {
        console.error('❌ execa cursor 執行失敗:', error)
      })
    } else if (commandArgs[0] === 'build') {
      await execa('pnpm', ['rimraf', 'dist'], {
        cwd: fileURLToPath(srcPath),
        stdio: 'inherit',
      })
    } else if (commandArgs[0] === 'export') {
      let fileName = folder
      const hasEntryArg = commandArgs.length > 1 && !commandArgs[1].startsWith('-')
      if (!hasEntryArg)
        commandArgs.splice(1, 0, slidevName)
      const hasOutputOption = commandArgs.includes('--output')

      const content = await fs.readFile(slidevPath, 'utf-8')
      const frontmatter = content.match(/^---([\s\S]*?)---/)
      const frontmatterContent = frontmatter?.[1]
      const extractFrontmatterValue = (field: string) => {
        if (!frontmatterContent)
          return undefined
        const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const match = frontmatterContent.match(new RegExp(`^${escapedField}:\\s*(.+)$`, 'm'))
        return match?.[1]?.trim().replace(/^['"]|['"]$/g, '')
      }

      const exportFilename = extractFrontmatterValue('exportFilename')
      if (exportFilename) {
        fileName = exportFilename
      } else {
        const title = extractFrontmatterValue('title')
        if (title) {
          const slugTitle = title.replace(/[^\w\-\u4E00-\u9FA5 ]+/g, '').replace(/\s+/g, '-')
          if (slugTitle)
            fileName = slugTitle
        }
      }

      const normalizedFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`
      const outputPath = `../${normalizedFileName}`

      if (!hasOutputOption)
        commandArgs.push('--output', outputPath)
    } else {
      throw new PickerPhaseError('執行失敗', '未知的命令')
    }

    await execa('pnpm', ['run', ...commandArgs], {
      cwd: fileURLToPath(srcPath),
      stdio: 'inherit',
    })
  } catch (error) {
    throw new PickerPhaseError('執行失敗', '腳本執行失敗', error)
  }
}

export async function startPicker(args: string[]) {
  try {
    const { folder, sanitizedArgs } = await parseFolder(args)
    await runScript(folder, sanitizedArgs)
  } catch (error) {
    if (error instanceof PickerPhaseError) {
      handleError(error.originalError ?? error, error.context)
      return
    }
    handleError(error, '發生非預期錯誤')
  }
}

if (import.meta.url.startsWith('file:')) {
  startPicker(process.argv.slice(2))
}