import styled from '@emotion/styled'
import { useState } from 'react'

import HeaderBar from '../components/home/Header'
import MainBanner from '../components/home/MainBanner'
import Categories from '../components/home/Categories'
import Shares from '../components/home/Shares'
import TodayAnnouncement from '../components/home/TodayAnnouncement'
import BottomNav from '../components/nav/BottomNav'

import bannerImage from '../assets/banner_back.svg'

export default function Home() {
  return (
    <Container>
      <HeaderBar
        onSearchChange={e => console.log('search:', e.target.value)}
        onSettingsClick={() => console.log('settings')}
        onLoginClick={() => console.log('login')}
      />
      <MainBanner bgUrl={bannerImage} onClick={() => console.log('shop now')} />
      <Categories />
      <Shares />
      <TodayAnnouncement />
      <BottomNav />
    </Container>
  )
}

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
