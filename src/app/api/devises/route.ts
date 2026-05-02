import { NextResponse } from 'next/server'

const TAUX_FALLBACK = {
  EUR: { XOF: 655.96, USD: 1.08, GBP: 0.85, GNF: 9300, MAD: 10.8 },
  USD: { XOF: 607.37, EUR: 0.92, GBP: 0.79, GNF: 8610, MAD: 10.0 },
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const base = searchParams.get('base') ?? 'EUR'

  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${base}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error('API error')

    const data = await res.json()

    return NextResponse.json({
      base,
      taux: {
        XOF: data.rates.XOF ?? TAUX_FALLBACK[base as keyof typeof TAUX_FALLBACK]?.XOF,
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
        GNF: data.rates.GNF,
        MAD: data.rates.MAD,
      },
      source: 'live',
      date: data.date,
    })
  } catch {
    return NextResponse.json({
      base,
      taux: TAUX_FALLBACK[base as keyof typeof TAUX_FALLBACK] ?? TAUX_FALLBACK.EUR,
      source: 'fallback',
      date: new Date().toISOString().split('T')[0],
    })
  }
}