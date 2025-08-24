import styled from '@emotion/styled'
import FlowerImg from '../../assets/peony.svg'
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineClose,
} from 'react-icons/ai'

const Left = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 13px;
  margin-left: 12px;
`
const NumberLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
`
const PictureBox = styled.div`
  display: flex;
  width: 74px;
  padding-bottom: 19px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`
const CountBox = styled.div`
  display: flex;
  height: 15px;
  padding: 1px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: #e2e2e2;
  color: #000;
  font-size: 10px;
  font-weight: 500;
`
const Center = styled.div`
  display: flex;
  width: 140px;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
  margin-left: 21px;
  margin-top: 16px;
`
const Shop = styled.div`
  color: #808080;
  font-size: 10px;
`
const ShopDetail = styled.div`
  width: 120px;
  min-height: 36px;
  color: #000;
  font-size: 10px;
  white-space: pre-line;
`
const Right = styled.div`
  display: flex;
  width: 54px;
  flex-direction: column;
  align-items: flex-end;
  gap: 65px;
  margin-left: auto;
  margin-top: 10px;
`
const PriceTextLine = styled.div`
  display: flex;
  flex-direction: row;
`
const Price = styled.div`
  color: #e84e4e;
  font-size: 12px;
  font-weight: 500;
`
const Won = styled.div`
  color: #292d32;
  font-size: 12px;
  font-weight: 500;
`
const ShopBox = styled.div`
  width: 362px;
  height: 128px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
`

export default function Box({ item, onToggle, onInc, onDec, onRemove }) {
  if (!item) return null
  const { selected, qty, title, price, img, seller, spec } = item

  return (
    <ShopBox>
      <Left>
        <input
          type="checkbox"
          style={{ width: '15px', height: '15px' }}
          checked={selected}
          onChange={e => onToggle(item.id, e.target.checked)}
        />
        <PictureBox>
          <img
            src={img || FlowerImg}
            alt={title}
            style={{ width: '74px', height: '74px', borderRadius: '24px' }}
          />
          <NumberLine>
            <AiOutlineMinusCircle
              color="#D5D5D5"
              strokeWidth={0.5}
              onClick={onDec}
            />
            <CountBox>{qty}</CountBox>
            <AiOutlinePlusCircle
              color="#D5D5D5"
              strokeWidth={0.5}
              onClick={onInc}
            />
          </NumberLine>
        </PictureBox>
      </Left>
      <Center>
        <Shop>{seller}</Shop>
        <ShopDetail>{`상품명 : ${title}\n${spec || ''}`}</ShopDetail>
      </Center>
      <Right>
        <AiOutlineClose onClick={() => onRemove(item.id)} />
        <PriceTextLine>
          <Price>{price}</Price>
          <Won>원</Won>
        </PriceTextLine>
      </Right>
    </ShopBox>
  )
}
