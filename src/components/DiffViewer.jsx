import { useMemo } from 'react'

export default function DiffViewer({ diff, stats }) {
  const renderedDiff = useMemo(() => {
    if (!diff || diff.length === 0) {
      return null
    }

    let lineNumber = 1
    
    return diff.map((part, index) => {
      const lines = part.value.split('\n')
      // Remove a última linha vazia se existir
      if (lines[lines.length - 1] === '') {
        lines.pop()
      }

      return lines.map((line, lineIndex) => {
        const currentLineNumber = lineNumber++
        const isLastLine = index === diff.length - 1 && lineIndex === lines.length - 1
        
        // Classes para diferentes tipos de mudança
        let className = 'flex border-l-4 '
        let bgClass = ''
        let borderClass = ''
        let prefix = ' '

        if (part.added) {
          bgClass = 'bg-green-50'
          borderClass = 'border-green-500'
          prefix = '+'
        } else if (part.removed) {
          bgClass = 'bg-red-50'
          borderClass = 'border-red-500'
          prefix = '-'
        } else {
          bgClass = 'bg-white'
          borderClass = 'border-gray-200'
          prefix = ' '
        }

        className += `${bgClass} ${borderClass}`

        return (
          <div key={`${index}-${lineIndex}`} className={className}>
            <div className="w-12 flex-shrink-0 bg-gray-100 text-gray-500 text-xs text-right px-2 py-1 font-mono">
              {currentLineNumber}
            </div>
            <div className="w-6 flex-shrink-0 bg-gray-200 text-gray-600 text-xs text-center py-1 font-mono">
              {prefix}
            </div>
            <div className="flex-1 px-3 py-1 font-mono text-sm whitespace-pre-wrap break-all">
              {line || ' '}
            </div>
          </div>
        )
      })
    })
  }, [diff])

  if (!diff || diff.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Clique em "Comparar" para visualizar as diferenças
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Cabeçalho com estatísticas */}
      {stats && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Resultado da Comparação
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Adicionadas: {stats.added} linhas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Removidas: {stats.removed} linhas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span>Inalteradas: {stats.unchanged} linhas</span>
            </div>
            <div className="text-blue-600 font-medium">
              Similaridade: {stats.similarity}%
            </div>
          </div>
        </div>
      )}
      
      {/* Área de visualização do diff */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {renderedDiff}
        </div>
      </div>
    </div>
  )
}