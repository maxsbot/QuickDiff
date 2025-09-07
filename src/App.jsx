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

  const handleCompare = async () => {
    if (!originalText.trim() || !modifiedText.trim()) {
      alert('Por favor, insira texto em ambos os campos')
      return
    }

    setIsLoading(true)
    
    // Simular um pequeno delay para mostrar loading
    setTimeout(() => {
      const result = compareTexts(originalText, modifiedText, 'lines', {
        ignoreCase: false,
        ignoreWhitespace: false
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
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default App
