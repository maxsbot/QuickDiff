import Logo from './Logo'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
              QuickDiff
            </h1>
          </div>
          <p className="text-sm text-gray-600 hidden md:block">
            Comparador de texto rápido e intuitivo
          </p>
        </div>
      </div>
    </header>
  )
}