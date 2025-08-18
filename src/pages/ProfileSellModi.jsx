import React from 'react'
import MainHeader from '../components/nav/Header'
import styled from '@emotion/styled'
import UserInformationItem from '../components/profile/UserInformationItem'
import StoreInfoContainer from '../components/profile/StoreInfoCard'

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

const MainContainer = styled.div`
  padding: 17px;

`
const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  letter-spacing: -0.96px;
`

const RegisterButton = styled.div`
  display: flex;
  width: 148px;
  height: 31px;
  box-sizing: border-box;
  padding: 7px 44px 5px 43px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #1F3906;
  color: #fff;
  margin: 0 auto;
  margin-top: 16px;
`

export default function ProfileSellModi() {
  return (
    <Container>
      <MainHeader />
      <MainContainer>
        <Title>반갑습니다, 머쨍이님</Title>
        <p
            style={{
              color: '#000',
              WebkitTextStrokeWidth: '0.2px',
              WebkitTextStrokeColor: '#000',
              fontSize: '16px',
              margin: '0',
              marginTop: '30px',
            }}
          >
            나의 정보
          </p>
         <UserInformationItem />
         <p
            style={{
              color: '#000',
              WebkitTextStrokeWidth: '0.2px',
              WebkitTextStrokeColor: '#000',
              fontSize: '16px',
              margin: '0',
              marginTop: '30px',
            }}
          >
          나의 가게 정보
          </p>
         <StoreInfoContainer />
         <RegisterButton>등록</RegisterButton>
      </MainContainer>
    </Container>
  )
}
