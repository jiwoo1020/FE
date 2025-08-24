import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import StepCard from '../components/register/StepCard'
import WriteIcon from '../assets/step1.png'
import CameraIcon from '../assets/step2.png'
import AiIcon from '../assets/step3.png'
import Flower from '../assets/peony.svg'
import { FaAngleRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import MainHeader from '../components/nav/Header'

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

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 17px 17px 0 17px;
  gap: 20px;
  box-sizing: border-box;
`

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  letter-spacing: -0.96px;
`

const ManageProductHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const Toggle = styled.div`
  display: inline-flex;
  height: 16px;
  min-width: 40px;
  padding: 1px 1px 1px 2px;
  justify-content: ${props => (props.isSoldOut ? 'flex-start' : 'flex-end')};
  align-items: center;
  gap: 1px;
  border-radius: 24px;
  background-color: ${props => (props.isSoldOut ? '#C4C4C4' : '#5ADC5D')};
`
const ToggleButton = styled.div`
  width: 13px;
  height: 14px;
  border-radius: 24px;
  background: #fff;
`
const ToggleLabel = styled.div`
  color: #FFFEFE;
  font-size: 8px;
`
const Grid = styled.div`
  padding-top: 7px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 고정 */
  gap: 12px;
  box-sizing: border-box;
`
const ProductCard = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  aspect-ratio: 1 / 1; /* 정사각형 유지 */
  border-radius: 18px;
  overflow: hidden;
  background-color: gray;
  cursor: pointer;
`

const ProductName = styled.div`
  color: #fff;
  font-size: 12px;
  padding: 13px;
`

/*새 상품 등록*/

const ProductRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`

const MyGroupBuyList = styled.div`
  color: #000;
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: #000;
  font-size: 16px;
`
const GroupBuyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  justify-content: center;
`

const GroupBuyHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: nowrap;
`

const GroupBuyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const GroupBuyItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 352px;
  height: auto;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 7px;
  box-sizing: border-box;
`

const ProductImg = styled.img`
  width: 61px;
  height: 61px;
  border-radius: 24px;
  flex-shrink: 0;
`

const Dot = styled.div`
  width: 9px;
  height: 9px;
  aspect-ratio: 1/1;
  background-color: #ff0000;
  border-radius: 50px;
`

const State = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const StateText = styled.div`
  color: #f00;
  font-size: 12px;
  white-space: nowrap;
`

const StoreName = styled.div`
  color: #000;
  font-size: 16px;
  white-space: nowrap;
`

const FlowerName = styled.div`
  color: #000;
  font-size: 14px;
  white-space: nowrap;
`
const Line = styled.div`
  margin-left: 76px;
  margin-top: 5px;
  width: 274px;
  height: 0.5px;
  background-color: #f0f0f0;
`
const PriceContainer = styled.div`
  margin-top: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`
const SellingPriceTitle = styled.div`
  font-size: 16px;
  color: #000;
`

const SellingPrice = styled.div`
  margin-left: auto;
  font-size: 16px;
  font-weight: 900;
`

const DeliveryContainer = styled.div`
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`

const DeliveryTitle = styled.div`
  font-size: 14px;
  color: #000;
`

const Delivery = styled.div`
  margin-left: auto;
  font-size: 14px;
  color: #000;
`
const Line2 = styled.div`
  width: 430px;
  height: 1px;
  background: #d9d9d9;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  margin-left: -17px;
`

const FixInfo = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
  cursor: pointer;
`

export default function ProfileSell() {
  const [products, setProducts] = useState([])
  const [groupBuys, setGroupBuys] = useState([])         //공동구매 목록 상태
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(null)         
  const navigate = useNavigate()

  const [showSoldOut, setShowSoldOut] = useState(false)

  useEffect(() => {
    // 이름만 있는 목데이터
    const mockNames = ['장미 ', '해바라기', '튤립', '백합', '수국', '라일락']
    setProducts(mockNames)
  }, [])

  useEffect(() => {
    const fetchGroupPurchaseList = async () => {
      try {
        const rawToken = localStorage.getItem('token')
        if (!rawToken) {
          console.warn('🔑 토큰이 없습니다.')
          return
        }
  
        const token = rawToken.startsWith('Bearer') ? rawToken : `Bearer ${rawToken}`
        console.log('📦 최종 Authorization 헤더:', token)
        console.log('🌐 API URL:', import.meta.env.VITE_API_URL)
  
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/group-purchases`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        })
  
        if (!res.ok) {
          console.error('❌ 응답 실패:', res.status, res.statusText)
          throw new Error('공동구매 목록 응답 실패')
        }
  
        const data = await res.json()
        console.log('✅ 공동구매 목록 불러오기 성공:', data)
        setGroupBuys(Array.isArray(data?.content) ? data.content : [])
      } catch (err) {
        console.error('❌ 공동구매 목록 불러오기 실패', err)
        setError(err.message || '불러오기 실패')
      } finally {
        setLoading(false)
      }
    }
  
    setLoading(true)
    setError(null)
    fetchGroupPurchaseList()
  }, [])
  

  const STEP_ITEMS = [
    {
      iconSrc: WriteIcon,
      title: 'Step 1 · 기본 정보 입력',
      description: '판매할 식물의 이름, 판매 가격, 재고 등을 입력해주세요',
      path: '/product/register/text',
    },
    {
      iconSrc: CameraIcon,
      title: 'Step 2 · 사진 업로드',
      description: `판매할 식물의 사진을 2~3장
  다양한 각도에서 찍어주세요`,
      path: '/product/register/image',
    },
    {
      iconSrc: AiIcon,
      title: 'Step 3 · 신선도 판별',
      description: `업로드한 사진으로 AI가 신선도를 판별합니다
  (2~3분 소요)`,
      path: '/freshness',
    },
  ]

  return (
    <Container>
      <MainHeader />
      <MainContainer>
        <Title>반갑습니다, 머쨍이님</Title>
        <ManageProductHeader>
          <p
            style={{
              color: '#000',
              WebkitTextStrokeWidth: '0.2px',
              WebkitTextStrokeColor: '#000',
              fontSize: '16px',
              margin: '0',
            }}
          >
            나의 상품
          </p>
          <Toggle onClick={() => setShowSoldOut(prev => !prev)} isSoldOut={showSoldOut}>
          {showSoldOut ? (
            <>
              <ToggleButton isSoldOut={showSoldOut} />
              <ToggleLabel
                style={{
                  position: 'relative',
                  left: '5px',
                }}
              >
                품절
              </ToggleLabel>
            </>
          ) : (
            <>
              <ToggleLabel>판매 중</ToggleLabel>
              <ToggleButton isSoldOut={showSoldOut} />
            </>
          )}
          </Toggle>
        </ManageProductHeader>
        <Grid>
          {products.map((name, idx) => (
            <ProductCard key={idx} onClick={() => navigate('/product/:id')}>
              <ProductName>{name}</ProductName>
            </ProductCard>
          ))}
        </Grid>

        <ProductRegisterContainer>
          <p
            style={{
              color: '#000',
              WebkitTextStrokeWidth: '0.2px',
              WebkitTextStrokeColor: '#000',
              fontSize: '16px',
              margin: '0',
            }}
            onClick={() => navigate('../product/register/text')}
          >
            새 상품 등록
          </p>

          {STEP_ITEMS.map(item => (
            <StepCard
              key={item.title} // index 쓰지 마. title이나 고유 id 써.
              iconSrc={item.iconSrc}
              title={item.title}
              description={item.description}
              onClick={() => navigate(item.path)}
            />
          ))}
        </ProductRegisterContainer>

        <MyGroupBuyList>공동구매 목록</MyGroupBuyList>
        {loading && <div style={{ fontSize: 14 }}>불러오는 중...</div>}
        {error && (
          <div style={{ fontSize: 14, color: 'crimson' }}>
            불러오기 실패: {error}
          </div>
        )}

        <GroupBuyContainer>
          {groupBuys.map(item => (
            <GroupBuyItem key={item.id} onClick={() => navigate(`/groupbuy/${item.id}`)}>
              <GroupBuyHeader>
                <ProductImg src={item.imageUrl || Flower} alt="공동구매 이미지" />
                <GroupBuyInfo>
                  <State>
                    <Dot />
                    <StateText>{item.farmName || '공동구매 진행중'}</StateText>
                  </State>
                  <StoreName>{item.farmName || '멋사네'}</StoreName>
                  <FlowerName>
                    <span
                      style={{
                        color: '#979797',
                        fontSize: '12px',
                        marginLeft: '0px',
                      }}
                    >
                      {item.currentParticipants ?? 0}/{item.maxParticipants ?? 0} 명
                    </span>
                  </FlowerName>
                </GroupBuyInfo>
                {/* 오른쪽: 상세정보 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px',margin: 'auto 0', marginLeft: '100px'}}>
                  <span
                    style={{
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      //visibility: item.id ? 'visible' : 'hidden', // ✅ 공간 유지
                      cursor: 'pointer',
                    }}
                    onClick={e => {
                      e.stopPropagation()
                      navigate(`/groupbuy/${item.id}`)
                    }}
                  >
                    상세정보 &gt;
                  </span>
                  {/*<MoveIcon /> */}
                </div>
              </GroupBuyHeader>
              <Line />
              <PriceContainer>
                <SellingPriceTitle>판매 금액</SellingPriceTitle>
                <SellingPrice>
                  {item.priceText ||
                    (item.price != null
                      ? `${item.price.toLocaleString()} 원`
                      : '-')}
                </SellingPrice>
              </PriceContainer>
              <DeliveryContainer>
                <DeliveryTitle>배송지</DeliveryTitle>
                <Delivery>{item.address}</Delivery>
              </DeliveryContainer>
            </GroupBuyItem>
          ))}

          {!loading && !error && groupBuys.length === 0 && (
            <div style={{ fontSize: 12, color: '#666' }}>
              진행 중인 공동구매가 없습니다.
            </div>
          )}
        </GroupBuyContainer>

        <Line2 />
        <FixInfo onClick={() => navigate('/profile/sell/modi')}>
          내 정보 수정하기
        </FixInfo>
      </MainContainer>
    </Container>
  )
}
