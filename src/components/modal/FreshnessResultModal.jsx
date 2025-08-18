import React from 'react'
import styled from '@emotion/styled'
import { IoIosCheckmarkCircle } from "react-icons/io";
import Freshness from '../../assets/freshness.svg'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  position: relative;
  height: 374px;
  width: 311px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  gap: 15px;
`


const CheckIcon = styled(IoIosCheckmarkCircle)`
  width: 50px;
  height: 50px;
  color: #1F3906;
`

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
}

const FreshnessImg = styled.img`
  
`

const ResultBox = styled.div`
  width: 75px;
  gap: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ResultDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50px;
  background-color: #1DFA00;
`

const ResultText = styled.div`
  color: #1DFA00;
  font-size: 15px;
`
const Close = styled.div`
  font-size: 12px;
  width: 89px;
  border-bottom: 0.8px solid #808080;
  color: #808080;
  position: absolute;
  bottom: 10px;   
  cursor: pointer;
`

export default function FreshnessResultModal() {

  const navigate = useNavigate();

  return (
    <div style={modalOverlayStyle}>
      <Container>
        <CheckIcon />
        <p style={{ fontSize: '24px', letterSpacing: '-0.96px', margin: 0, fontWeight:"300"}}>신선도 판별 성공</p>
        <ResultBox>
          <ResultDot />
          <ResultText>매우 신선</ResultText>
        </ResultBox>
        <FreshnessImg src = {Freshness} alt = "신선도 이미지"/>

        <Close onClick={() => navigate('/profile/sell')}>
          상품 등록 완료하기
        </Close>
        
      </Container>
    </div>
  )
}
