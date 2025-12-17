import { useState } from 'react'

export default function TextInput({
  placeholder = "Cole seu texto aqui...",
  value,
  onChange,
  className = ""
}) {
  const [stats, setStats] = useState({ characters: 0, lines: 0, tokens: 0 })

  const handleChange = (e) => {
    const text = e.target.value
    onChange?.(text)

    // Calcular estatísticas
    const lines = text.split('\n').length
    // Contar tokens: divide por espaços e quebras de linha, remove vazios
    const tokens = text.trim() === '' ? 0 : text.trim().split(/\s+/).length

    setStats({
      characters: text.length,
      lines: lines,
      tokens: tokens
    })
  }

  return (
    <div className={`relative ${className}`}>
      <textarea
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-200 font-mono text-sm placeholder-gray-400"
      />
      <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-200 shadow-sm">
        <span className="font-medium">{stats.lines}</span> linhas · <span className="font-medium">{stats.tokens}</span> tokens · <span className="font-medium">{stats.characters}</span> caracteres
      </div>
    </div>
  )
}