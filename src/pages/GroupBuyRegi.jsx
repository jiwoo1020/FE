import React from 'react'
import styled from '@emotion/styled'
import MainHeader from '../components/nav/Header'
import { useNavigate } from 'react-router-dom'
import PeonyImg from '../assets/peony.svg'
import InfoRow from '../components/groupbuy/InfoRow'

export default function GroupBuyRegi() {
  return (
    <Container>
      <MainHeader />
      <Card>
        <Row>
          <Label>공동구매 대표</Label>
          <Divider />
          <Value>아무개</Value>
        </Row>
      </Card>
      <Image src={PeonyImg} alt="작약" />
      <InfoRow
        farm="멋사네 가게"
        product="작약"
        price="3000원 (한 송이)"
        address="경기도 용인시 처인구 모현읍 외대로 81"
        deadline="2025년 8월 14일 오전 11시"
        deliveryDate="2025년 8월 16일 오전 10시"
        status="3명"
      />
      <CreateButton>공동구매 신청하기</CreateButton>
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
  min-height: 100vh;
  height: auto;
  overflow-y: auto;
  padding-bottom: 90px;
`

const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`
const Label = styled.div`
  font-size: 15px;
  color: #808080;
  font-weight: 500;
`

const Value = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #808080;
`

const Image = styled.img`
  width: 393px;
  height: 304px;
  padding-top: 10px;
  object-fit: cover;
`
const CreateButton = styled.button`
  background: #1f3906;
  color: #fff;
  border: 0;
  font-weight: 700;
  height: 40px;
  width: 362px;
  margin: 14px;
  margin-bottom: 40px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #163004;
  }
`
