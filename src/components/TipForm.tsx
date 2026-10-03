import type { CSSProperties } from 'react'
import type { TipInput } from '../lib/tip'

export interface TipFormProps {
  input: TipInput
  onFieldChange: (field: keyof TipInput, value: string) => void
}

interface FieldValidation {
  invalid: boolean
  message: string
}

function parseNumeric(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed === '') {
    return null
  }
  const value = Number(trimmed.replace(',', '.'))
  return Number.isFinite(value) ? value : null
}

function validateAmount(raw: string): FieldValidation {
  if (raw.trim() === '') {
    return { invalid: true, message: 'Bitte Betrag eingeben.' }
  }
  const value = parseNumeric(raw)
  if (value === null) {
    return { invalid: true, message: 'Bitte einen gültigen Betrag eingeben.' }
  }
  if (value < 0) {
    return { invalid: true, message: 'Betrag darf nicht negativ sein.' }
  }
  return { invalid: false, message: '' }
}

function validatePercent(raw: string): FieldValidation {
  if (raw.trim() === '') {
    return { invalid: true, message: 'Bitte Trinkgeld-Prozent eingeben.' }
  }
  const value = parseNumeric(raw)
  if (value === null) {
    return {
      invalid: true,
      message: 'Bitte einen gültigen Trinkgeld-Prozentsatz eingeben.',
    }
  }
  if (value < 0) {
    return { invalid: true, message: 'Trinkgeld-Prozent darf nicht negativ sein.' }
  }
  return { invalid: false, message: '' }
}

function validatePeople(raw: string): FieldValidation {
  if (raw.trim() === '') {
    return { invalid: true, message: 'Bitte Personenzahl eingeben.' }
  }
  const value = parseNumeric(raw)
  if (value === null) {
    return { invalid: true, message: 'Bitte eine gültige Personenzahl eingeben.' }
  }
  if (value < 1) {
    return { invalid: true, message: 'Personenzahl muss mindestens 1 sein.' }
  }
  return { invalid: false, message: '' }
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
}

const controlStyle: CSSProperties = {
  position: 'relative',
}

const inputStyle: CSSProperties = {
  width: '100%',
  paddingRight: 'var(--space-6)',
}

const suffixStyle: CSSProperties = {
  position: 'absolute',
  right: 'var(--space-2)',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '14px',
  color: 'var(--color-muted)',
  fontVariantNumeric: 'tabular-nums',
  pointerEvents: 'none',
}

export default function TipForm({
  input,
  onFieldChange,
}: TipFormProps): JSX.Element {
  const bill = validateAmount(input.bill)
  const percent = validatePercent(input.percent)
  const people = validatePeople(input.people)

  return (
    <form className="tip-form" style={formStyle} noValidate onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label className="field-label" htmlFor="bill">
          Betrag
        </label>
        <div className="field-control" style={controlStyle}>
          <input
            className="field-input"
            style={inputStyle}
            type="text"
            inputMode="decimal"
            id="bill"
            name="bill"
            value={input.bill}
            placeholder="0,00"
            autoComplete="off"
            aria-invalid={bill.invalid}
            aria-describedby={bill.invalid ? 'bill-error' : 'bill-helper'}
            onChange={(event) => onFieldChange('bill', event.target.value)}
          />
          <span className="field-suffix" style={suffixStyle} aria-hidden="true">
            €
          </span>
        </div>
        <p
          className={bill.invalid ? 'field-helper field-error' : 'field-helper'}
          id={bill.invalid ? 'bill-error' : 'bill-helper'}
        >
          {bill.invalid ? bill.message : 'Betrag in Euro'}
        </p>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="percent">
          Trinkgeld-Prozent
        </label>
        <div className="field-control" style={controlStyle}>
          <input
            className="field-input"
            style={inputStyle}
            type="text"
            inputMode="decimal"
            id="percent"
            name="percent"
            value={input.percent}
            placeholder="10"
            autoComplete="off"
            aria-invalid={percent.invalid}
            aria-describedby={percent.invalid ? 'percent-error' : 'percent-helper'}
            onChange={(event) => onFieldChange('percent', event.target.value)}
          />
          <span className="field-suffix" style={suffixStyle} aria-hidden="true">
            %
          </span>
        </div>
        <p
          className={percent.invalid ? 'field-helper field-error' : 'field-helper'}
          id={percent.invalid ? 'percent-error' : 'percent-helper'}
        >
          {percent.invalid ? percent.message : 'Trinkgeld in Prozent'}
        </p>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="people">
          Personenzahl
        </label>
        <div className="field-control" style={controlStyle}>
          <input
            className="field-input"
            style={inputStyle}
            type="text"
            inputMode="decimal"
            id="people"
            name="people"
            value={input.people}
            placeholder="1"
            autoComplete="off"
            aria-invalid={people.invalid}
            aria-describedby={people.invalid ? 'people-error' : 'people-helper'}
            onChange={(event) => onFieldChange('people', event.target.value)}
          />
          <span className="field-suffix" style={suffixStyle} aria-hidden="true">
            Pers.
          </span>
        </div>
        <p
          className={people.invalid ? 'field-helper field-error' : 'field-helper'}
          id={people.invalid ? 'people-error' : 'people-helper'}
        >
          {people.invalid ? people.message : 'Anzahl der Personen'}
        </p>
      </div>
    </form>
  )
}
