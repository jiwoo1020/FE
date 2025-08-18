import React from 'react'
import styled from '@emotion/styled'
import loadingImageSrc from "../../assets/loading.png"

const Container = styled.div`
  height: 374px;
  width: 311px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  padding-top: 24px;
`

const LoadingImg = styled.img`
  margin-top: 44px;
  width: 105px;
  height: 144px;
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

export default function FreshnessLoadingModal() {
  return (
    <div style={modalOverlayStyle}>
      <Container>
        <p style={{ fontSize: '12px', color: '#808080', margin: 0 }}>step.3</p>
        <p style={{ fontSize: '24px', letterSpacing: '-0.96px', margin: 0, paddingTop: '14px', fontWeight:"300"}}>신선도 판별 중</p>
        <LoadingImg src={loadingImageSrc} alt="로딩중 이미지" />
      </Container>
    </div>
  )
}
