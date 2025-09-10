import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import GroupList from '../components/groupbuy/List'
import MainHeader from '../components/nav/Header'
import PeonyImg from '../assets/peony.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function GroupBuy() {
  const navigate = useNavigate()
  const location = useLocation()
  const [groupList, setGroupList] = useState([])

 useEffect(() => {
  const fetchGroupBuys = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/group-purchases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('📦 전체 응답:', response)
      console.log('✅ response.data:', response.data)

      let list = response.data?.content ?? []

      // ✅ 이미지 필드 통일 (API가 imageUrl만 준다면 여기서 매핑)
      list = list.map(item => ({
        ...item,
        imageUrl: item.imageUrl || item.image_url || item.mainImageUrl || PeonyImg,
      }))

      const appliedList = JSON.parse(localStorage.getItem('appliedList') || '[]')


      list = list.map(item => ({
        ...item,
        imageUrl: item.imageUrl
          ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${item.imageUrl}`
          : PeonyImg,
      }))

      setGroupList(list)
    } catch (error) {
      console.error('❌ 조회 중 오류:', error)
      alert('조회 중 오류가 발생했습니다.')
    }
  }

  fetchGroupBuys()
}, [location.state?.appliedId])


  // const handleApply = id => {
  //   setGroupList(prev =>
  //     prev.map(item => (item.id === id ? { ...item, joined: true } : item))
  //   )
  // }
  return (
    <Container>
      <MainHeader />
      <Row>
        <Title>공동구매 리스트</Title>
        <GroupBuyButton onClick={() => navigate('/groupbuy/create')}>
          + 공동구매
        </GroupBuyButton>
      </Row>

      {groupList.length === 0 ? (
        <EmptyText>현재 진행 중인 공동구매가 없습니다.</EmptyText>
      ) : (
        groupList.map((item, idx) => (
          <GroupList
            key={item.id ?? idx}
            imageSrc={item.imageUrl || PeonyImg}
            leader={item.leaderMaskedName}
            address={item.address}
            currentCount={item.currentParticipants}
            maxCount={item.maxParticipants}
            shopName={item.farmName}
            price={item.priceText}
            deliveryDate={item.deliveryAtText}
            applied={item.joined}
            onApply={() => navigate(`/groupbuy/${item.id}`)}
          />
        ))
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px; /* 모바일 최대 폭 */
  margin: 0 auto;
  background: #ffffff;
  overflow-y: auto;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  box-sizing: border-box;
`

const GroupBuyButton = styled.button`
  position: absolute;
  right: 10px;
  margin: 15px auto 0 auto;
  width: 137px;
  height: 37px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background-color: #1f3906;
`

const Title = styled.h1`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.96px;
  margin-left: 17px;
`

const EmptyText = styled.div`
  margin: 20px;
  text-align: center;
  color: #777;
  font-size: 14px;
`
