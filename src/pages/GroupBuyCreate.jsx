/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import MainHeader from '../components/nav/Header'
import PeonyImg from '../assets/peony.svg'
import Logo from '../assets/logo.svg'
import AddressCard from '../components/groupbuy/AddressCard'
import DeliveryDateCard from '../components/groupbuy/DeliveryDateCard'
import DeadlineCard from '../components/groupbuy/DeadlineCard'
import MemberCountCard from '../components/groupbuy/MemberCountCard'

export default function GroupBuyCreate() {
  const [selected, setSelected] = useState(null)

  const handleSelect = () => {
    setSelected({
      image: PeonyImg,
      name: '작약 (Peony)',
      farm: '멋사네 가게',
    })
  }

  return (
    <Container>
      <MainHeader />

      {/* 공동구매 대표 */}
      <Card>
        <Row>
          <Label>공동구매 대표</Label>
          <Divider />
          <Value>아무개</Value>
        </Row>
      </Card>
      <Card>
        <SectionTitle>공동구매 항목</SectionTitle>
        {!selected ? (
          <Row>
            <Image src={Logo} alt="기본 로고" />
            <SelectBox onClick={handleSelect}>항목 선택하기</SelectBox>
          </Row>
        ) : (
          <Row>
            <Image src={selected.image} alt="상품 이미지" />
            <InfoCol>
              <InfoBox>
                <InfoRow>
                  <SmallLabel>상품명</SmallLabel>
                  <Divider />
                  <SmallValue>{selected.name}</SmallValue>
                </InfoRow>
              </InfoBox>
              <InfoBox>
                <InfoRow>
                  <SmallLabel>구매 농장</SmallLabel>
                  <Divider />
                  <SmallValue>{selected.farm}</SmallValue>
                </InfoRow>
              </InfoBox>
            </InfoCol>
          </Row>
        )}
      </Card>
      <AddressCard />
      <DeliveryDateCard />
      <DeadlineCard />
      <MemberCountCard />
      <CreateButton>공동구매 방 생성</CreateButton>
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

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #000;
`

const SelectBox = styled.div`
  flex: 1;
  border-radius: 12px;
  background: #f8f8f8;
  padding: 12px;
  text-align: center;
  color: #777;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
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
  width: 87px;
  border-radius: 24px;
  object-fit: cover;
`

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`

const InfoBox = styled.div`
  background: #f8f8f8;
  border-radius: 10px;
  padding: 8px 12px;
  width: 200px;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  align-items: center;
`

const SmallLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #777;
`

const SmallValue = styled.div`
  font-size: 12px;
  color: #000;
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
