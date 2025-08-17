/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
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
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  margin-bottom: 27px;
`
const Menuline = styled.div`
  display: flex;
  height: 30px;
  padding-right: 0.153px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  flex-direction: row;
`
const MenuBox = styled.div`
  display: flex;
  width: 140px;
  height: 20px;
  padding: 7px 13px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`
const MenuText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Check = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
`
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

/* ====== component ====== */
/**
 * BottomSheet
 * props:
 *  - open: boolean (필수)
 *  - title?: string (기본값 "필터")
 *  - onClose?: () => void
 *  - onApply?: () => void
 *  - onReset?: () => void
 *  - children: 시트 안에 들어갈 내용
 */
export function BottomSheet({
  open,
  title = '필터',
  onClose,
  onApply,
  onReset,
  children,
}) {
  // 열릴 때 배경 스크롤 잠금 + ESC 닫기
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
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>조회순</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>최신순</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>낮은 가격순</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>높은 가격순</MenuText>
                </MenuBox>
              </Menuline>
            </MenuContainer>
          </Menu>
          <Menu>
            {' '}
            카테고리
            <MenuContainer>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>생일</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>어버이날</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>스승의 날</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>졸업식</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>화이트데이</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>로즈데이</MenuText>
                </MenuBox>
              </Menuline>
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
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>장미</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>튤립</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>안개꽃</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>카네이션</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>데이지</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>기타</MenuText>
                </MenuBox>
              </Menuline>
            </MenuContainer>
          </Menu>
          <Menu>
            {' '}
            색상
            <MenuContainer>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>빨강</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>주황</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>노랑</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>초록</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>파랑</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>남색</MenuText>
                </MenuBox>
              </Menuline>
              <Menuline>
                <MenuBox>
                  <Check></Check>
                  <MenuText>보라</MenuText>
                </MenuBox>
                <MenuBox>
                  <Check></Check>
                  <MenuText>기타</MenuText>
                </MenuBox>
              </Menuline>
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
