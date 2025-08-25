// BuySheet.jsx
import styled from '@emotion/styled'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  align-items: flex-end; /* 아래에서 올라오게 */
  justify-content: center;
`
const Sheet = styled.div`
  background: #fff;
  width: 100%;
  height: 276px;
  max-width: 393px; /* 모바일 디자인 맞춤 */
  border-radius: 16px 16px 0 0;
  bottom: 0;
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
`
const TitleLine = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 13px;
  margin-left: 31px;
  margin-right: 31px;
  gap: 147px;
`
const Title = styled.div`
  width: 28px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const OptionContainer = styled.div`
  display: flex;
  width: 393px;

  padding-bottom: 14px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
`
const FOptionBox = styled.div`
  display: flex;
  height: 37px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px 10px 0 0;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  background: #fff;
  margin-top: 19.85px;
  width: 331px;
  margin-left: 31px;
`
const NumberText = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-left: 11px;
`
const SOptionBox = styled.div`
  display: flex;
  height: 37px;
  width: 331px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 31px;
  gap: 10px;
  align-self: stretch;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  background: #fff;
`
const FiveLine = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: row;
  padding-left: 11px;
`
const Circle = styled('input')`
  width: 15px;
  height: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
  cursor: pointer;
`
const Five = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex-direction: row;
  gap: 82px;
  padding-left: 11px;
  padding-right: 11px;
`
const LOptionBox = styled.div`
  display: flex;
  height: 37px;
  margin-left: 31px;
  align-items: center;
  gap: 10px;
  width: 331px;
  align-self: stretch;
  border-radius: 0 0 10px 10px;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  background: #fff;
`
const Self = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  flex-direction: row;
`
const Left = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const SelfText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const PutBox = styled('input')`
  display: flex;
  width: 67px;
  height: 22px;
  padding: 3px;
  flex-direction: column;
  align-items: right;
  gap: 10px;
  border-radius: 5px;
  background: #d9d9d9;
  text-align: right;
  justify-content: center;
`
const PutText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-right: 3px;
  justify-content: right;
`
const PurchaseButton = styled.div`
  display: flex;
  width: 362px;
  height: 40px;
  margin-left: 15.5px;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  background: #1f3906;
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
export default function BuySheet({ onClose, product }) {
  const [selected, setSelected] = useState(null)
  const [custom, setCustom] = useState('')
  const navigate = useNavigate()

  const pick = v => {
    setSelected(v)
    if (v !== 'custom') setCustom('')
  }

  const onCustomChange = e => {
    const v = e.target.value.replace(/[^\d]/g, '')
    setCustom(v)
    if (selected !== 'custom') setSelected('custom')
  }

  const handlePurchase = () => {
    const finalQty = selected === 'custom' ? Number(custom) : Number(selected)

    if (!finalQty || finalQty <= 0) {
      alert('수량을 선택하거나 입력하세요.')
      return
    }

    navigate('/order', {
      state: {
        product: {
          ...product, // 부모에서 넘겨준 상품 정보 (id, name, price, img 등)
          quantity: finalQty,
        },
      },
    })
  }

  return (
    <Backdrop onClick={onClose}>
      <Sheet onClick={e => e.stopPropagation()}>
        <TitleLine>
          <Title>옵션</Title>
          <AiOutlineClose
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          ></AiOutlineClose>
        </TitleLine>
        <OptionContainer>
          <FOptionBox>
            <NumberText>개수 선택하기</NumberText>
          </FOptionBox>
          <SOptionBox onClick={() => pick('5')}>
            <FiveLine>
              <Circle
                id="q5"
                type="radio"
                name="quantity"
                checked={selected === '5'}
                onChange={() => pick('5')}
              />
              <Five>5 송이</Five>
            </FiveLine>
          </SOptionBox>
          <SOptionBox onClick={() => pick('10')}>
            <FiveLine>
              <Circle
                id="q10"
                type="radio"
                name="quantity"
                checked={selected === '10'}
                onChange={() => pick('10')}
              />
              <Five>10 송이</Five>
            </FiveLine>
          </SOptionBox>
          <LOptionBox>
            <Line>
              <Self>
                <SelfText as="label" htmlFor="qCustom">
                  직접 입력하기
                </SelfText>

                <PutBox
                  id="qCustom"
                  type="text" // 또는 number
                  inputMode="numeric"
                  placeholder="송이"
                  value={custom}
                  onChange={onCustomChange}
                  onFocus={() => selected !== 'custom' && setSelected('custom')}
                />
              </Self>
              <Left>남은 수량: 12송이</Left>
            </Line>
          </LOptionBox>
        </OptionContainer>
        <PurchaseButton onClick={handlePurchase}>결제하기</PurchaseButton>
      </Sheet>
    </Backdrop>
  )
}
