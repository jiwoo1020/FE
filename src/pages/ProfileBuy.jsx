import React from 'react'
import MainHeader from '../components/nav/Header'
import styled from '@emotion/styled'
import { FaAngleRight } from 'react-icons/fa6'
import Flower from '../assets/peony.svg'
import UserInformationItem from '../components/profile/UserInformationItem'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 17px 17px 0 17px;
  gap: 13px;
  box-sizing: border-box;
`

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  letter-spacing: -0.96px;
  font-weight: 300;
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

export default function ProfileBuy() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(null)

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      setError(null)
      try {
        const rawToken = localStorage.getItem('token')
        if (!rawToken) {
          console.warn("🔑 토큰이 없습니다.")
          return
        }
  
        const token = rawToken.startsWith('Bearer') ? rawToken : `Bearer ${rawToken}`
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        })
  
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
  
        const data = await res.json()
        console.log('✅ 유저 정보 불러오기 성공:', data)
        setUserData(data.data)
      } catch (err) {
        console.error('❌ 유저 정보 불러오기 실패', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  
    fetchUserData()
  }, [])
  
  
  
  
  
  

    const mockGroupBuys = [
    {
      id: 1,
      state: "구매자 입금 중",
      storeName: "멋사네 가게",
      flowerName: "작약",
      quantity: "3송이",
      price: "9000원 + 배달료",
      account: "국민 111111111111",
      img: Flower,
    },
    {
      id: 2,
      state: "입금 완료",
      storeName: "꽃집ABC",
      flowerName: "장미",
      quantity: "5송이",
      price: "15000원 + 배달료",
      account: "신한 222222222222",
      img: Flower,
    },
  ]

  return (
    <Container>
      <MainHeader />
      <MainContainer>
      <Title>반갑습니다, {userData?.username ?? '머쨍이'}님</Title>
      <p
            style={{
              color: '#000',
              WebkitTextStrokeWidth: '0.2px',
              WebkitTextStrokeColor: '#000',
              fontSize: '16px',
              margin: '0',
              marginTop: '0',
            }}
          >
            나의 정보
          </p>
      <UserInformationItem style ={{ marginTop: '-20px'}}
      
      id={userData?.username}
      phone={userData?.phoneNumber}
      />
     <MyGroupBuyList>나의 공동구매 현황</MyGroupBuyList>
     {loading ? (
        <div style={{ fontSize: 14 }}>불러오는 중...</div>
      ) : error ? (
        <div style={{ fontSize: 14, color: 'crimson' }}>불러오기 실패: {error}</div>
      ) : userData?.groupPurchases?.length > 0 ? (
        userData.groupPurchases.map(/* ... */)
      ) : (
        <div style={{ fontSize: 12, color: '#666' }}>참여한 공동구매가 없습니다.</div>
      )}

      <GroupBuyContainer>
      {userData?.orders?.length > 0 &&
  userData.orders.map(item => (
            <GroupBuyItem key={item.id}>
              <GroupBuyHeader>
                <ProductImg src={item.imageUrl || Flower} alt="상품 이미지" />
                <GroupBuyInfo>
                  <State>
                    <Dot />
                    <StateText>{item.state || '진행중'}</StateText>
                  </State>
                  <StoreName>{userData.shop?.name}</StoreName>
                  <FlowerName>
                    {item.productName}
                    <span style={{ color: '#979797', fontSize: '12px', marginLeft: '5px' }}>
                      {item.quantity}송이
                    </span>
                  </FlowerName>
                </GroupBuyInfo>
              </GroupBuyHeader>
              <Line />
              <PriceContainer>
                <SellingPriceTitle>예상 결제 금액</SellingPriceTitle>
                <SellingPrice>{item.price ?? '-'} 원</SellingPrice>
              </PriceContainer>
              <DeliveryContainer>
                <DeliveryTitle>입금 계좌</DeliveryTitle>
                <Delivery>
                  {userData.shop?.depositAccount?.bank} {userData.shop?.depositAccount?.number}
                </Delivery>
              </DeliveryContainer>
            </GroupBuyItem>
        ))}
      </GroupBuyContainer>

      <MyGroupBuyList>나의 구매 내역</MyGroupBuyList>
      {loading ? (
        <div style={{ fontSize: 14 }}>불러오는 중...</div>
      ) : error ? (
        <div style={{ fontSize: 14, color: 'crimson' }}>불러오기 실패: {error}</div>
      ) : userData?.groupPurchases?.length > 0 ? (
        userData.groupPurchases.map(/* ... */)
      ) : (
        <div style={{ fontSize: 12, color: '#666' }}>구매 내역이 없습니다.</div>
      )}


        <GroupBuyContainer>
        {userData?.orders?.length > 0 &&
  userData.orders.map(item => (
              <GroupBuyItem key={item.id}>
                <GroupBuyHeader>
                  <ProductImg src={item.imageUrl || Flower} alt="상품 이미지" />
                  <GroupBuyInfo>
                    <State>
                      <Dot />
                      <StateText>{item.state || '주문완료'}</StateText>
                    </State>
                    <StoreName>{item.shopName || userData.shop?.name}</StoreName>
                    <FlowerName>
                      {item.productName}
                      <span
                        style={{
                          color: '#979797',
                          fontSize: '12px',
                          marginLeft: '5px',
                        }}
                      >
                        {item.quantity}개
                      </span>
                    </FlowerName>
                  </GroupBuyInfo>
                </GroupBuyHeader>
                <Line />
                <PriceContainer>
                  <SellingPriceTitle>결제 금액</SellingPriceTitle>
                  <SellingPrice>
                    {item.price ? `${item.price.toLocaleString()} 원` : '-'}
                  </SellingPrice>
                </PriceContainer>
                <DeliveryContainer>
                  <DeliveryTitle>배송지</DeliveryTitle>
                  <Delivery>{item.address ?? '-'}</Delivery>
                </DeliveryContainer>
              </GroupBuyItem>
      ))}
        </GroupBuyContainer>
        
      
      </MainContainer>
      
    </Container>
  )
}
