import fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import prompts from 'prompts'

async function startPicker(args: string[]) {
  const subdirectory = 'src'
  const slidevName = 'slides.md'
  const folders = (await fs.readdir(new URL('..', import.meta.url), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(folder => folder.match(/^\d{4}-/))
    .sort((a, b) => -a.localeCompare(b))

  const result = args.includes('-y')
    ? { folder: folders[0] }
    : await prompts([
        {
          type: 'select',
          name: 'folder',
          message: 'Pick a folder',
          choices: folders.map(folder => ({ title: folder, value: folder })),
        },
      ])

  args = args.filter(arg => arg !== '-y')

  if (result.folder) {
    const srcPath = new URL(`../${result.folder}/${subdirectory}`, import.meta.url)
    const slidevPath = new URL(`${srcPath}/${slidevName}`, import.meta.url)

    if (args[0] === 'dev')
      execa('cursor', [fileURLToPath(slidevPath)])
    if (args[0] === 'build') {
      await execa('pnpm', ['rimraf', 'dist'], {
        cwd: srcPath,
        stdio: 'inherit',
      })
    }
    if (args[0] === 'export') {
      let fileName = result.folder

      const content = await fs.readFile(slidevPath, 'utf-8')
      const frontmatter = content.match(/^---([\s\S]*?)---/)
      let [, title] = frontmatter?.[1]?.match(/title:\s*(.+)/) || []
      if (title) {
        title = title.trim().replace(/^['"]|['"]$/g, '')
        const slugTitle = title.replace(/[^\w\-\u4E00-\u9FA5 ]+/g, '').replace(/\s+/g, '-')
        if (slugTitle)
          fileName = slugTitle
      }

      args.push('--output', `../${fileName}.pdf`)
    }
    await execa('pnpm', ['run', ...args], {
      cwd: srcPath,
      stdio: 'inherit',
    })
  }
}

await startPicker(process.argv.slice(2))