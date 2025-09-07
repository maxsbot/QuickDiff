import { useState } from 'react'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            QuickDiff
          </h1>
          <div className="text-center">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCount((count) => count + 1)}
            >
              Teste Tailwind: {count}
            </button>
            <p className="mt-4 text-gray-600">
              Tailwind CSS funcionando! 🎉
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
