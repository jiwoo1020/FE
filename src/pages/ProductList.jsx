import styled from '@emotion/styled'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { BottomSheet } from '../components/product/BottomSheet'
import MainHeader from '../components/nav/Header'
import { useNavigate } from 'react-router-dom'
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
`
const ContentBox = styled.div`
  display: flex;
  width: 393px;
  height: 794px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  flex-shrink: 0;
`
const SearchFrame = styled.div`
  width: 393px;
  height: 82px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`
const SearchContainer = styled.div`
  display: flex;
  width: 362px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 9px 15px 15px 16px;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 243.5px;
  border-radius: 30px;
  background: #efefef;
  width: 332px;
  height: 35px;
  padding-left: 16.5;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const TagList = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 15px;
`
const Tag = styled.div`
  display: flex;
  height: 16px;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #d9d9d9;
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const GrayLine = styled.div`
  width: 393px;
  height: 1px;
  flex-shrink: 0;
  background: #efeded;
  margin-bottom: 15px;
`
const FilterList = styled.div`
  display: flex;
  height: 16px;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  flex-direction: row;
  margin-left: 11px;
`
const FilterButton = styled.div`
  display: flex;
  height: 16px;
  padding: 2px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: 0.5px solid #afaeae;
  background: #fffdfd;
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`
const ProductFrame = styled.div`
  display: flex;
  height: 552px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  flex-shrink: 0;
`
const ProductContainer = styled.div`
  display: grid;
  grid-auto-flow: row; /* 혹시 전역에서 column으로 바꿔놨다면 덮어쓰기 */
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 362px;
  align-items: center;
  gap: 7px;
  margin: 0px 15px 0px 16px;
`
const ProductBox = styled.div`
  width: 116px;
  height: 174px;
  flex-shrink: 0;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.57);
  background: #fff;
  align-items: center;
`
const Group = styled.div`
  display: flex;
  width: 100px;
  flex-direction: column;
  align-items: flex-end;
  gap: 9px;
  margin: 10px 8px 11px 8px;
  height: 153px;
`
const PictureBox = styled.div`
  width: 100px;
  height: 115px;
  flex-shrink: 0;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.49);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`
const ProductTextBox = styled.div`
  display: flex;
  width: 96.5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`
const TextLine = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  align-self: stretch;
  flex-direction: row;
  width: 96.5px;
  height: 12px;
`
const Price = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const Name = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const Store = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const TAGS = [
  '하이브리드 티',
  '플로리분다',
  '그랜드플로라',
  '미니어처',
  '클라이밍',
  '슈럽',
]
const CHIPS = ['조회순', '카테고리', '가격', '종류', '색상']

const MOCK = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  price: 20000,
  name: '장미',
  store: '멋사네 가게',
}))

export default function ProductList() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [activeChip, setActiveChip] = useState(null)

  const handleClose = () => setOpen(false)
  const handleReset = () => {
    /* 선택값 초기화 */
  }
  const handleApply = () => setOpen(false)
  const [selected, setSelected] = useState({
    sort: '인기순',
    category: null,
    price: [10000, 50000],
  })
  const filtered = useMemo(() => MOCK, [selected])
  const ProductHandleClick = id => {
    navigate(`/product/${id}`)
  }

  return (
    <Container>
      <MainHeader />
      <ContentBox>
        <SearchFrame>
          <SearchContainer>
            <SearchBox>
              <text>장미</text>
            </SearchBox>
          </SearchContainer>
          <TagList>
            {TAGS.map(t => (
              <Tag key={t}>{t}</Tag>
            ))}
          </TagList>
          <GrayLine></GrayLine>
          <FilterList>
            {CHIPS.map(c => (
              <FilterButton
                key={c}
                active={activeChip === c}
                onClick={() => {
                  setActiveChip(c)
                  setOpen(true)
                }}
              >
                {c} ▾
              </FilterButton>
            ))}
          </FilterList>
          <BottomSheet
            open={open}
            title="필터"
            onClose={handleClose}
            onReset={handleReset}
            onApply={handleApply}
          >
            {/* activeChip에 따라 내용 스위칭 */}
            {activeChip === '인기순' && (
              <div style={{ padding: 8 }}>정렬 옵션들…</div>
            )}
            {activeChip === '카테고리' && (
              <div style={{ padding: 8 }}>카테고리 옵션들…</div>
            )}
            {activeChip === '가격' && (
              <div style={{ padding: 8 }}>가격 슬라이더…</div>
            )}
            {!['인기순', '카테고리', '가격'].includes(activeChip ?? '') && (
              <div style={{ padding: 8, color: '#888' }}>
                ‘{String(activeChip)}’ 패널을 추가하세요.
              </div>
            )}
          </BottomSheet>
        </SearchFrame>
        <ProductFrame>
          <ProductContainer>
            {filtered.map(p => (
              <ProductBox
                key={p.id}
                onClick={() => {
                  ProductHandleClick(p.id)
                }}
              >
                <Group>
                  <PictureBox />
                  <ProductTextBox>
                    <Price>{p.price.toLocaleString()}</Price>
                    <TextLine>
                      <Name>{p.name}</Name>
                      <Store>{p.store}</Store>
                    </TextLine>
                  </ProductTextBox>
                </Group>
              </ProductBox>
            ))}
          </ProductContainer>
        </ProductFrame>
      </ContentBox>
    </Container>
  )
}
