const euroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

export function formatEuro(amount: number): string {
  return euroFormatter.format(amount)
}
