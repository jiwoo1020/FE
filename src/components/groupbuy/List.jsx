/** @jsxImportSource @emotion/react */
import React from 'react'
import styled from '@emotion/styled'

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-bottom: 25px;
  margin-left: 7px;
  gap: 10px;
  width: 362px;
  height: 136px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
`

const Image = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 24px;
  flex-shrink: 0;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  color: #333;
  flex-grow: 1;
`

const ApplyButton = styled.button`
  margin-top: 10px;
  background-color: ${({ active }) => (active ? '#007bff' : '#2f3e1e')};
  color: white;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  width: 77px;
  height: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  white-space: nowrap; /* 줄바꿈 방지 */
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function FlowerCard({
  imageSrc,
  representative,
  address,
  currentCount,
  maxCount,
  storeName,
  deliveryDate,
  onApply,
}) {
  return (
    <Card>
      <Image src={imageSrc} alt="꽃" />
      <Info>
        <div>대표: {representative}</div>
        <div>배송지: {address}</div>
        <div>
          모집 인원수: {currentCount} / {maxCount}
        </div>
        <div>구매 농장: {storeName}</div>
        <div>배송일: {deliveryDate}</div>
        <ApplyButton onClick={onApply}>신청하기</ApplyButton>
      </Info>
    </Card>
  )
}
