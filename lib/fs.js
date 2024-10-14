import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export function getDirname (fileUrl) {
  return fileURLToPath(new URL('.', fileUrl))
}

export function readJsonFile (jsonFilePath) {
  return JSON.parse(readFileSync(jsonFilePath, 'utf-8'))
}
