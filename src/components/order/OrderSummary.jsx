import {
  TotalLine,
  Total,
  Howmuch,
  Box,
  MoneyLine,
  Pay,
  Product,
  TaxLine,
} from './order.styles'

export default function OrderSummary({ totals }) {
  return (
    <div>
      <TotalLine>
        <Total>총 결제금액</Total>
        <Howmuch>{totals.grand_total}원</Howmuch>
      </TotalLine>
      <Box>
        <MoneyLine>
          <Pay>총 상품 가격</Pay>
          <Product>{totals.products}원</Product>
        </MoneyLine>
        <TaxLine>
          <Pay>배송비</Pay>
          <Product>{totals.shipping}원</Product>
        </TaxLine>
      </Box>
    </div>
  )
}
