import { describe, expect, it } from 'vitest'
import { calculateTip } from './tip'

describe('calculateTip', () => {
  it('computes a typical case (100 / 10 / 2)', () => {
    const outcome = calculateTip({ bill: '100', percent: '10', people: '2' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 10, total: 110, perPerson: 55 },
    })
  })

  it('rounds a half cent commercially', () => {
    const outcome = calculateTip({ bill: '10.10', percent: '25', people: '1' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 2.53, total: 12.63, perPerson: 12.63 },
    })
  })

  it('rounds the amount per person to whole cents', () => {
    const outcome = calculateTip({ bill: '10', percent: '0', people: '3' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 10, perPerson: 3.33 },
    })
  })

  it('handles zero percent', () => {
    const outcome = calculateTip({ bill: '50', percent: '0', people: '2' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 50, perPerson: 25 },
    })
  })

  it('handles a zero bill', () => {
    const outcome = calculateTip({ bill: '0', percent: '10', people: '2' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 0, total: 0, perPerson: 0 },
    })
  })

  it('handles a single person', () => {
    const outcome = calculateTip({ bill: '20', percent: '15', people: '1' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 3, total: 23, perPerson: 23 },
    })
  })

  it('accepts a decimal comma as separator', () => {
    const outcome = calculateTip({ bill: '10,50', percent: '10', people: '1' })
    expect(outcome).toEqual({
      ok: true,
      result: { tip: 1.05, total: 11.55, perPerson: 11.55 },
    })
  })

  it('rejects an empty bill field', () => {
    const outcome = calculateTip({ bill: '', percent: '10', people: '2' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects an empty percent field', () => {
    const outcome = calculateTip({ bill: '100', percent: '', people: '2' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects an empty people field', () => {
    const outcome = calculateTip({ bill: '100', percent: '10', people: '' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects a non-numeric amount', () => {
    const outcome = calculateTip({ bill: 'abc', percent: '10', people: '2' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects a non-numeric percent', () => {
    const outcome = calculateTip({ bill: '100', percent: 'abc', people: '2' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects a non-numeric person count', () => {
    const outcome = calculateTip({ bill: '100', percent: '10', people: 'abc' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects a negative amount', () => {
    const outcome = calculateTip({ bill: '-100', percent: '10', people: '2' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects a negative percent', () => {
    const outcome = calculateTip({ bill: '100', percent: '-10', people: '2' })
    expect(outcome.ok).toBe(false)
  })

  it('rejects a person count below 1', () => {
    const outcome = calculateTip({ bill: '100', percent: '10', people: '0' })
    expect(outcome.ok).toBe(false)
  })

  it('returns a German error message when invalid', () => {
    const outcome = calculateTip({ bill: '', percent: '10', people: '2' })
    if (outcome.ok) {
      throw new Error('expected an invalid outcome')
    }
    expect(outcome.error.length).toBeGreaterThan(0)
    expect(typeof outcome.error).toBe('string')
  })
})
