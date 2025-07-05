import fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import prompts from 'prompts'

async function startPicker(args: string[]) {
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
    if (args[0] === 'dev')
      execa('cursor', [fileURLToPath(new URL(`../${result.folder}/src/slides.md`, import.meta.url))])
    if (args[0] === 'build') {
      await execa('pnpm', ['rimraf', 'dist'], {
        cwd: new URL(`../${result.folder}/src`, import.meta.url),
        stdio: 'inherit',
      })
    }
    if (args[0] === 'export') {
      const slidesPath = new URL(`../${result.folder}/src/slides.md`, import.meta.url)
      const slidesContent = await fs.readFile(slidesPath, 'utf-8')
      const frontmatterMatch = slidesContent.match(/^---([\s\S]*?)---/)
      let title = ''
      let fileName = result.folder
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const titleMatch = frontmatter.match(/title:\s*(.+)/)
        if (titleMatch) {
          title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
        }
      }
      if (title)
        fileName = title.replace(/[^\w\-\u4E00-\u9FA5 ]+/g, '').replace(/\s+/g, '-')
      args.push('--output', `../${fileName}.pdf`)
    }
    await execa('pnpm', ['run', ...args], {
      cwd: new URL(`../${result.folder}/src`, import.meta.url),
      stdio: 'inherit',
    })
  }
}

await startPicker(process.argv.slice(2))