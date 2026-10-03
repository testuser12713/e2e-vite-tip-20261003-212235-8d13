export interface TipInput {
  bill: string
  percent: string
  people: string
}

export interface TipResult {
  tip: number
  total: number
  perPerson: number
}

export type TipOutcome =
  | { ok: true; result: TipResult }
  | { ok: false; error: string }

export function calculateTip(_input: TipInput): TipOutcome {
  return { ok: false, error: '' }
}
