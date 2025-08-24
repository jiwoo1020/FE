import {
  OrderTitle,
  DetailLine,
  DetailTextBox,
  DetailTitle,
  Detail,
} from './order.styles'

export default function OrderProductList({ items }) {
  return (
    <div>
      <OrderTitle>주문 상품 총 {items.length}개</OrderTitle>
      {items.map(item => (
        <DetailLine key={item.cart_item_id}>
          <img
            src={item.image_url}
            alt={item.name}
            style={{ width: '87px', height: '87px', borderRadius: '12px' }}
          />
          <DetailTextBox>
            <DetailTitle>{item.name}</DetailTitle>
            <Detail>
              {`수량: ${item.quantity}\n구매 농장: ${item.seller.shop_name}\n단가: ${item.unit_price}원\n소계: ${item.subtotal}원\n옵션: ${item.spec}`}
            </Detail>
          </DetailTextBox>
        </DetailLine>
      ))}
    </div>
  )
}
