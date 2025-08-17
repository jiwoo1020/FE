import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { IoSearchOutline } from 'react-icons/io5'
import GroupList from '../components/groupbuy/List'
import MainHeader from '../components/nav/Header'
import PeonyImg from '../assets/peony.svg'
import { useNavigate } from 'react-router-dom'

export default function GroupBuy() {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <MainHeader />
        <Row>
          <Title>공동구매 리스트</Title>
          <GroupBuyButton onClick={() => navigate('/groupbuy/create')}>
            + 공동구매
          </GroupBuyButton>
        </Row>

        <GroupList
          imageSrc={PeonyImg}
          representative="홍*동"
          address="경기도 용인시 처인구 모현읍 외대로 81"
          currentCount={3}
          maxCount={6}
          storeName="멋사네 가게"
          deliveryDate="2025년 8월 16일 오전 10시"
          onApply={() => alert('신청이 완료되었습니다.')}
        />

        <GroupList
          imageSrc={PeonyImg}
          representative="홍*동"
          address="경기도 용인시 처인구 모현읍 외대로 81"
          currentCount={3}
          maxCount={6}
          storeName="멋사네 가게"
          deliveryDate="2025년 8월 16일 오전 10시"
          onApply={() => alert('신청이 완료되었습니다.')}
        />

        <GroupList
          imageSrc={PeonyImg}
          representative="홍*동"
          address="경기도 용인시 처인구 모현읍 외대로 81"
          currentCount={3}
          maxCount={6}
          storeName="멋사네 가게"
          deliveryDate="2025년 8월 16일 오전 10시"
          onApply={() => alert('신청이 완료되었습니다.')}
        />

        <GroupList
          imageSrc={PeonyImg}
          representative="홍*동"
          address="경기도 용인시 처인구 모현읍 외대로 81"
          currentCount={3}
          maxCount={6}
          storeName="멋사네 가게"
          deliveryDate="2025년 8월 16일 오전 10시"
          onApply={() => alert('신청이 완료되었습니다.')}
        />
      </Container>
    </>
  )
}

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 137px;
  height: 37px;
  left: 238px;
  margin: 15px auto 0 auto;
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
