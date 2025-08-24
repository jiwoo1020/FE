import { CardButton, ButtonLine, PayTitle } from './order.styles'

export default function OrderPaymentMethods({
  paymentMethods,
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div>
      <PayTitle>결제 수단</PayTitle>
      <ButtonLine>
        {paymentMethods.map(pm => (
          <CardButton
            key={pm.key}
            onClick={() => setPaymentMethod(pm.key)}
            style={{
              background: paymentMethod === pm.key ? '#1f3906' : '#d5d5d5',
              color: paymentMethod === pm.key ? '#fff' : '#000',
            }}
          >
            {pm.label}
          </CardButton>
        ))}
      </ButtonLine>
    </div>
  )
}
