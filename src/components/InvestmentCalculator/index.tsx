"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Calculator, RefreshCcw, Wallet } from "lucide-react"
import { useSearchParams } from "next/navigation"

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
})

const parseNumber = (value: string) => {
  if (!value) return 0
  const numeric = Number(value.replace(/[^0-9.]/g, ""))
  return Number.isFinite(numeric) ? numeric : 0
}

const PaymentPlanCalculator = () => {
  const [price, setPrice] = useState("")
  const [deposit, setDeposit] = useState("")
  const [months, setMonths] = useState("12")
  const searchParams = useSearchParams()
  const hasPrefilled = useRef(false)

  useEffect(() => {
    if (!searchParams || hasPrefilled.current) return

    const priceParam = searchParams.get("price")
    const depositParam = searchParams.get("deposit")
    const monthsParam = searchParams.get("months")

    if (priceParam || depositParam || monthsParam) {
      if (priceParam) setPrice(priceParam)
      if (depositParam) setDeposit(depositParam)
      if (monthsParam) setMonths(monthsParam)
      hasPrefilled.current = true
    }
  }, [searchParams])

  const plan = useMemo(() => {
    const priceValue = parseNumber(price)
    const rawDeposit = parseNumber(deposit)
    const cappedDeposit = Math.min(rawDeposit, priceValue)
    const monthsValue = Number.parseInt(months, 10)

    if (!priceValue || !monthsValue || monthsValue <= 0) {
      return null
    }

    const amountToFinance = priceValue - cappedDeposit
    const monthlyPayment = amountToFinance / monthsValue
    const fortnightlyPayment = monthlyPayment / 2
    const weeklyPayment = monthlyPayment / 4.345 // Approximate weeks per month

    return {
      priceValue,
      depositValue: cappedDeposit,
      monthsValue,
      amountToFinance,
      monthlyPayment,
      fortnightlyPayment,
      weeklyPayment,
      adjustedDeposit: rawDeposit > priceValue,
    }
  }, [price, deposit, months])

  const hasInvalidMonths = months !== "" && (!Number.isFinite(Number.parseInt(months, 10)) || Number.parseInt(months, 10) <= 0)

  const handleReset = () => {
    setPrice("")
    setDeposit("")
    setMonths("12")
  }

  const handleDepositPreset = (percentage: number) => {
    const priceValue = parseNumber(price)
    if (!priceValue) return
    const estimate = Math.round(priceValue * percentage)
    setDeposit(estimate.toString())
  }

  return (
    <main
      id="payment-plan-calculator"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gold-50/20 py-16"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-1 text-sm font-medium text-gold-700">
            <Calculator className="h-4 w-4" />
            Tailored payment planning for your next property
          </div>
          <h1 className="font-serif text-4xl font-light tracking-tight text-slate-900 md:text-5xl">
            Payment Plan Calculator
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Keep things simple. Enter the property price, the deposit you can commit, and how many months you want to spread the balance over. We will show you the repayment amount instantly.
          </p>
        </section>

        <Card className="border-gold-100 shadow-lg shadow-gold-100/40">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Plan your payments in three quick steps
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Adjust any value as you go—the results update right away to keep you in control of your budget.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                  Property price (KES)
                </Label>
                <Input
                  id="price"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 12500000"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  aria-describedby="price-helper"
                />
                <p id="price-helper" className="text-xs text-slate-500">
                  Use numbers only—no commas or currency symbols needed.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit" className="text-sm font-medium text-slate-700">
                  Deposit amount (KES)
                </Label>
                <Input
                  id="deposit"
                  type="text"
                  inputMode="numeric"
                  placeholder="optional"
                  value={deposit}
                  onChange={(event) => setDeposit(event.target.value)}
                />
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="text-slate-500">Quick fill:</span>
                  {[0.1, 0.2, 0.3].map((percentage) => (
                    <Button
                      key={percentage}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gold-200 px-2 text-slate-600 hover:border-gold-300 hover:text-gold-700"
                      onClick={() => handleDepositPreset(percentage)}
                    >
                      {Math.round(percentage * 100)}%
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="months" className="text-sm font-medium text-slate-700">
                  Payment period (months)
                </Label>
                <Input
                  id="months"
                  type="number"
                  min={1}
                  placeholder="e.g. 24"
                  value={months}
                  onChange={(event) => setMonths(event.target.value)}
                  aria-describedby="months-helper"
                />
                <p id="months-helper" className="text-xs text-slate-500">
                  Choose how long you would like to spread the balance.
                </p>
              </div>
            </div>

            {plan?.adjustedDeposit && (
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 text-sm text-amber-700">
                <AlertCircle className="h-4 w-4" />
                Deposit cannot be higher than the property price. We used the full price as your deposit.
              </div>
            )}

            {hasInvalidMonths && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50/60 px-4 py-3 text-sm text-rose-700">
                <AlertCircle className="h-4 w-4" />
                Please enter a payment duration greater than zero months.
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-slate-500">
              Tip: update the deposit or months to find a payment that matches your comfort level.
            </div>
            <Button type="button" variant="outline" className="gap-2" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4" />
              Reset values
            </Button>
          </CardFooter>
        </Card>

        <Card className="border border-slate-200 bg-white/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <Wallet className="h-6 w-6 text-gold-600" />
              Your payment plan
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              {plan
                ? "Review the details below and adjust the inputs above to explore different options."
                : "Enter the property price and number of months to see how the plan shapes up."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {plan ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 rounded-xl border border-gold-100 bg-gold-50/40 p-6 text-center">
                  <p className="text-sm uppercase tracking-wide text-slate-500">Monthly payment</p>
                  <p className="text-4xl font-semibold text-gold-700">
                    {currencyFormatter.format(plan.monthlyPayment)}
                  </p>
                  <p className="text-sm text-slate-500">
                    Spread over {plan.monthsValue} month{plan.monthsValue > 1 ? "s" : ""}
                  </p>
                  <div className="my-4 h-px bg-gold-200" />
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div>
                      <p className="font-medium text-slate-700">Fortnightly</p>
                      <p>{currencyFormatter.format(plan.fortnightlyPayment)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">Weekly (approx)</p>
                      <p>{currencyFormatter.format(plan.weeklyPayment)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 p-6 text-slate-700">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-slate-500">Property price</span>
                    <span className="text-lg font-semibold text-slate-900">
                      {currencyFormatter.format(plan.priceValue)}
                    </span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-slate-500">Deposit</span>
                    <span>{currencyFormatter.format(plan.depositValue)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-slate-500">Balance to finance</span>
                    <span className="text-lg font-semibold text-slate-900">
                      {currencyFormatter.format(plan.amountToFinance)}
                    </span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <p className="text-sm text-slate-500">
                    This calculation does not include interest or legal fees. Speak to your Kings Developers consultant to customise a developer-assisted plan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center text-slate-500">
                <p className="text-lg font-medium">Ready to map out your plan?</p>
                <p className="mt-2 text-sm">
                  Start by entering the property price, your deposit, and preferred repayment period above.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default PaymentPlanCalculator
