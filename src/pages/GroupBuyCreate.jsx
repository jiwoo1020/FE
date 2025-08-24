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
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function GroupBuyCreate() {
  // 입력값 state
  const [leaderQty, setLeaderQty] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [address, setAddress] = useState('')
  const [applyDeadlineAt, setApplyDeadlineAt] = useState('')
  const [desiredDeliveryAt, setDesiredDeliveryAt] = useState('')
  const [minParticipants, setMinParticipants] = useState(3)
  const [maxParticipants, setMaxParticipants] = useState(10)
  const leaderName = localStorage.getItem('username')

  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product

  const dummyProduct = {
    productId: 17,
    name: '작약',
    store: '멋사네 가게',
    image: PeonyImg, // import 해둔 이미지 사용
  }
  const [selected, setSelected] = useState(product ?? dummyProduct)
  const goToProductList = () => {
    navigate('/product') // 실제 ProductList 라우트 경로로 수정
  }

  function formatDateTimeLocal(dateStr) {
    if (!dateStr) return null
    const d = new Date(dateStr)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  }
  // 공동구매 생성
  const handleCreate = async () => {
    if (!selected) {
      alert('상품을 먼저 선택해주세요!')
      return
    }

    if (applyDeadlineAt && desiredDeliveryAt) {
      const deadline = new Date(applyDeadlineAt)
      const delivery = new Date(desiredDeliveryAt)

      if (deadline >= delivery) {
        alert(
          '⚠️ 공동구매 마감일은 희망 배송일보다 반드시 앞선 날짜여야 합니다.'
        )
        return
      }
    }

    const payload = {
      productId: selected?.productId ?? null,
      leaderQuantity: Number(leaderQty) || 1,
      minParticipants: Number(minParticipants) || 3,
      maxParticipants: Number(maxParticipants) || 10,
      applyDeadlineAt: formatDateTimeLocal(applyDeadlineAt),
      desiredDeliveryAt: formatDateTimeLocal(desiredDeliveryAt),
      recipientName,
      recipientPhone,
      address,
    }

    console.log('보내는 payload:', payload)

    try {
      const token = localStorage.getItem('token')

      const response = await axios.post('/api/group-purchases', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('✅ 공동구매 생성 성공:', response.data)
      alert(
        `공동구매 방이 생성되었습니다! (ID: ${response.data.data.group_id})`
      )
    } catch (err) {
      if (err.response) {
        console.error('❌ 공동구매 생성 실패:', err.response.data)
      }
      alert('공동구매 방 생성에 실패했습니다.')
    }
  }

  return (
    <Container>
      <MainHeader />

      {/* 공동구매 대표 */}
      <Card>
        <Row>
          <Label>공동구매 대표</Label>
          <Divider />
          <Value>{leaderName}</Value>
        </Row>
      </Card>

      {/* 공동구매 항목 */}
      <Card>
        <SectionTitle>공동구매 항목</SectionTitle>
        {!selected ? (
          <Row>
            <Image src={Logo} alt="기본 로고" />
            <SelectBox onClick={goToProductList}>항목 선택하기</SelectBox>
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
                  <SmallValue>{selected.store}</SmallValue>
                </InfoRow>
              </InfoBox>
            </InfoCol>
          </Row>
        )}
      </Card>

      {/* 입력 카드들 */}
      <AddressCard
        recipientName={recipientName}
        onChangeName={setRecipientName}
        recipientPhone={recipientPhone}
        onChangePhone={setRecipientPhone}
        address={address}
        onChangeAddress={setAddress}
      />
      <DeliveryDateCard
        value={desiredDeliveryAt}
        onChange={setDesiredDeliveryAt}
      />
      <DeadlineCard value={applyDeadlineAt} onChange={setApplyDeadlineAt} />
      <MemberCountCard
        minValue={minParticipants}
        maxValue={maxParticipants}
        onChangeMin={setMinParticipants}
        onChangeMax={setMaxParticipants}
      />

      <CreateButton onClick={handleCreate}>공동구매 방 생성</CreateButton>
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
