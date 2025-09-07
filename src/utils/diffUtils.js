import { diffLines, diffWords, diffChars } from 'diff'

/**
 * Compara dois textos linha por linha
 * @param {string} oldText - Texto original
 * @param {string} newText - Texto alterado
 * @param {Object} options - Opções de comparação
 * @returns {Array} Array com as diferenças
 */
export function compareTextLines(oldText, newText, options = {}) {
  const { ignoreCase = false, ignoreWhitespace = false } = options
  
  return diffLines(oldText, newText, {
    ignoreCase,
    ignoreWhitespace
  })
}

/**
 * Compara dois textos palavra por palavra
 * @param {string} oldText - Texto original
 * @param {string} newText - Texto alterado
 * @param {Object} options - Opções de comparação
 * @returns {Array} Array com as diferenças
 */
export function compareTextWords(oldText, newText, options = {}) {
  const { ignoreCase = false } = options
  
  return diffWords(oldText, newText, {
    ignoreCase
  })
}

/**
 * Compara dois textos caractere por caractere
 * @param {string} oldText - Texto original
 * @param {string} newText - Texto alterado
 * @param {Object} options - Opções de comparação
 * @returns {Array} Array com as diferenças
 */
export function compareTextChars(oldText, newText, options = {}) {
  const { ignoreCase = false } = options
  
  return diffChars(oldText, newText, {
    ignoreCase
  })
}

/**
 * Calcula estatísticas das diferenças
 * @param {Array} diff - Array de diferenças retornado pelas funções de comparação
 * @returns {Object} Objeto com estatísticas
 */
export function calculateDiffStats(diff) {
  let added = 0
  let removed = 0
  let unchanged = 0
  let totalLines = 0

  diff.forEach(part => {
    const lines = part.value.split('\n').length - 1
    totalLines += lines
    
    if (part.added) {
      added += lines
    } else if (part.removed) {
      removed += lines
    } else {
      unchanged += lines
    }
  })

  const modified = Math.min(added, removed)
  const similarity = totalLines > 0 ? Math.round((unchanged / totalLines) * 100) : 100

  return {
    added,
    removed,
    modified,
    unchanged,
    totalLines,
    similarity
  }
}

/**
 * Função principal de comparação que escolhe o método baseado no tipo
 * @param {string} oldText - Texto original
 * @param {string} newText - Texto alterado
 * @param {string} type - Tipo de comparação ('lines', 'words', 'chars')
 * @param {Object} options - Opções de comparação
 * @returns {Object} Resultado da comparação com diff e estatísticas
 */
export function compareTexts(oldText, newText, type = 'lines', options = {}) {
  let diff
  
  switch (type) {
    case 'words':
      diff = compareTextWords(oldText, newText, options)
      break
    case 'chars':
      diff = compareTextChars(oldText, newText, options)
      break
    case 'lines':
    default:
      diff = compareTextLines(oldText, newText, options)
      break
  }

  const stats = calculateDiffStats(diff)

  return {
    diff,
    stats,
    type,
    options
  }
}