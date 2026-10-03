import type { CSSProperties } from 'react'
import type { TipInput } from '../lib/tip'

export interface TipFormProps {
  input: TipInput
  onFieldChange: (field: keyof TipInput, value: string) => void
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
            aria-describedby="bill-helper"
            onChange={(event) => onFieldChange('bill', event.target.value)}
          />
          <span className="field-suffix" style={suffixStyle} aria-hidden="true">
            €
          </span>
        </div>
        <p className="field-helper" id="bill-helper">
          Betrag in Euro
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
            aria-describedby="percent-helper"
            onChange={(event) => onFieldChange('percent', event.target.value)}
          />
          <span className="field-suffix" style={suffixStyle} aria-hidden="true">
            %
          </span>
        </div>
        <p className="field-helper" id="percent-helper">
          Trinkgeld in Prozent
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
            aria-describedby="people-helper"
            onChange={(event) => onFieldChange('people', event.target.value)}
          />
          <span className="field-suffix" style={suffixStyle} aria-hidden="true">
            Pers.
          </span>
        </div>
        <p className="field-helper" id="people-helper">
          Anzahl der Personen
        </p>
      </div>
    </form>
  )
}
