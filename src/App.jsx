import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bem-vindo ao QuickDiff
          </h2>
          <p className="text-gray-600 mb-6">
            Compare textos e arquivos de forma rápida e intuitiva.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Começar Comparação
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default App
