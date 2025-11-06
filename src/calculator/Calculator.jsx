import { useState, useMemo, useEffect } from 'react'
import { safeEval } from './math.js'

const ALLOWED = /[0-9+\-*/()., ]/

export default function Calculator() {
  const [expr, setExpr] = useState('')
  const result = useMemo(() => safeEval(expr), [expr])

  useEffect(() => {
    const onKey = (e) => {
      const { key } = e
      if (key === 'Enter' || key === '=') return handleEquals()
      if (key === 'Backspace') return handleBackspace()
      if (key === 'Escape') return handleClear()
      if (ALLOWED.test(key)) return insert(key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const insert = (v) => setExpr((p) => p + v)
  const handleClear = () => setExpr('')
  const handleBackspace = () => setExpr((p) => p.slice(0, -1))
  const handleEquals = () => {
    const r = safeEval(expr)
    if (r !== 'Erro' && r !== '') setExpr(String(r))
  }

  const toggleSign = () => {
    setExpr((p) => {
      const m = p.match(/(.*?)(\d+(?:\.\d+)?)([^\d.]*)$/)
      if (!m) return p
      const [, start, num, end] = m
      return `${start}${Number(num) * -1}${end}`
    })
  }

  const Btn = ({ label, color = 'gray', onClick }) => (
    <button className={`btn ${color}`} onClick={onClick}>{label}</button>
  )

  return (
    <div className="calculator">
      <div className="display">{expr || result || 0}</div>
      <div className="grid">
        <Btn label="AC" onClick={handleClear} />
        <Btn label="±" onClick={toggleSign} />
        <Btn label="%" onClick={() => insert('%')} />
        <Btn label="÷" color="orange" onClick={() => insert('/')} />

        <Btn label="7" onClick={() => insert('7')} />
        <Btn label="8" onClick={() => insert('8')} />
        <Btn label="9" onClick={() => insert('9')} />
        <Btn label="x" color="orange" onClick={() => insert('*')} />

        <Btn label="4" onClick={() => insert('4')} />
        <Btn label="5" onClick={() => insert('5')} />
        <Btn label="6" onClick={() => insert('6')} />
        <Btn label="-" color="orange" onClick={() => insert('-')} />

        <Btn label="1" onClick={() => insert('1')} />
        <Btn label="2" onClick={() => insert('2')} />
        <Btn label="3" onClick={() => insert('3')} />
        <Btn label="+" color="orange" onClick={() => insert('+')} />

        <Btn label="0" onClick={() => insert('0')} />
        <Btn label="," onClick={() => insert(',')} />
        <Btn label="⌫" onClick={handleBackspace} />
        <Btn label="=" color="orange" onClick={handleEquals} />
      </div>
    </div>
  )
}
