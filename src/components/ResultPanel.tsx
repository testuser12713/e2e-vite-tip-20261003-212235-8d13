import type { TipOutcome } from '../lib/tip'
import { formatEuro } from '../lib/format'

export interface ResultPanelProps {
  outcome: TipOutcome
}

export default function ResultPanel(
  props: ResultPanelProps,
): JSX.Element | null {
  const { outcome } = props

  if (!outcome.ok) {
    return (
      <div className="error-message" role="alert">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{
            width: 16,
            height: 16,
            flexShrink: 0,
            marginTop: 2,
            color: 'var(--color-danger)',
          }}
        >
          <path d="M12 3.5 22 20H2L12 3.5Z" fill="currentColor" />
          <path
            d="M12 9.25v4.5"
            style={{ stroke: 'var(--color-danger-soft)' }}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="16.5"
            r="1.1"
            style={{ fill: 'var(--color-danger-soft)' }}
          />
        </svg>
        <span>{outcome.error}</span>
      </div>
    )
  }

  const { tip, total, perPerson } = outcome.result

  return (
    <section className="result-panel" aria-live="polite">
      <h2 className="result-title">Ergebnis</h2>
      <div className="result-row">
        <span className="result-label">Trinkgeld</span>
        <span className="result-value">{formatEuro(tip)}</span>
      </div>
      <div className="result-row">
        <span className="result-label">Betrag pro Person</span>
        <span className="result-value">{formatEuro(perPerson)}</span>
      </div>
      <div className="result-row result-row--total">
        <span className="result-label">Gesamtbetrag</span>
        <span className="result-value">{formatEuro(total)}</span>
      </div>
    </section>
  )
}
