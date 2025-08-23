import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
import MainHeader from '../components/nav/Header'

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

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding-left: 17px;
  box-sizing: border-box;
`

const RegisterTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  height: auto;
  border-radius: 24px;
  background: rgba(31, 57, 6, 0.2);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 24px 0 0 20px;
  gap: 25px;
  margin-bottom: 250px;
`
const Species = styled.div`
  gap: 19px;
  display: flex;
  flex-direction: row;
`

const SpeciesInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  width: 260px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  &:focus {
    border-bottom: 1px solid #1f3906; /* 원하는 포커스 색상 */
  }
`

const Price = styled.div`
  gap: 19px;
  display: flex;
  flex-direction: row;
`

const PriceInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  width: 260px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`

const Stock = styled.div`
  gap: 19px;
  display: flex;
  flex-direction: row;
`

const StockInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  width: 260px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`

const Feature = styled.div`
  gap: 19px;
  display: flex;
  flex-direction: row;
  margin-bottom: -25px;
`

const FeatureInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  width: 260px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`

const NextButton = styled.div`
  display: flex;
  width: 352px;
  height: 50px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #1f3906;
  color: white;
  cursor: pointer;
`

export default function ProductRegisterText() {
  const navigate = useNavigate()

  return (
    <Container>
      <MainHeader />
      <MainContainer>
        <p
          style={{
            fontSize: '12px',
            color: '#808080',
            margin: '0',
            paddingTop: '14px',
          }}
        >
          step.1
        </p>
        <p
          style={{
            fontSize: '24px',
            letterSpacing: '-0.96px',
            margin: '0',
          }}
        >
          어떤 식물을 등록할까요?
        </p>
        <p
          style={{
            fontSize: '16px',
            color: '#808080',
            margin: 0,
          }}
        >
          등록하고 싶은 상품의 품종과 가격, 재고를 입력해주세요
        </p>

        <RegisterTextBox>
          <Species>
            <p
              style={{
                margin: '0',
                fontSize: '16px',
              }}
            >
              품종
            </p>
            <SpeciesInput placeholder="ex) 장미" maxLength={200} />
          </Species>

          <Price>
            <p
              style={{
                margin: '0',
                fontSize: '16px',
              }}
            >
              가격
            </p>
            <PriceInput placeholder="한 송이의 가격을 알려주세요" />
          </Price>

          <Stock>
            <p
              style={{
                margin: '0',
                fontSize: '16px',
              }}
            >
              재고
            </p>
            <StockInput placeholder="판매 가능한 수량을 알려주세요" />
          </Stock>

          <Feature>
            <p
              style={{
                margin: '0',
                fontSize: '16px',
              }}
            >
              특징
            </p>
            <FeatureInput
              placeholder="ex) 색이 예뻐 연인에게 선물하기 좋아요"
              maxLength={200}
            />
          </Feature>
          <p
            style={{
              marginLeft: 'auto;',
              fontSize: '12px',
              color: '#808080',
              marginTop: '5px',
              marginRight: '40px',
            }}
          >
            (200자)
          </p>
        </RegisterTextBox>
        <NextButton onClick={() => navigate('/product/register/image')}>
          다음 단계
        </NextButton>
      </MainContainer>
    </Container>
  )
}
