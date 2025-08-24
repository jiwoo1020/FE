/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

/* ====== styled ====== */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 99998;
`

const Sheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999; /* Backdrop보다 높게 */
  max-width: 393px; /* 폰 프레임 기준 */
  width: 100%;
  height: 800px;
  margin: 0 auto;

  background: #fff;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  max-height: 85vh;

  animation: slideUp 0.22s ease-out;
  @keyframes slideUp {
    from {
      transform: translateY(24px);
      opacity: 0.85;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* iOS 하단 안전영역 */
  padding-bottom: env(safe-area-inset-bottom);
`

const Handle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: #ddd;
  margin: 8px auto 0;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  position: relative;
`
const Title = styled.h3`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Close = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  background: none;
  border: 0;
  font-size: 20px;
  cursor: pointer;
`

const Body = styled.div`
  padding: 12px 16px; /* Footer 자리 확보 */
  overflow: auto;
  gap: 27px;
`

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  width: 92%;
  background: #fff;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px;
  align-items: center;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    width: 140px;
  }
  .ghost {
    background: #f4f4f4;
    border: 1px solid #e6e6e6;
    font-weight: 700;
    height: 40px;
  }
  .solid {
    background: #111;
    color: #fff;
    border: 0;
    font-weight: 700;
    background: #1f3906;
    height: 40px;
  }
`
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const MenuContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  margin-bottom: 27px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
`
const MenuBox = styled.div`
  display: flex;
  height: 20px;
  padding: 18px 13px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  width: calc(50% - 10px);
  cursor: pointer;
  box-sizing: border-box;
`
const MenuText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Check = styled.div``
const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  margin-bottom: 27px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const PriceContainer = styled.div`
  display: flex;
  width: 362px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const PriceBox = styled.div`
  display: flex;
  width: 140px;
  height: 20px;
  padding: 7px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`
const Rectengle = styled.div`
  width: 10px;
  height: 1px;
  background: #000;
`
const PriceText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export default function BottomSheet({
  open,
  title = '필터',
  onClose,
  onApply,
  onReset,
  children,
}) {
  const [selectedSort, setSelectedSort] = useState(null)
  const [selectCategory, setSelectCategory] = useState(null)
  const [selectFlower, setSelectFlower] = useState(null)
  const [selectColor, setSelectColor] = useState(null)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
  if (!open) return null

  const sortOptions = [
    { value: '조회순', label: '조회순' },
    { value: '최신순', label: '최신순' },
    { value: '낮은 가격순', label: '낮은 가격순' },
    { value: '높은 가격순', label: '높은 가격순' },
  ]
  const category = [
    { value: '생일', label: '생일' },
    { value: '어버이날', label: '어버이날' },
    { value: '스승의 날', label: '스승의 날' },
    { value: '졸업식', label: '졸업식' },
    { value: '화이트데이', label: '화이트데이' },
    { value: '로즈데이', label: '로즈데이' },
  ]
  const flower = [
    { value: '장미', label: '장미' },
    { value: '튤립', label: '튤립' },
    { value: '안개꽃', label: '안개꽃 ' },
    { value: '카네이션', label: '카네이션' },
    { value: '데이지', label: '데이지' },
    { value: '기타', label: '기타' },
  ]
  const color = [
    { value: '빨강', label: '빨강' },
    { value: '주황', label: '주황' },
    { value: '노랑', label: '노랑 ' },
    { value: '초록', label: '초록' },
    { value: '파랑', label: '파랑' },
    { value: '남색', label: '남색' },
    { value: '보라', label: '보라' },
    { value: '기타', label: '기타' },
  ]

  // 조상 스타일 영향 제거: body에 포털 렌더
  return createPortal(
    <>
      <Backdrop onClick={onClose} />
      <Sheet role="dialog" aria-modal="true" aria-label={title}>
        <Handle />
        <Header>
          <Title>{title}</Title>
          <Close aria-label="닫기" onClick={onClose}>
            ×
          </Close>
        </Header>

        <Body>
          <Menu>
            정렬
            <MenuContainer>
              {sortOptions.map(option => (
                <MenuBox
                  key={option.value}
                  onClick={() => setSelectedSort(option.value)}
                >
                  {/* 선택 여부에 따라 체크 모양 달라짐 */}
                  <Check>{selectedSort === option.value ? '●' : '○'}</Check>
                  <MenuText>{option.label}</MenuText>
                </MenuBox>
              ))}
            </MenuContainer>
          </Menu>
          <Menu>
            {' '}
            카테고리
            <MenuContainer>
              {category.map(option => (
                <MenuBox
                  key={option.value}
                  onClick={() => setSelectCategory(option.value)}
                >
                  {/* 선택 여부에 따라 체크 모양 달라짐 */}
                  <Check>{selectCategory === option.value ? '●' : '○'}</Check>
                  <MenuText>{option.label}</MenuText>
                </MenuBox>
              ))}
            </MenuContainer>
          </Menu>
          <Price>
            {' '}
            가격
            <PriceContainer>
              <PriceBox>
                <Check></Check>
                <PriceText>10000</PriceText>
              </PriceBox>
              <Rectengle></Rectengle>
              <PriceBox>
                <Check></Check>
                <PriceText>50000</PriceText>
              </PriceBox>
            </PriceContainer>
          </Price>
          <Menu>
            {' '}
            종류
            <MenuContainer>
              {flower.map(option => (
                <MenuBox
                  key={option.value}
                  onClick={() => setSelectFlower(option.value)}
                >
                  {/* 선택 여부에 따라 체크 모양 달라짐 */}
                  <Check>{selectFlower === option.value ? '●' : '○'}</Check>
                  <MenuText>{option.label}</MenuText>
                </MenuBox>
              ))}
            </MenuContainer>
          </Menu>
          <Menu>
            {' '}
            색상
            <MenuContainer>
              {color.map(option => (
                <MenuBox
                  key={option.value}
                  onClick={() => setSelectColor(option.value)}
                >
                  {/* 선택 여부에 따라 체크 모양 달라짐 */}
                  <Check>{selectColor === option.value ? '●' : '○'}</Check>
                  <MenuText>{option.label}</MenuText>
                </MenuBox>
              ))}
            </MenuContainer>
          </Menu>
        </Body>

        <Footer>
          <button className="solid" onClick={onApply}>
            적용하기
          </button>
        </Footer>
      </Sheet>
    </>,
    document.body
  )
}
