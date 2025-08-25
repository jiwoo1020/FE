import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

import HeaderBar from '../components/home/Header'
import MainBanner from '../components/home/MainBanner'
import Categories from '../components/home/Categories'
import Shares from '../components/home/Shares'
import TodayAnnouncement from '../components/home/TodayAnnouncement'
import BottomNav from '../components/nav/BottomNav'

import bannerImage from '../assets/banner_back.svg'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function Home() {
  const [products, setProducts] = useState([])
  const [shares, setShares] = useState([])
  const [todayEvents, setTodayEvents] = useState([])

  // 오늘 날짜 key
  const todayKey = format(new Date(), 'yyyy-MM-dd', { locale: ko })
  const monthKey = format(new Date(), 'yyyy-MM')

  // ✅ 상품 불러오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        })
        if (!res.ok) return
        const resData = await res.json()
        setProducts(resData.data?.items || [])
      } catch (err) {
        console.error('상품 불러오기 실패:', err)
      }
    }
    fetchProducts()
  }, [])

  // ✅ 공동구매 불러오기
  useEffect(() => {
    const fetchShares = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/group-purchases`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        )
        if (!res.ok) return
        const data = await res.json()
        setShares(data.content || [])
      } catch (err) {
        console.error('공동구매 불러오기 실패:', err)
      }
    }
    fetchShares()
  }, [])

  // ✅ 이번달 행사 불러오기 (오늘 일정 체크)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/month?month=${monthKey}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        )
        if (!res.ok) return
        const data = await res.json()

        const flat = (data?.days ?? []).flatMap(day => {
          const date = day?.date?.slice(0, 10)
          return (day?.items ?? []).map(it => ({
            ...it,
            date,
          }))
        })

        // 오늘 일정만 추려내기
        const today = flat.filter(e => e.date === todayKey)
        setTodayEvents(today)
      } catch (err) {
        console.error('오늘 일정 불러오기 실패:', err)
      }
    }
    fetchEvents()
  }, [monthKey, todayKey])

  return (
    <Container>
      <HeaderBar
        onSearchChange={e => console.log('search:', e.target.value)}
        onSettingsClick={() => console.log('settings')}
        onLoginClick={() => console.log('login')}
      />
      <MainBanner bgUrl={bannerImage} onClick={() => console.log('shop now')} />

      <Categories items={products.slice(0, 4)} />
      <Shares cards={shares.slice(0, 3)} />

      {/* ✅ 오늘 일정 */}
      <TodayAnnouncement events={todayEvents} />

      <BottomNav />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background: #ffffff;
  height: auto;
  overflow-y: auto;
  padding-bottom: 90px;
`
