import { describe, expect, it } from 'vitest'
import { formatEuro } from './format'

const normalize = (value: string): string => value.replace(/\s/g, ' ')

describe('formatEuro', () => {
  it('renders whole euros with two decimals', () => {
    expect(normalize(formatEuro(10))).toBe('10,00 €')
    expect(normalize(formatEuro(0))).toBe('0,00 €')
  })

  it('always shows exactly two decimals', () => {
    expect(normalize(formatEuro(4.8))).toBe('4,80 €')
  })

  it('uses the de-DE thousands separator', () => {
    expect(normalize(formatEuro(1234.5))).toBe('1.234,50 €')
  })

  it('keeps negative values readable', () => {
    expect(normalize(formatEuro(-5))).toBe('-5,00 €')
  })
})
