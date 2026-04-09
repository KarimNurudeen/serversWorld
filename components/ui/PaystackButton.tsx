'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'

interface PaystackButtonProps {
  publicKey: string
  amount: number // in kobo
  productName: string
  email?: string
}

export default function PaystackButton({ publicKey, amount, productName, email }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false)
  const [customerEmail, setCustomerEmail] = useState(email || '')
  const [showEmailInput, setShowEmailInput] = useState(!email)

  async function handlePay() {
    if (!customerEmail) {
      setShowEmailInput(true)
      return
    }

    setLoading(true)

    // Dynamically load Paystack inline script
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => {
      // @ts-expect-error - PaystackPop is loaded from external script
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: customerEmail,
        amount,
        currency: 'NGN',
        ref: `SW_${Date.now()}`,
        metadata: { product: productName },
        callback: (response: { reference: string }) => {
          setLoading(false)
          alert(`Payment successful! Reference: ${response.reference}`)
        },
        onClose: () => {
          setLoading(false)
        },
      })
      handler.openIframe()
    }
    document.body.appendChild(script)
  }

  return (
    <div className="space-y-3">
      {showEmailInput && (
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="Enter your email to pay"
          className="input-field"
        />
      )}
      <button
        onClick={handlePay}
        disabled={loading}
        className="btn-primary flex items-center justify-center gap-2 w-full"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <CreditCard size={16} />
            PAY WITH PAYSTACK
          </>
        )}
      </button>
    </div>
  )
}
