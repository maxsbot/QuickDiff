import { useState } from 'react'

export default function TextInput({ 
  label, 
  placeholder = "Cole seu texto aqui...", 
  value, 
  onChange,
  className = "" 
}) {
  const [stats, setStats] = useState({ characters: 0, lines: 0 })

  const handleChange = (e) => {
    const text = e.target.value
    onChange?.(text)
    
    // Calcular estatísticas
    setStats({
      characters: text.length,
      lines: text.split('\n').length
    })
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          {stats.characters} chars · {stats.lines} linhas
        </div>
      </div>
    </div>
  )
}