import React from 'react'
import styled from '@emotion/styled'

export default function InfoCard({
  farm,
  product,
  price,
  address,
  deadline,
  deliveryDate,
  status,
}) {
  return (
    <Card>
      <Row>
        <Label>구매 농장</Label>
        <Divider />
        <Value>{farm}</Value>
      </Row>

      <Row>
        <Label>상품명</Label>
        <Divider />
        <Value>{product}</Value>
      </Row>

      <Row>
        <Label>가격</Label>
        <Divider />
        <Value>{price}</Value>
      </Row>

      <Row>
        <Label>배송지</Label>
        <Divider />
        <Value>{address}</Value>
      </Row>

      <Row>
        <Label>신청 마감 기간</Label>
        <Divider />
        <Value>{deadline}</Value>
      </Row>

      <Row>
        <Label>희망 배송일</Label>
        <Divider />
        <Value>{deliveryDate}</Value>
      </Row>

      <Row>
        <Label>모집 현황</Label>
        <Divider />
        <Value>{status}</Value>
      </Row>
    </Card>
  )
}

const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 23px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
`

const Label = styled.div`
  font-size: 14px;
  color: #808080;
  font-weight: 500;
  min-width: 110px;
`

const Divider = styled.div`
  width: 1px;
  height: 14px;
  background: #ccc;
  margin: 0 8px;
`

const Value = styled.div`
  font-size: 14px;
  color: #000;
  font-weight: 600;
`
