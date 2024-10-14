import { updateProgressBar } from './update_progress_bar.js'

let total = 0
let kept = 0
let lastEntityId = ''

export function updateWithLastData () {
  updateProgressBar(lastEntityId, kept, total)
}

export const beforeFilter = () => total++

export function afterFilter (entity) {
  kept++
  lastEntityId = entity.id
  updateWithLastData()
}

export const afterNegativeFilter = updateWithLastData
