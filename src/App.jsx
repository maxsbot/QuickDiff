import { useState } from 'react'
import Layout from './components/Layout'
import TextInput from './components/TextInput'
import Button from './components/Button'
import { ArrowLeftRight, Trash2, Play } from 'lucide-react'
import { compareTexts } from './utils/diffUtils'

function App() {
  const [originalText, setOriginalText] = useState('')
  const [modifiedText, setModifiedText] = useState('')

  const handleCompare = () => {
    if (!originalText.trim() || !modifiedText.trim()) {
      console.log('Por favor, insira texto em ambos os campos')
      return
    }

    console.log('Comparando textos...')
    const result = compareTexts(originalText, modifiedText, 'lines', {
      ignoreCase: false,
      ignoreWhitespace: false
    })
    
    console.log('Resultado da comparação:', result)
    console.log('Estatísticas:', result.stats)
  }

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
  }

  const handleSwap = () => {
    const temp = originalText
    setOriginalText(modifiedText)
    setModifiedText(temp)
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
          <Button onClick={handleCompare} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Comparar
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
      </div>
    </Layout>
  )
}

export default App
