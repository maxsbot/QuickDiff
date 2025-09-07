import { GitCompare } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">QuickDiff</h1>
          </div>
          <p className="text-sm text-gray-600 hidden md:block">
            Comparador de texto/arquivo rápido e intuitivo
          </p>
        </div>
      </div>
    </header>
  )
}