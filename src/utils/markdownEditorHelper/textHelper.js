// 文本Helper

export const insertText = (text, insertionText, position) => {
  return {
    newText: `${text.slice(0, position)}${insertionText}${text.slice(position)}`,
    insertionTextLen: insertionText.length
  }
}

export const insertBefore = (text, selection, insertionText) => {
  const { newText, insertionTextLen } = insertText(text, insertionText, selection[0])
  return {
    newText,
    newSelection: selection.map(item => item + insertionTextLen)
  }
}

export const insertAfter = (text, selection, insertionText) => {
  const { newText } = insertText(text, insertionText, selection[1])
  return {
    newText,
    newSelection: selection
  }
}

export const insertBeforeAndAfter = (text, selection, beforeInsertionText = '', afterInsertionText = '') => {
  const newAfterText = insertAfter(text, selection, afterInsertionText).newText
  const { newText, newSelection } = insertBefore(newAfterText, selection, beforeInsertionText)
  return { newText, newSelection }
}

export function getSurroundingSelection (text, selection) {
  if (text && text.length && selection[0] === selection[1]) {
    selection = getSurroundingWordPosition(text, selection[0])
  }
  return selection
}

// 如果用户没有选中文本，则根据空格或者换行符筛选出当前区域块
function getSurroundingWordPosition (text, position) {
  // 空格或者换行符
  const isWordDelimiter = c => c === ' ' || c.charCodeAt(0) === 10

  let start = 0
  let end = text.length

  for (let i = position; i - 1 > -1; i--) {
    if (isWordDelimiter(text[i - 1])) {
      start = i
      break
    }
  }

  for (let i = position; i < text.length; i++) {
    if (isWordDelimiter(text[i])) {
      end = i
      break
    }
  }

  return [start, end]
}
