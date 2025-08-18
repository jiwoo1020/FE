import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

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
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #1f3906;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15.5px;
  box-sizing: border-box;
`

const BackButton = styled(FaArrowLeftLong)`
  width: 25px;
  height: 26px;
  color: #fff;
  cursor: pointer;
`

export default function FreshnessResult() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
    </Container>
  )
}