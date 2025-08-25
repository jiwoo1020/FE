import React from 'react'
import MainHeader from '../components/nav/Header'
import styled from '@emotion/styled'
import UserInformationItem from '../components/profile/UserInformationItem'
import StoreInfoContainer from '../components/profile/StoreInfoCard'
import { useEffect, useState } from 'react'

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

  const [userData, setUserData] = useState(null)
  const storeName = userData?.shop?.name ?? '';
  const businessNumber = userData?.shop?.businessNumber ?? '';
  const depositAccount = userData?.shop?.depositAccount;
  const accountNumber = depositAccount
    ? `${depositAccount.bank} ${depositAccount.number}`
    : '';


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const rawToken = localStorage.getItem('token');
        if (!rawToken) {
          console.warn("🔑 토큰이 없습니다.");
          return;
        }
  
        const token = rawToken.startsWith('Bearer') ? rawToken : `Bearer ${rawToken}`;
        console.log("📦 최종 Authorization 헤더:", token);
        console.log("🌐 API URL:", import.meta.env.VITE_API_URL);
  
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          // credentials: 'omit', // 대부분 불필요하므로 지움
        });
  
        if (!res.ok) {
          console.error("❌ 응답 실패:", res.status, res.statusText);
          throw new Error('응답 실패');
        }
  
        const data = await res.json();
        console.log('✅ 유저 정보 불러오기 성공:', data);
        setUserData(data.data);
      } catch (err) {
        console.error('❌ 유저 정보 불러오기 실패', err);
      }
    };
  
    fetchUserData();
  }, []);


  return (
    <Container>
      <MainHeader />
      <MainContainer>
        <Title>반갑습니다, {userData?.username ?? '머쨍이'}님</Title>
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
         <UserInformationItem 
         id={userData?.username}
         phone={userData?.phoneNumber}/>
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
         <StoreInfoContainer 
            storeName={storeName}
            storeNumber={businessNumber}
            accountNumber={accountNumber} />
        {/*<RegisterButton>등록</RegisterButton>*/}
      </MainContainer>
    </Container>
  )
}
