import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
import MainHeader from '../components/nav/Header'
import FreshnessLoadingModal from '../components/modal/FreshnessLoadingModal'
import FreshnessResultModal from '../components/modal/FreshnessResultModal'

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

const CameraContainer = styled.div`
  width: 280px;
  height: 280px;
  background-color: aliceblue;
  margin: auto 40px;
  margin-top: 19px;
`

const CameraButton = styled.div`
  margin-top: 11px;
  margin: 0 auto;
  width: 39px;
  height: 39px;
  border-radius: 50px;
  border: 4px solid #1f3906;
  margin-bottom: 100px;
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

export default function ProductRegisterImage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleNextClick = async () => {
    setIsLoading(true)
  
    // 가짜 로딩 시뮬레이션
    await new Promise(res => setTimeout(res, 3000)) // 실제 API로 대체
  
    setIsLoading(false)
    setShowResultModal(true)
  }

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
          step.2
        </p>
        <p
          style={{
            fontSize: '24px',
            letterSpacing: '-0.96px',
            margin: '0',
          }}
        >
          상품의 사진을 촬영해주세요
        </p>
        <p
          style={{
            fontSize: '16px',
            color: '#808080',
            margin: 0,
          }}
        >
          촬영한 사진을 통해 신선도를 판별해드릴게요!
        </p>
        <CameraContainer />
        <CameraButton />
        <NextButton onClick={handleNextClick}>
          다음 단계
        </NextButton>
      </MainContainer>

       {/* 모달들 조건부 렌더링 */}
       {isLoading && <FreshnessLoadingModal />}
      {showResultModal && (
        <FreshnessResultModal
          grade="매우 신선"
          onNext={() => navigate('/freshness')}
        />
      )}
    </Container>
  )
}
