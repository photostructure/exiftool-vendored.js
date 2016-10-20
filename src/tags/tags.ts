import { exiftool } from '../exiftool'
import * as process from 'process'

const globule = require('globule')

function usage() {
  console.log('Usage: `npm run tags INPUT_DIRECTORY`')
  process.exit(1)
}

const root = process.argv[2]
const files: string[] = globule(`${root}/**/*.jpg`)

if (files.length === 0) {
  console.error(`No files found in ${root}`)
  usage()
}

class Tag {
  values = []
  constructor(readonly tag: string) {
  } // tslint:disable-line

  get group(): string { return this.tag.split(':')[0] }
  get withoutGroup(): string { return this.tag.split(':')[1] }
  get valueType(): string { return typeof this.values[0] }
}

class Tags {
  private m: { [key: string]: Tag } = {}
  add(tag: string, value: any) {
    const t: Tag = this.m[tag] || (this.m[tag] = new Tag(tag))
    t.values += value
  }
  tagsByPopularity(): Tag[] {
    const values = Object.keys(this.m).map(key => this.m[key])
    return values.sort((a, b) => a.values.length - b.values.length)
  }
}

function arrComp(a: any[], b: any[]): number {
  return a > b ? 1 : a < b ? -1 : 0
}

const tags = new Tags()

Promise.all(files.slice(0, 10).map(file => {
  exiftool.readGrouped(file).then((metadata: any) => {
    for (const key in Object.keys(metadata)) {
      tags.add(key, metadata[key])
    }
    process.stdout.write('.')
  })
})).then(() => {
  console.log('Done! Sorting by popularity...')
  type GroupedTags = { [groupName: string]: Tag[] }
  const topK = tags.tagsByPopularity().slice(1000)
  const groupedTags: GroupedTags = {}
  topK.forEach(tag => {
    const key = tag.group;
    (groupedTags[key] || (groupedTags[key] = [])).push(tag)
  })
  for (const group in groupedTags) {
    console.log(`export interface ${group}Metadata {`)
    groupedTags[group].forEach(tag =>
      console.log(`  ${tag.withoutGroup}: ${tag.valueType} // ${tag.values[0]}`)
    )
    console.log(`}\n`)
  }
})

