import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {
  Container,
  Header,
  OrderContainer,
  Orderbox,
  OrderButton,
} from '../components/order/order.styles'
import OrderProductList from '../components/order/OrderProductList'
import OrderDeliveryForm from '../components/order/OrderDeliveryForm'
import OrderDatePicker from '../components/order/OrderDatePicker'
import OrderPaymentMethods from '../components/order/OrderPaymentMethods'
import OrderSummary from '../components/order/OrderSummary'
import { useLocation } from 'react-router-dom'

export default function Order() {
  const [receiver, setReceiver] = useState('')
  const [phone, setPhone] = useState('')
  const [addr, setAddr] = useState('')
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [viewDate, setViewDate] = useState(new Date())
  const [pickedDate, setPickedDate] = useState(null)

  const receiverRef = useRef(null)
  const phoneRef = useRef(null)
  const addrRef = useRef(null)

  const location = useLocation()
  const selectedItems = location.state?.selectedItems ?? []
  const cartIds = selectedItems.map(item => item.id)

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const token = localStorage.getItem('token')

        // 1. 장바구니 가져오기
        const cartRes = await axios.get('/api/cart/items', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const cartItems = cartRes.data?.data?.items ?? []
        const cartIds = cartItems.map(item => item.cart_item_id)

        // 2. 주문 미리보기 호출
        const res = await axios.post(
          '/api/orders/preview',
          {
            cart_item_ids: cartIds,
            desired_delivery_date: pickedDate
              ? pickedDate.toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0], // 기본값: 오늘
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (res.data.success) {
          setPreview(res.data.data)
        }
      } catch (err) {
        if (err.response) {
          console.error(
            '미리보기 실패:',
            err.response.status,
            err.response.data
          )
        } else {
          console.error('미리보기 실패:', err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [pickedDate]) // 날짜 바뀔 때마다 새로 미리보기

  if (loading) return <div>주문 정보를 불러오는 중...</div>
  if (!preview) return <div>주문 정보를 가져올 수 없습니다.</div>

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        '/api/orders',
        {
          cart_item_ids: cartIds,
          desired_delivery_date: pickedDate
            ? pickedDate.toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          receiver,
          phone,
          addr,
          payment_method: paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (res.data.success) {
        alert('주문이 완료되었습니다!')
        // 성공 후 페이지 이동 (예: 주문 완료 페이지)
        navigate('/', { state: { order: res.data.data } })
      }
    } catch (err) {
      console.error('주문 생성 실패:', err)
      alert('주문에 실패했습니다.')
    }
  }

  return (
    <Container>
      <Header />
      <OrderContainer>
        <Orderbox>
          <OrderProductList items={preview.items} />
        </Orderbox>
        <Orderbox>
          <OrderDeliveryForm
            receiver={receiver}
            setReceiver={setReceiver}
            phone={phone}
            setPhone={setPhone}
            addr={addr}
            setAddr={setAddr}
            receiverRef={receiverRef}
            phoneRef={phoneRef}
            addrRef={addrRef}
          />
        </Orderbox>
        <Orderbox>
          <OrderDatePicker
            viewDate={viewDate}
            setViewDate={setViewDate}
            pickedDate={pickedDate}
            setPickedDate={setPickedDate}
            delivery={preview.delivery}
          />
        </Orderbox>
        <Orderbox>
          <OrderPaymentMethods
            paymentMethods={preview.payment_methods}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </Orderbox>
        <Orderbox>
          <OrderSummary totals={preview.totals} />
        </Orderbox>
        <OrderButton onClick={handleSubmit}>결제 하기</OrderButton>
      </OrderContainer>
    </Container>
  )
}
