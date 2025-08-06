import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './styles/globalstyles'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Auth/Login'))
const Signin = lazy(() => import('./pages/Auth/Signup'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const GroupBuy = lazy(() => import('./pages/GroupBuy'))
const GroupBuyCreate = lazy(() => import('./pages/GroupBuyCreate'))
const Order = lazy(() => import('./pages/Order'))
const Calendar = lazy(() => import('./pages/Calendar'))
const ProductManage = lazy(() => import('./pages/ProductManage'))
const ProductRegisterText = lazy(() => import('./pages/ProductRegisterText'))
const ProductRegisterImage = lazy(() => import('./pages/ProductRegisterImage'))
const FreshnessResult = lazy(() => import('./pages/FreshnessResult'))

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signin" element={<Signin />} />

          {/* ######### 2, 3 #########*/}
          {/* 상품 전체 확인 */}
          <Route path="/product" element={<ProductList />} />
          {/* 상품 상세 */}
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* 주문 */}
          <Route path="/order" element={<Order />} />

          {/* ######### 4 #########*/}
          {/* 공동구매 */}
          <Route path="/groupbuy" element={<GroupBuy />} />
          {/* 공동구마 생성 */}
          <Route path="/groupbuy/create" element={<GroupBuyCreate />} />

          {/* ######### 5 #########*/}
          {/* 캘린더 */}
          <Route path="/calendar" element={<Calendar />} />

          {/* ######### 6 #########*/}
          {/* 상품관리 */}
          <Route path="/product/manage" element={<ProductManage />} />
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
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
