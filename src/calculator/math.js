const KEYS_ALLOWED = /[0-9+\-*/()., ]/

export function sanitizeExpression(expr) {
  let s = (expr || '').replace(/,/g, '.')
  s = s.split('').filter((ch) => KEYS_ALLOWED.test(ch)).join('')
  s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)')
  s = s.replace(/([+\-*/])\1+/g, '$1')
  return s
}

export function safeEval(expr) {
  const sanitized = sanitizeExpression(expr)
  if (!sanitized.trim()) return ''
  try {
    const fn = new Function(`return (${sanitized})`)
    const result = fn()
    if (typeof result === 'number' && isFinite(result)) return result
    return 'Erro'
  } catch {
    return 'Erro'
  }
}
