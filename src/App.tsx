import { useState } from 'react'
import TipForm from './components/TipForm'
import ResultPanel from './components/ResultPanel'
import { calculateTip } from './lib/tip'
import type { TipInput } from './lib/tip'

export default function App() {
  const [input, setInput] = useState<TipInput>({
    bill: '',
    percent: '',
    people: '',
  })

  const outcome = calculateTip(input)

  function handleFieldChange(field: keyof TipInput, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <main className="app-shell">
      <section className="app-card">
        <header className="app-header">
          <h1 className="app-title">Trinkgeld-Rechner</h1>
          <p className="app-subtitle">
            Betrag eingeben – Ergebnis erscheint sofort.
          </p>
        </header>
        <div className="form-area">
          <TipForm input={input} onFieldChange={handleFieldChange} />
        </div>
        <div className="result-area">
          <ResultPanel outcome={outcome} />
        </div>
      </section>
    </main>
  )
}
