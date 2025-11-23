import { useState } from 'react'
import Layout from './components/Layout'
import TextInput from './components/TextInput'
import Button from './components/Button'
import DiffViewer from './components/DiffViewer'
import { ArrowLeftRight, Trash2, Play } from 'lucide-react'
import { compareTexts } from './utils/diffUtils'

function App() {
  const [originalText, setOriginalText] = useState('')
  const [modifiedText, setModifiedText] = useState('')
  const [diffResult, setDiffResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [comparisonType, setComparisonType] = useState('lines')
  const [ignoreCase, setIgnoreCase] = useState(false)

  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [selections, setSelections] = useState([]) // Array of booleans for diff chunks

  const scrollToResults = () => {
    setTimeout(() => {
      const resultsElement = document.getElementById('comparison-results')
      if (resultsElement) {
        resultsElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }, 200)
  }

  const handleCompare = async () => {
    if (!originalText.trim() || !modifiedText.trim()) {
      alert('Por favor, insira texto em ambos os campos')
      return
    }

    setIsLoading(true)

    // Simular um pequeno delay para mostrar loading
    setTimeout(() => {
      const result = compareTexts(originalText, modifiedText, comparisonType, {
        ignoreCase,
        ignoreWhitespace
      })

      setDiffResult(result)

      // Initialize selections: Added=True, Removed=False, Unchanged=True
      if (result && result.diff) {
        setSelections(result.diff.map(part => !part.removed))
      }

      setIsLoading(false)
      scrollToResults()
    }, 300)
  }

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
    setDiffResult(null)
    setSelections([])
  }

  const handleSwap = () => {
    const temp = originalText
    setOriginalText(modifiedText)
    setModifiedText(temp)
    setDiffResult(null)
    setSelections([])
  }

  const toggleSelection = (index) => {
    setSelections(prev => {
      const newSelections = [...prev]
      const currentPart = diffResult.diff[index]

      // Toggle the clicked part
      newSelections[index] = !newSelections[index]

      // If we are selecting this part (setting to true), deselect adjacent conflicting parts
      if (newSelections[index]) {
        // Check previous part
        if (index > 0) {
          const prevPart = diffResult.diff[index - 1]
          if ((currentPart.added && prevPart.removed) || (currentPart.removed && prevPart.added)) {
            newSelections[index - 1] = false
          }
        }

        // Check next part
        if (index < diffResult.diff.length - 1) {
          const nextPart = diffResult.diff[index + 1]
          if ((currentPart.added && nextPart.removed) || (currentPart.removed && nextPart.added)) {
            newSelections[index + 1] = false
          }
        }
      }

      return newSelections
    })
  }

  const getFinalText = () => {
    if (!diffResult || !diffResult.diff) return ''
    return diffResult.diff
      .filter((_, index) => selections[index])
      .map(part => part.value)
      .join('')
  }

  const copyFinalText = () => {
    const text = getFinalText()
    navigator.clipboard.writeText(text)
    alert('Texto final copiado para a área de transferência!')
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Compare textos e códigos de forma
            <span className="text-blue-600"> inteligente</span>
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Identifique diferenças instantaneamente entre versões de código, textos gerados por IA ou documentos
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% privado</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Processamento local</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Ideal para código</span>
            </div>
          </div>
        </div>

        {/* Card principal para inputs de texto */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Compare seus textos</h3>
                <p className="text-sm text-gray-600">Cole os textos nos campos abaixo</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Texto Original</label>
                <TextInput
                  placeholder="Cole seu texto original aqui..."
                  value={originalText}
                  onChange={setOriginalText}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Texto Alterado</label>
                <TextInput
                  placeholder="Cole a versão modificada aqui..."
                  value={modifiedText}
                  onChange={setModifiedText}
                />
              </div>
            </div>

            {/* Status simples */}
            {originalText.trim() && modifiedText.trim() && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pronto para comparar!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Opções de comparação */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Opções de Comparação</h3>
          </div>

          {/* Modo de Comparação - Cards */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Modo de Comparação
              <span className="text-xs text-gray-500 ml-2">Escolha como o texto será analisado</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  value: 'lines',
                  label: 'Por Linha',
                  desc: 'Ideal para código e texto estruturado',
                  icon: '≡',
                  details: 'Compara linha por linha, melhor para ver mudanças estruturais'
                },
                {
                  value: 'words',
                  label: 'Por Palavra',
                  desc: 'Ideal para textos e documentos',
                  icon: 'W',
                  details: 'Compara palavra por palavra, útil para textos corridos'
                },
                {
                  value: 'chars',
                  label: 'Por Caractere',
                  desc: 'Análise detalhada, mudanças mínimas',
                  icon: 'A',
                  details: 'Compara cada caractere, mostra diferenças muito pequenas'
                }
              ].map((mode) => (
                <div
                  key={mode.value}
                  className={`group relative cursor-pointer transition-all duration-200 ${comparisonType === mode.value
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                    } border-2 ${comparisonType === mode.value ? 'border-blue-500' : 'border-gray-200'
                    } rounded-lg p-4`}
                  onClick={() => {
                    setComparisonType(mode.value)
                    // Auto-comparar se ambos os textos estiverem preenchidos
                    if (originalText.trim() && modifiedText.trim() && !isLoading) {
                      setTimeout(() => {
                        const result = compareTexts(originalText, modifiedText, mode.value, {
                          ignoreCase,
                          ignoreWhitespace
                        })
                        setDiffResult(result)
                        if (result && result.diff) {
                          setSelections(result.diff.map(part => !part.removed))
                        }
                        scrollToResults()
                      }, 100)
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-mono font-bold">{mode.icon}</span>
                    {comparisonType === mode.value && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <h4 className="font-medium">{mode.label}</h4>
                  <p className={`text-sm ${comparisonType === mode.value ? 'text-blue-100' : 'text-gray-500'}`}>
                    {mode.desc}
                  </p>

                  {/* Tooltip on hover */}
                  {comparisonType !== mode.value && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {mode.details}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Configurações Avançadas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Configurações Avançadas</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ignorar maiúsculas */}
              <div
                className={`cursor-pointer transition-all duration-200 ${ignoreCase
                  ? 'bg-green-50 border-green-300 shadow-md'
                  : 'bg-white border-gray-200 hover:border-green-300'
                  } border-2 rounded-lg p-4`}
                onClick={() => {
                  const newIgnoreCase = !ignoreCase
                  setIgnoreCase(newIgnoreCase)
                  // Auto-comparar se ambos os textos estiverem preenchidos
                  if (originalText.trim() && modifiedText.trim() && !isLoading) {
                    setTimeout(() => {
                      const result = compareTexts(originalText, modifiedText, comparisonType, {
                        ignoreCase: newIgnoreCase,
                        ignoreWhitespace
                      })
                      setDiffResult(result)
                      if (result && result.diff) {
                        setSelections(result.diff.map(part => !part.removed))
                      }
                      scrollToResults()
                    }, 100)
                  }
                }}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${ignoreCase ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                    {ignoreCase && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Ignorar maiúsculas</h4>
                    <p className="text-sm text-gray-500">Trata 'A' e 'a' como iguais</p>
                  </div>
                </div>
              </div>

              {/* Ignorar espaços */}
              <div
                className={`cursor-pointer transition-all duration-200 ${ignoreWhitespace
                  ? 'bg-green-50 border-green-300 shadow-md'
                  : 'bg-white border-gray-200 hover:border-green-300'
                  } border-2 rounded-lg p-4`}
                onClick={() => {
                  const newIgnoreWhitespace = !ignoreWhitespace
                  setIgnoreWhitespace(newIgnoreWhitespace)
                  // Auto-comparar se ambos os textos estiverem preenchidos
                  if (originalText.trim() && modifiedText.trim() && !isLoading) {
                    setTimeout(() => {
                      const result = compareTexts(originalText, modifiedText, comparisonType, {
                        ignoreCase,
                        ignoreWhitespace: newIgnoreWhitespace
                      })
                      setDiffResult(result)
                      if (result && result.diff) {
                        setSelections(result.diff.map(part => !part.removed))
                      }
                      scrollToResults()
                    }, 100)
                  }
                }}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${ignoreWhitespace ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                    {ignoreWhitespace && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Ignorar espaços</h4>
                    <p className="text-sm text-gray-500">Ignora diferenças de espaçamento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={handleCompare}
            disabled={isLoading || (!originalText.trim() || !modifiedText.trim())}
            className="flex items-center gap-2 relative"
          >
            <Play className="w-4 h-4" />
            {isLoading ? 'Comparando...' : 'Comparar'}
            {(!originalText.trim() || !modifiedText.trim()) && (
              <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </Button>
          <Button variant="outline" onClick={handleSwap} className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            Trocar Textos
          </Button>
          <Button variant="secondary" onClick={handleClear} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Limpar
          </Button>
        </div>

        {/* Área de resultado */}
        {(diffResult || isLoading) && (
          <div id="comparison-results" className="mb-8">
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Processando comparação...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <DiffViewer
                  diff={diffResult?.diff}
                  stats={diffResult?.stats}
                  type={diffResult?.type}
                  selections={selections}
                  onToggle={toggleSelection}
                />

                {/* Final Result Action */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Resultado Final Personalizado</h3>
                    <p className="text-sm text-gray-600">
                      Clique nas partes coloridas acima para incluir/remover do texto final.
                    </p>
                  </div>
                  <Button onClick={copyFinalText} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copiar Resultado Final
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default App
