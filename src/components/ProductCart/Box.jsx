import styled from '@emotion/styled'
import FlowerImg from '../../assets/b7d9af64da72a9d6cd3297b100d7b2df6a7006e8.png'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'

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
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const Center = styled.div`
  display: flex;
  width: 106px;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
  margin-left: 21px;
  margin-top: 16px;
`
const Shop = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`
const ShopDetail = styled.div`
  width: 102px;
  height: 36px;
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Right = styled.div`
  display: flex;
  width: 54px;
  flex-direction: column;
  align-items: flex-end;
  gap: 65px;
  margin-left: 46px;
  margin-top: 10px;
`
const PriceTextLine = styled.div`
  display: flex;
  flex-direction: row;
`
const Price = styled.div`
  color: #e84e4e;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const Won = styled.div`
  color: #292d32;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const ShopBox = styled.div`
  width: 362px;
  height: 128px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
`

export default function Box({ item, onToggle, onInc, onDec, onRemove }) {
  if (!item) return null // 방어
  const { selected, qty, title, price, img } = item
  return (
    <ShopBox>
      <Left>
        <input
          type="checkbox"
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '5px',
            border: '1px solid #D5D5D5',
            background: '#FFF',
          }}
          checked={item.selected}
          onChange={e => onToggle(item.id, e.target.checked)}
        />
        <PictureBox>
          <img
            src={FlowerImg}
            alt="꽃 이미지"
            style={{ width: '74px', height: '74px', borderRadius: '24px' }}
          />
          <NumberLine>
            <AiOutlinePlusCircle
              color="#D5D5D5"
              strokeWidth={0.5}
              onClick={onDec}
            ></AiOutlinePlusCircle>
            <CountBox>5</CountBox>
            <AiOutlineMinusCircle
              color="#D5D5D5"
              strokeWidth={0.5}
              onClick={onInc}
            ></AiOutlineMinusCircle>
          </NumberLine>
        </PictureBox>
      </Left>
      <Center>
        <Shop> 멋사네 가게</Shop>

        <ShopDetail style={{ whiteSpace: 'pre-line' }}>
          {' '}
          {'상품명 : 작약 (Peony\n 색상 : 연분홍\n 크기 : 10~12cm'}
        </ShopDetail>
      </Center>
      <Right>
        <AiOutlineClose onClick={() => onRemove(item.id)}></AiOutlineClose>
        <PriceTextLine>
          <Price>{item.price}</Price>
          <Won>원</Won>
        </PriceTextLine>
      </Right>
    </ShopBox>
  )
}
