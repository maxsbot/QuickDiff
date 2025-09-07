import msDevLogo from '/MS.DEV.png'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center space-y-0">
            <span className="text-sm text-gray-600">Desenvolvido por</span>
            <a
              href="https://ms.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={msDevLogo}
                alt="MS.DEV - Soluções em Tecnologia"
                className="h-17 w-auto"
              />
            </a>
          </div>
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>© {new Date().getFullYear()} QuickDiff. Código aberto sob licença MIT.</p>
            <p>🔒 100% privado • 🚀 Processamento local • ❤️ Feito com React</p>
          </div>
        </div>
      </div>
    </footer>
  )
}