import styled from '@emotion/styled'
import FlowerImg from '../assets/b7d9af64da72a9d6cd3297b100d7b2df6a7006e8.png'
import { BiCalendar } from 'react-icons/bi'
import arrowleft from '../assets/arrow-left.svg'
import arrowright from '../assets/arrow-right.svg'
import { useMemo, useRef, useState } from 'react'

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px; /* 모바일 최대 폭 */
  margin: 0 auto;
  background: #ffffff;
  min-height: 100vh;
  height: auto;
  overflow-y: auto;
  padding-bottom: 90px;
`
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #1f3906;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 306px;
  box-sizing: border-box;
`
const OrderContainer = styled.div`
  display: flex;
  width: 362px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 11px;
  margitn-top: 11px;
  gap: 8px;
`
const Orderbox = styled.div`
  display: flex;
  width: 343px;
  padding: 11px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  margin-top: 11px;
`
const OrderTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 17px;
`
const DetailLine = styled.div`
  display: flex;
  width: 328px;
  height: 87px;
  padding-right: 241px;
  align-items: center;
  flex-shrink: 0;
  flex-direction: row;
`
const DetailTextBox = styled.div`
  width: 235px;
  height: 87px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #f8f8f8;
  flex-direction: column;
  align-text: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 21px;
`
const DetailTitle = styled.div`
  color: #111;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-self: stretch;
  margin-bottom: 6px;
  margin-top: 14px;
`
const Detail = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 9px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 22px;
`
const DeliverTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const DeliverTextBox = styled.div`
  display: flex;
  width: 343px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`
const DeliverTextLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`
const PlaceBox = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const PlaceText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const Place = styled.div`
  width: 120px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`
const NumberContainer = styled.div`
  display: flex;
  width: 213px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
const NumberTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const NumberBox = styled.div`
  width: 213px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`
const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`
const PeopleTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const PeopleBox = styled.div`
  width: 343px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`
const DateContainer = styled.div`
  display: flex;
  padding: 11px;
  align-items: flex-start;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  flex-direction: row;
  width: 343px;
`
const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin-top: 15px;
`
const DateText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const GuideText = styled.div`
  color: #777;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 4px;
`
const OptionBox = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 5px;
`
const OptinLine = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 5px;
`
const OPtionText = styled.div`
  color: #3a3a3a;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const CalendarBox = styled.div`
  display: flex;
  width: 175px;
  height: 174px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  max-width: 175px;
  width: 100%;
`
const DateBox = styled.div`
  display: flex;

  padding: 12px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid #808080;
`
const DateTextBox = styled.div`
  display: flex;
  width: 146px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`
const PayTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const ButtonLine = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  flex-direction: row;
`
const CashButton = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.37);
  background: #000;
  color: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const CardButton = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #d5d5d5;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const TotalLine = styled.div`
  display: flex;
  width: 317px;
  align-items: center;
  gap: 200px;
  flex-direction: row;
`
const Total = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Howmuch = styled.div`
  color: #d70505;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const Box = styled.div`
  display: flex;
  height: 56px;
  padding-left: 13px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
`
const MoneyLine = styled.div`
  display: flex;
  align-items: center;
  gap: 200px;
  align-self: stretch;
  flex-direction: row;
`
const Pay = styled.div`
  color: #777;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const Product = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const TaxLine = styled.div`
  display: flex;
  align-items: center;
  gap: 225px;
  align-self: stretch;
  flex-direction: row;
`
const OrderButton = styled.div`
  display: flex;
  width: 362px;
  height: 40px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #1f3906;
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const MonthBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`
const July = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 6px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 8.4px */
  letter-spacing: -0.15px;
`
const Agust = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 7px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 9.8px */
  letter-spacing: -0.175px;
`
const September = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 6px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 8.4px */
  letter-spacing: -0.15px;
`
const InputInner = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 14px;
  line-height: 1.4;
  padding: 8px 0;
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const CalGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(0, 1fr)); /* ✔ 7열, 최소폭 0 */
  gap: 8px 10px;
  margin-top: 10px;
`

const DowCell = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  aspect-ratio: 1 / 1;
  color: ${p => (p.isSun ? '#e84e4e' : '#888')};
`

const DateCell = styled.button`
  all: unset;
  width: 100%;
  aspect-ratio: 1 / 1; /* ← 정사각형 자동 */
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  font-family: 'Pretendard', sans-serif;
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  color: ${p => (p.isSun ? '#e84e4e' : '#333')};
  background: ${p => (p.selected ? '#e6e6e6' : 'transparent')};
  &:hover {
    background: ${p => (p.disabled ? 'transparent' : '#f0f0f0')};
  }
`

export default function Order() {
  const [receiver, setReceiver] = useState('')
  const [phone, setPhone] = useState('')
  const [addr, setAddr] = useState('')

  // 포커스용 ref
  const receiverRef = useRef(null)
  const phoneRef = useRef(null)
  const addrRef = useRef(null)

  // 달력: 보이는 달 / 선택 날짜
  const [viewDate, setViewDate] = useState(new Date()) // 보이는 달 (월 이동용)
  const [pickedDate, setPickedDate] = useState(null) // 선택된 날짜

  const y = viewDate.getFullYear()
  const m = viewDate.getMonth() // 0=Jan

  // 보이는 달의 칸들(앞쪽 빈칸 + 날짜)
  const cells = useMemo(() => {
    const first = new Date(y, m, 1)
    const leading = first.getDay() // Sun=0..Sat=6
    const days = new Date(y, m + 1, 0).getDate()
    const arr = []
    for (let i = 0; i < leading; i++) arr.push(null)
    for (let d = 1; d <= days; d++) arr.push(new Date(y, m, d))
    return arr
  }, [y, m])

  const sameDate = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const fmtK = d => {
    if (!d) return ''
    const dw = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]
    return `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()} (${dw})`
  }

  const prevMonth = () => setViewDate(new Date(y, m - 1, 1))
  const nextMonth = () => setViewDate(new Date(y, m + 1, 1))
  return (
    <Container>
      <Header></Header>
      <OrderContainer>
        <Orderbox>
          <OrderTitle>주문 상품 총 1개</OrderTitle>
          <DetailLine>
            <img
              src={FlowerImg}
              alt="꽃 이미지"
              style={{
                width: '87px',
                height: '87px',
                flexshrink: '0',
                borderRadius: '24px',
              }}
            />
            <DetailTextBox>
              <DetailTitle>작약(Peony)</DetailTitle>
              <Detail style={{ whiteSpace: 'pre-line' }}>
                {' '}
                {
                  '수량 : 5 송이\n 구매 농장 :  멋사네 가게\n색상 : 연분홍 / 원산지: 국산 / 크기: 10~12 cm\n특징 : 꽃잎이 겹겹이 풍성하고 둥근 상태'
                }
              </Detail>
            </DetailTextBox>
          </DetailLine>
        </Orderbox>
        <Orderbox>
          <DeliverTitle>배송지 입력</DeliverTitle>
          <DeliverTextBox>
            <DeliverTextLine>
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
                  {' '}
                  <InputInner
                    ref={phoneRef}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </NumberBox>
              </NumberContainer>
            </DeliverTextLine>
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
          </DeliverTextBox>
        </Orderbox>
        <DateContainer>
          <DateTextBox>
            <Title>희망 배송일</Title>
            <DateInputWrapper>
              <DateBox>
                <DateText>{fmtK(pickedDate)}</DateText>
              </DateBox>
              <BiCalendar></BiCalendar>
            </DateInputWrapper>
            <GuideText>2025년 8월 17일 이후로 선택 가능합니다.</GuideText>
            <OptionBox>
              <input
                type="checkbox"
                style={{
                  transform: 'scale(0.8)',
                }}
              />
              <OptinLine>
                <OPtionText>가능한 빠른 배송 요망</OPtionText>
              </OptinLine>
            </OptionBox>
          </DateTextBox>
          <CalendarBox>
            <MonthBox>
              <July onClick={prevMonth}>July</July>
              <img
                src={arrowleft}
                alt="왼쪽 화살표"
                style={{
                  display: 'flex',
                  width: '8px',
                  height: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Agust>
                {viewDate.toLocaleString('en-US', { month: 'long' })} {y}
              </Agust>
              <img
                src={arrowright}
                alt="오른쪽 화살표"
                style={{
                  display: 'flex',
                  width: '8px',
                  height: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <September onClick={nextMonth}>September</September>
            </MonthBox>
            <CalGrid>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <DowCell key={d} isSun={d === 'Sun'}>
                  {d}
                </DowCell>
              ))}

              {cells.map((d, i) => (
                <DateCell
                  key={i}
                  disabled={!d}
                  isSun={!!d && d.getDay() === 0}
                  selected={sameDate(d, pickedDate)}
                  onClick={() => d && setPickedDate(d)}
                >
                  {d ? d.getDate() : ''}
                </DateCell>
              ))}
            </CalGrid>
          </CalendarBox>
        </DateContainer>
        <Orderbox>
          <PayTitle>결제 수단</PayTitle>
          <ButtonLine>
            <CashButton>현금</CashButton>
            <CardButton>간편 결제</CardButton>
          </ButtonLine>
        </Orderbox>
        <Orderbox>
          <TotalLine>
            <Total>총 결제금액</Total>
            <Howmuch>18,000원</Howmuch>
          </TotalLine>
          <Box>
            <MoneyLine>
              <Pay>총 상품 가격</Pay>
              <Product>18,000원</Product>
            </MoneyLine>
            <TaxLine>
              <Pay>배송비</Pay>
              <Product>무료 배송</Product>
            </TaxLine>
          </Box>
        </Orderbox>
        <OrderButton>결제 하기</OrderButton>
      </OrderContainer>
    </Container>
  )
}
