import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function Layout({ userType }) {
  return (
    <div style={{ paddingBottom: '60px' }}>
      {' '}
      {/* Nav 높이만큼 padding */}
      <Outlet /> {/* 여기에 각 페이지의 내용이 렌더링됨 */}
      <BottomNav userType={userType} />
    </div>
  )
}
