import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './styles/globalstyles'
import Layout from './components/nav/Layout'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Signup = lazy(() => import('./pages/Auth/Signup'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const ProductCart = lazy(() => import('./pages/ProductCart'))
const GroupBuy = lazy(() => import('./pages/GroupBuy'))
const GroupBuyCreate = lazy(() => import('./pages/GroupBuyCreate'))
const GroupBuyRegi = lazy(() => import('./pages/GroupBuyRegi'))
const Order = lazy(() => import('./pages/Order'))
const Calendar = lazy(() => import('./pages/Calendar'))
const ProductManage = lazy(() => import('./pages/ProductManage'))
const ProductRegisterText = lazy(() => import('./pages/ProductRegisterText'))
const ProductRegisterImage = lazy(() => import('./pages/ProductRegisterImage'))
const FreshnessResult = lazy(() => import('./pages/FreshnessResult'))
const ProfileSell = lazy(() => import('./pages/ProfileSell'))
const ProfileSellModi = lazy(() => import('./pages/ProfileSellModi'))
const ProfileBuy = lazy(() => import('./pages/ProfileBuy'))

function App() {
  const userType = 'seller'
  return (
    <Router>
      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route element={<Layout userType={userType} />}>
            {/* ######### 2, 3 #########*/}
            {/* 상품 전체 확인 */}
            <Route path="/product" element={<ProductList />} />
            {/* 상품 상세 */}
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* 주문 */}
            <Route path="/order" element={<Order />} />
            {/* 장바구니 */}
            <Route path="/product/cart" element={<ProductCart />} />

            {/* ######### 4 #########*/}
            {/* 공동구매 */}
            <Route path="/groupbuy" element={<GroupBuy />} />
            {/* 공동구매 생성 */}
            <Route path="/groupbuy/create" element={<GroupBuyCreate />} />
            {/* 공동구매 신청 */}
            <Route path="/groupbuy/:id" element={<GroupBuyRegi />} />

            {/* ######### 5 #########*/}
            {/* 캘린더 */}
            <Route path="/calendar" element={<Calendar />} />

            {/* ######### 6 #########*/}
            {/* 상품관리 */}
            <Route path="/product/manage" element={<ProductManage />} />
            {/* 프로필-판매자 */}
            <Route path="/profile/sell" element={<ProfileSell />} />
            {/* 프로필-판매자-수정 */}
            <Route path="/profile/sell/modi" element={<ProfileSellModi />} />
            {/* 프로필-구매자 */}
            <Route path="/profile/buy" element={<ProfileBuy />} />
            {/* 상품등록-텍스트 */}
            <Route
              path="/product/register/text"
              element={<ProductRegisterText />}
            />
            {/* 상품등록-품질관리(신선도관리)를 위한 이미지 촬영 */}
            <Route
              path="/product/register/image"
              element={<ProductRegisterImage />}
            />
            {/* 신선도 결과 */}
            <Route path="/freshness" element={<FreshnessResult />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
