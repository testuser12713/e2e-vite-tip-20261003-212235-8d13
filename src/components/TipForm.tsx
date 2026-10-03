import type { TipInput } from '../lib/tip'

export interface TipFormProps {
  input: TipInput
  onFieldChange: (field: keyof TipInput, value: string) => void
}

export default function TipForm(_props: TipFormProps): JSX.Element | null {
  return null
}
