// MarkdownEditor Commands Helper
import {
  insertBeforeAndAfter,
  getSurroundingSelection,
} from './textHelper'

export const makeCommandByInsertAround = (text, selection, aroundText) => {
  selection = getSurroundingSelection(text, selection)
  const { newText, newSelection } = insertBeforeAndAfter(text, selection, aroundText, aroundText)
  return {
    text: newText,
    selection: newSelection
  }
}
