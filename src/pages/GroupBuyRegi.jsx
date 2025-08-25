import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import MainHeader from '../components/nav/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import InfoRow from '../components/groupbuy/InfoRow'

export default function GroupBuyRegi() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/group-purchases/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        console.log('상세 응답:', response.data)
        setGroup(response.data?.data ?? response.data)
      } catch (err) {
        console.error('상세 조회 실패:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchGroupDetail()
  }, [id])

  if (loading) {
    return (
      <Container>
        <MainHeader />
        <p style={{ padding: 20 }}>불러오는 중...</p>
      </Container>
    )
  }

  if (!group) {
    return (
      <Container>
        <MainHeader />
        <p style={{ padding: 20 }}>그룹 정보를 찾을 수 없습니다.</p>
      </Container>
    )
  }

  const username = localStorage.getItem('username')
  const isLeader = group.leaderName === username
  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('로그인이 필요합니다.')
        return
      }

      // 방장이면 막기
      if (group.leaderName === username) {
        alert('⚠️ 공동구매 대표는 참여할 수 없습니다.')
        return
      }
      const response = await axios.post(
        `/api/group-purchases/${id}/apply`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ quantity }),
        }
      )

      console.log('참여 성공:', response.data)
      alert('공동구매에 참여했습니다!')
      navigate('/groupbuy', { state: { appliedId: id } })
      setGroup(prev => ({
        ...prev,
        currentParticipants: prev.currentParticipants + 1,
      }))
    } catch (err) {
      console.error('참여 실패:', err.response?.data || err)
      alert('참여에 실패했습니다.')
    }
  }

  return (
    <Container>
      <MainHeader />
      <Card>
        <Row>
          <Label>공동구매 대표</Label>
          <Divider />
          <Value>{group.leaderName}</Value>
        </Row>
      </Card>

      <Image src={group.imageUrl} alt={group.productName} />

      <InfoRow
        farm={group.farmName || '농장명 미정'}
        product={group.productName}
        price={`${group.price.toLocaleString()}원`}
        address={group.address}
        deadline={new Date(group.applyDeadlineAt).toLocaleString('ko-KR', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}
        deliveryDate={new Date(group.desiredDeliveryAt).toLocaleString(
          'ko-KR',
          {
            dateStyle: 'long',
            timeStyle: 'short',
          }
        )}
        status={`${group.currentParticipants}명 (최소 ${group.minParticipants}, 최대 ${group.maxParticipants})`}
      />
      {isLeader ? (
        <DisabledButton disabled>본인은 참여할 수 없습니다</DisabledButton>
      ) : (
        <CreateButton onClick={handleApply}>공동구매 신청하기</CreateButton>
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
const DisabledButton = styled.button`
  background: #ccc;
  color: #666;
  border: 0;
  font-weight: 700;
  height: 40px;
  width: 362px;
  margin: 14px auto 40px auto;
  display: block;
  border-radius: 8px;
  cursor: not-allowed;
`
