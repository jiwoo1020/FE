import React from 'react'
import styled from '@emotion/styled'
import FlowerImg from '../assets/b7d9af64da72a9d6cd3297b100d7b2df6a7006e8.png'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import Box from '../components/ProductCart/Box'
import { useState, useMemo, useRef, useEffect } from 'react'
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
const Up = styled.div`
  display: flex;
  width: 393px;
  height: 37px;

  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-bottom: 0.5px solid #d5d5d5;
  background: #fff;
`
const DeleteLine = styled.div`
  display: flex;
  width: 362px;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`
const TotalPick = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const DeleteText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Body = styled.div`
  display: flex;
  width: 362px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 17px;
  padding: 16px;
`
const PButton = styled.div`
  display: flex;
  width: 362px;
  height: 40px;
  margin-left: 16px;
  justify-content: center;
  align-items: center;
  gap: 15px;
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

export default function ProductCart() {
  const initial = [
    {
      id: '1',
      title: '작약 (Peony)',
      price: 15000,
      qty: 5,
      selected: false,
      img: '/peony.png',
    },
    {
      id: '2',
      title: '작약 (Peony)',
      price: 15000,
      qty: 5,
      selected: false,
      img: '/peony.png',
    },
    {
      id: '3',
      title: '작약 (Peony)',
      price: 15000,
      qty: 5,
      selected: false,
      img: '/peony.png',
    },
    {
      id: '4',
      title: '작약 (Peony)',
      price: 15000,
      qty: 5,
      selected: false,
      img: '/peony.png',
    },
  ]
  const [items, setItems] = useState(initial)

  const toggleSelect = (id, checked) =>
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, selected: checked } : it))
    )

  const toggleSelectAll = checked =>
    setItems(prev => prev.map(it => ({ ...it, selected: checked })))

  const incQty = id =>
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    )

  const decQty = id =>
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    )

  const removeOne = id => setItems(prev => prev.filter(it => it.id !== id))

  const removeSelected = () => setItems(prev => prev.filter(it => !it.selected))

  // 상단 체크박스용 파생 상태
  const allSelected = useMemo(
    () => items.length > 0 && items.every(it => it.selected),
    [items]
  )
  const someSelected = useMemo(
    () => items.some(it => it.selected) && !allSelected,
    [items, allSelected]
  )
  const selectAllRef = useRef(null)
  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected
  }, [someSelected])

  return (
    <Container>
      <Header></Header>
      <Up>
        <DeleteLine>
          <TotalPick>
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={allSelected}
              onChange={e => toggleSelectAll(e.target.checked)}
              style={{ transform: 'scale(0.9)' }}
            />
            전체선택({items.filter(i => i.selected).length}/{items.length})
          </TotalPick>
          <DeleteText
            onClick={removeSelected}
            disabled={!items.some(i => i.selected)}
            style={{
              opacity: items.some(i => i.selected) ? 1 : 0.4,
              cursor: items.some(i => i.selected) ? 'pointer' : 'not-allowed',
              background: 'none',
              border: 0,
            }}
          >
            선택 삭제
          </DeleteText>
        </DeleteLine>
      </Up>
      <Body>
        {items.map(item => (
          <Box
            key={item.id}
            item={item} // 한 덩어리로 전달
            onToggle={checked => toggleSelect(item.id, checked)}
            onInc={() => incQty(item.id)}
            onDec={() => decQty(item.id)}
            onRemove={() => removeOne(item.id)}
          />
        ))}
      </Body>
      <PButton> 선택 상품 결제하기</PButton>
    </Container>
  )
}
