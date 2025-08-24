import {
  PlaceBox,
  PlaceText,
  Place,
  InputInner,
  NumberContainer,
  NumberTitle,
  NumberBox,
  PeopleContainer,
  PeopleTitle,
  PeopleBox,
} from './order.styles'

export default function OrderDeliveryForm({
  receiver,
  setReceiver,
  phone,
  setPhone,
  addr,
  setAddr,
  receiverRef,
  phoneRef,
  addrRef,
}) {
  return (
    <div>
      <h3>배송지 입력</h3>
      <div style={{ display: 'flex', gap: 10 }}>
        <PlaceBox>
          <PlaceText>받는 분</PlaceText>
          <Place onClick={() => receiverRef.current?.focus()}>
            <InputInner
              ref={receiverRef}
              value={receiver}
              onChange={e => setReceiver(e.target.value)}
            />
          </Place>
        </PlaceBox>
        <NumberContainer>
          <NumberTitle>연락처</NumberTitle>
          <NumberBox onClick={() => phoneRef.current?.focus()}>
            <InputInner
              ref={phoneRef}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </NumberBox>
        </NumberContainer>
      </div>
      <PeopleContainer>
        <PeopleTitle>주소</PeopleTitle>
        <PeopleBox onClick={() => addrRef.current?.focus()}>
          <InputInner
            ref={addrRef}
            value={addr}
            onChange={e => setAddr(e.target.value)}
          />
        </PeopleBox>
      </PeopleContainer>
    </div>
  )
}
