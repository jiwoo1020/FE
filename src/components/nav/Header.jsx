import React, { useState } from 'react'
import styled from '@emotion/styled'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function GroupBuy() {
  const navigate = useNavigate()
  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)} />
      </Header>
    </>
  )
}

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #1f3906;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 5%;
  box-sizing: border-box;
`

const BackButton = styled(FaArrowLeftLong)`
  width: 25px;
  height: 26px;
  color: #fff;
  cursor: pointer;
`
