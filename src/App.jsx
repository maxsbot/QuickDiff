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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Opções de Comparação</h3>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-600 block mb-1">Modo de Comparação</label>
              <select 
                value={comparisonType}
                onChange={(e) => setComparisonType(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lines">Por Linha</option>
                <option value="words">Por Palavra</option>
                <option value="chars">Por Caractere</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ignoreCase"
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="ignoreCase" className="text-xs text-gray-600">
                Ignorar maiúsculas/minúsculas
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ignoreWhitespace"
                checked={ignoreWhitespace}
                onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="ignoreWhitespace" className="text-xs text-gray-600">
                Ignorar espaços em branco
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            onClick={handleCompare} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isLoading ? 'Comparando...' : 'Comparar'}
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
