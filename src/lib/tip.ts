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

function roundToCents(value: number): number {
  return Number(`${Math.round(Number(`${value.toFixed(10)}e2`))}e-2`)
}

function parseNumber(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.')
  if (normalized === '') {
    return null
  }
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

export function calculateTip(input: TipInput): TipOutcome {
  const billRaw = input.bill.trim()
  const percentRaw = input.percent.trim()
  const peopleRaw = input.people.trim()

  if (billRaw === '') {
    return { ok: false, error: 'Bitte einen Betrag eingeben.' }
  }
  if (percentRaw === '') {
    return { ok: false, error: 'Bitte einen Trinkgeld-Prozentsatz eingeben.' }
  }
  if (peopleRaw === '') {
    return { ok: false, error: 'Bitte eine Personenzahl eingeben.' }
  }

  const bill = parseNumber(input.bill)
  if (bill === null) {
    return { ok: false, error: 'Bitte einen gültigen Betrag eingeben.' }
  }
  const percent = parseNumber(input.percent)
  if (percent === null) {
    return { ok: false, error: 'Bitte einen gültigen Trinkgeld-Prozentsatz eingeben.' }
  }
  const people = parseNumber(input.people)
  if (people === null) {
    return { ok: false, error: 'Bitte eine gültige Personenzahl eingeben.' }
  }

  if (bill < 0) {
    return { ok: false, error: 'Der Betrag darf nicht negativ sein.' }
  }
  if (percent < 0) {
    return { ok: false, error: 'Der Trinkgeld-Prozentsatz darf nicht negativ sein.' }
  }
  if (people < 1) {
    return { ok: false, error: 'Die Personenzahl muss mindestens 1 sein.' }
  }

  const tip = roundToCents((bill * percent) / 100)
  const total = roundToCents(bill + tip)
  const perPerson = roundToCents(total / people)

  return { ok: true, result: { tip, total, perPerson } }
}
