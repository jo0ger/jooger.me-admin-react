// MarkdownEditor Commands Helper
import {
  insertBefore,
  insertAfter,
  insertBeforeAndAfter,
  getSurroundingSelection,
  insertEmptyLineBefore,
  insertEmptyLineAfter
} from './textHelper'


export const makeCommandByInsertBefore = (text, selection, beforeText) => {
  selection = getSurroundingSelection(text, selection)
  const { newText, newSelection } = insertBefore(text, selection, beforeText)
  return {
    text: newText,
    selection: newSelection
  }
}

export const makeCommandByInsertBeforeAndAfter = (text, selection, beforeText, afterText, shouldSurrounding = true) => {
  if (shouldSurrounding) {
    selection = getSurroundingSelection(text, selection)
  }
  const { newText, newSelection } = insertBeforeAndAfter(text, selection, beforeText, afterText)
  return {
    text: newText,
    selection: newSelection
  }
}

export const makeCode = (text, selection, codeType = '') => {
  selection = getSurroundingSelection(text, selection)
  if (!text.slice(selection[0], selection[1]).includes('\n')) {
    // 如果没有换行，则是文字code
    return makeCommandByInsertBeforeAndAfter(text, selection, '`', '`')
  }

  let insertionText = {}
  // 如果需要在前面插入换行，do it
  insertionText = insertEmptyLineBefore(text, selection)
  text = insertionText.newText
  selection = insertionText.newSelection

  insertionText = insertBefore(text, selection, '```' + codeType + ' \n')
  text = insertionText.newText
  selection = insertionText.newSelection

  insertionText = insertAfter(text, selection, '\n```')
  text = insertionText.newText
  selection = insertionText.newSelection
  console.log(text, selection)
  // 如果需要在后面插入换行，do it
  insertionText = insertEmptyLineAfter(text, selection)
  text = insertionText.newText
  selection = insertionText.newSelection

  return { text, selection }
}
