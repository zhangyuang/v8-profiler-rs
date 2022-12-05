import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { execa } from 'execa'
import {mkdir} from 'shelljs'

const cwd = process.cwd()
const deploy = async () => {
  const demoPath = resolve(cwd, './example/package.json')
  const demoPkg = require(demoPath)
  demoPkg.dependencies['v8-profiler-rs'] = require(resolve(cwd, './package.json')).version
  console.log(demoPkg)
  await writeFile(demoPath, JSON.stringify(demoPkg, null, 2) + '\n')
  mkdir(resolve(cwd, './example/web/pkg'))
  await writeFile(resolve(cwd, './example/web/pkg/v8_profiler_rs.js'), '')
  await execa('npm', ['install'], { stdio: 'inherit', cwd: resolve(cwd, `./example`) })
  const publicArgs = ['run', 'deploy']
  await execa('npm', publicArgs, { stdio: 'inherit', cwd: resolve(cwd, `./example`) })
}

deploy().then()