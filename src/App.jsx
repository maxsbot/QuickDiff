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
      setIsLoading(false)
    }, 300)
  }

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
    setDiffResult(null)
  }

  const handleSwap = () => {
    const temp = originalText
    setOriginalText(modifiedText)
    setModifiedText(temp)
    setDiffResult(null)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Comparador de Texto
          </h2>
          <p className="text-gray-600">
            Compare dois textos e visualize as diferenças
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TextInput
            label="Texto Original"
            placeholder="Cole o texto original aqui..."
            value={originalText}
            onChange={setOriginalText}
          />
          <TextInput
            label="Texto Alterado"
            placeholder="Cole o texto alterado aqui..."
            value={modifiedText}
            onChange={setModifiedText}
          />
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
                  className={`group relative cursor-pointer transition-all duration-200 ${
                    comparisonType === mode.value
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                  } border-2 ${
                    comparisonType === mode.value ? 'border-blue-500' : 'border-gray-200'
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
                className={`cursor-pointer transition-all duration-200 ${
                  ignoreCase 
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
                    }, 100)
                  }
                }}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                    ignoreCase ? 'bg-green-500 border-green-500' : 'border-gray-300'
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
                className={`cursor-pointer transition-all duration-200 ${
                  ignoreWhitespace 
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
                    }, 100)
                  }
                }}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                    ignoreWhitespace ? 'bg-green-500 border-green-500' : 'border-gray-300'
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
          <div className="mb-8">
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Processando comparação...</p>
              </div>
            ) : (
              <DiffViewer 
                diff={diffResult?.diff} 
                stats={diffResult?.stats}
                type={diffResult?.type}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default App
