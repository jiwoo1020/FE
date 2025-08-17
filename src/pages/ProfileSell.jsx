import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
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
  padding: 1px 1px 1px 2px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  border-radius: 24px;
  background: #5adc5d;
`
const ToggleButton = styled.div`
  width: 13px;
  height: 14px;
  border-radius: 24px;
  background: #fff;
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
  align-items: center;
  gap: 10px;
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
const MoveIcon = styled(FaAngleRight)`
  width: 7px;
  height: 12px;
  margin-left: 5px;
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
`

export default function ProfileSell() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    // 이름만 있는 목데이터
    const mockNames = ['장미 ', '해바라기', '튤립', '백합', '수국', '라일락']
    setProducts(mockNames)
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
          <Toggle>
            <span
              style={{
                color: '#FFFEFE',
                fontFamily: 'Pretendard',
                fontSize: '8px',
              }}
            >
              판매 중
            </span>
            <ToggleButton />
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
            새 상품 등록 +
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

        <GroupBuyContainer>
          <GroupBuyItem>
            <GroupBuyHeader>
              <ProductImg src={Flower} alt="꽃 이미지" />
              <GroupBuyInfo>
                <State>
                  <Dot />
                  <StateText>구매자 입금 중</StateText>
                </State>
                <StoreName>멋사네 가게</StoreName>
                <FlowerName>
                  작약
                  <span
                    style={{
                      color: '#979797',
                      fontSize: '12px',
                      marginLeft: '5px',
                    }}
                  >
                    총 17송이
                  </span>
                </FlowerName>
              </GroupBuyInfo>
              <span
                style={{
                  fontSize: '12px',
                  marginLeft: '120px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => navigate('/groupbuy/regi')}
              >
                상세정보 &gt;
              </span>
              <MoveIcon />
            </GroupBuyHeader>
            <Line />
            <PriceContainer>
              <SellingPriceTitle>판매 금액</SellingPriceTitle>
              <SellingPrice>54000 원</SellingPrice>
            </PriceContainer>
            <DeliveryContainer>
              <DeliveryTitle>배송지</DeliveryTitle>
              <Delivery>경기도 용인시 처인구 모현읍 외대로 81</Delivery>
            </DeliveryContainer>
          </GroupBuyItem>
        </GroupBuyContainer>
        <Line2 />
        <FixInfo>내 정보 수정하기</FixInfo>
      </MainContainer>
    </Container>
  )
}
