import { writeFile } from 'fs/promises'
import { argv } from 'process'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { coerce } from 'semver'
import { execa } from 'execa'
const minimist = require('minimist')
const { platform } = minimist(argv)
const revision = execSync('git show --pretty=format:"%B" --no-patch')
  .toString().trim()

const cwd = process.cwd()
async function publish() {
  if (!platform) {
    throw new Error('Please specify platform by esno scripts/publish.ts --platform web')
  }
  if (!coerce(revision)) {
    return
  }
  const dir = `pkg-${platform}`
  const publishName = platform === 'bundler' ? '' : `-${platform}`
  const jsonPath = resolve(cwd, `./${dir}/package.json`)
  const packageContent = require(jsonPath)
  packageContent.name = `${packageContent.name}${publishName}`
  packageContent.version = require('../package.json').version
  await writeFile(jsonPath, JSON.stringify(packageContent, null, 2) + '\n')
  const publicArgs = ['publish', '--access', 'public']
  const pkgCwd = resolve(cwd, `./${dir}`)
  await execa('npm', publicArgs, { stdio: 'inherit', cwd: pkgCwd })
}



publish().then()