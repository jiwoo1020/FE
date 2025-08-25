import React from 'react'
import styled from '@emotion/styled'
import FlowerImg from '../assets/b7d9af64da72a9d6cd3297b100d7b2df6a7006e8.png'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import Box from '../components/ProductCart/Box'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

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
  const navigate = useNavigate()
  const location = useLocation()
  const [items, setItems] = useState([])
  const selectAllRef = useRef(null)

  // 1. 장바구니 불러오기 (fetch 사용)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/items`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) throw new Error('장바구니 조회 실패')
        const data = await res.json()
        let list =
          data?.data?.items?.map(ci => ({
            id: ci.cart_item_id,
            title: ci.name,
            price: ci.unit_price,
            qty: ci.quantity,
            selected: false,
            img: ci.image_url,
            seller: ci.seller?.shop_name,
            spec: ci.spec,
          })) || []

        if (location.state?.addedItem) {
          list = [...list, location.state.addedItem]
        }

        setItems(list)
      } catch (err) {
        console.error('장바구니 조회 실패:', err)
      }
    }
    fetchCart()
  }, [location.state])

  // 2. 선택/전체선택
  const toggleSelect = (id, checked) =>
    setItems(prev => prev.map(it => (it.id === id ? { ...it, selected: checked } : it)))

  const toggleSelectAll = checked =>
    setItems(prev => prev.map(it => ({ ...it, selected: checked })))

  const allSelected = useMemo(() => items.length > 0 && items.every(it => it.selected), [items])
  const someSelected = useMemo(() => items.some(it => it.selected) && !allSelected, [items, allSelected])

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected
  }, [someSelected])

  // 3. 수량 변경 (fetch 사용)
  const updateQty = async (id, newQty) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQty }),
      })

      if (!res.ok) throw new Error('수량 변경 실패')
      const data = await res.json()

      setItems(prev =>
        prev.map(it =>
          it.id === id ? { ...it, qty: data.data.cart_item.quantity } : it
        )
      )
    } catch (err) {
      console.error('수량 변경 실패:', err)
      alert('수량 변경에 실패했습니다.')
    }
  }

  const incQty = id => {
    const item = items.find(it => it.id === id)
    if (item) updateQty(id, item.qty + 1)
  }

  const decQty = id => {
    const item = items.find(it => it.id === id)
    if (item && item.qty > 1) updateQty(id, item.qty - 1)
  }

  // 4. 삭제 (fetch 사용)
  const removeOne = async id => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error('삭제 실패')
      setItems(prev => prev.filter(it => it.id !== id))
    } catch (err) {
      console.error('장바구니 삭제 실패:', err)
      alert('장바구니 항목 삭제에 실패했습니다.')
    }
  }

  const removeSelected = async () => {
    try {
      const token = localStorage.getItem('token')
      const selectedIds = items.filter(it => it.selected).map(it => it.id)

      await Promise.all(
        selectedIds.map(async id => {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/items/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          if (!res.ok) throw new Error(`삭제 실패: ${id}`)
        })
      )

      setItems(prev => prev.filter(it => !selectedIds.includes(it.id)))
    } catch (err) {
      console.error('선택 항목 삭제 실패:', err)
      alert('선택 항목 삭제에 실패했습니다.')
    }
  }

  // 5. 주문 페이지 이동
  const handleOrder = () => {
    const selectedItems = items.filter(it => it.selected)
    if (selectedItems.length === 0) {
      alert('결제할 상품을 선택하세요.')
      return
    }
    navigate('/order', { state: { selectedItems } })
  }

  return (
    <Container>
      <Header />
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
            style={{
              opacity: items.some(i => i.selected) ? 1 : 0.4,
              cursor: items.some(i => i.selected) ? 'pointer' : 'not-allowed',
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
            item={item}
            onToggle={(id, checked) => toggleSelect(id, checked)}
            onInc={() => incQty(item.id)}
            onDec={() => decQty(item.id)}
            onRemove={removeOne}
          />
        ))}
      </Body>
      <PButton onClick={handleOrder}> 선택 상품 결제하기 </PButton>
    </Container>
  )
}
