import styled from '@emotion/styled'
import BottomNav from '../components/nav/BottomNav'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import FlowerImg from '../assets/peony.svg'
import LionImg from '../assets/38e6f83760d768b7920b217f1742ff63eb959e07.png'
import Right from '../assets/화살표_오른쪽.svg'
import { useEffect, useState } from 'react'
import BuySheet from '../components/ProductDetail/BuySheet'
import Header from '../components/nav/Header'
import { useNavigate, useParams } from 'react-router-dom'
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
const StoreContainer = styled.div`
  width: 393px;
  height: 40px;
  flex-shrink: 0;
  background: #f0f0f0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`
const StoreBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 20px;
`
const Shopname = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const ContentContainer = styled.div`
  display: flex;
  width: 343px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
`
const ContentTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 0.5px solid #acacac;
  width: 323px;
  height: 125px;
`
const BoxTitle = styled.div`
  display: flex;
  justify-content: center;
  color: #111;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const BoxDetail = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: pre-line;
`
const AIContainer = styled.div`
  display: flex;
  width: 291px;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`
const AITextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`
const AIText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const AITextLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
`
const Rectengle = styled.div`
  width: 1px;
  height: 15px;
  background: #111;
`
const FreshText = styled.div`
  color: #1dfa00;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const MaybeFresh = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100px;
  background: #1dfa00;
`
const BuyContainer = styled.div`
  width: 393px;
  height: 112.603px;
  flex-shrink: 0;
  border-radius: 30px 30px 0 0;
  background: #f8f8f8;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06) inset;
  flex-direction: cloumn;
`
const BuyTextLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  padding-top: 21px;
  margin-left: 21px;
  flex-direction: row;
`
const Money = styled.div`
  color: #1f3906;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const BuyText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const ButtonLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 10px;
  gap: 10px;
  padding: 0px 18px 9px 18px;
`
const ShopListButton = styled.div`
  display: flex;
  width: 176px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #1f3906;
  background: #fff;
`
const ShopText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const BuyButton = styled.div`
  display: flex;
  width: 176px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #1f3906;
`
const PayText = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const ComplainBox = styled.div`
  display: flex;
  width: 301px;
  padding: 5px 10px;
  align-items: flex-start;
  gap: 5px;
  border-radius: 5px;
  background: rgba(235, 235, 235, 0.78);
`
const ComplainLine = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  align-self: stretch;
  flex-direction: row;
`
const ComplainText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 7px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const ShowBox = styled.div`
  width: 292px;
  height: 37px;
  align-items: center;
  margin-top: 5px;
`
const StepLine = styled.div`
  display: flex;
  align-items: center;
  gap: 105px;
  align-self: stretch;
  flex-direction: row;
`
const Green = styled.div`
  color: #05920a;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const Yellow = styled.div`
  color: #ded001;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const Red = styled.div`
  color: #cc0202;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const RectengleLine = styled.div`
  display: flex;
  align-items: center;
  gap: 125px;
  margin-left: 15px;
  margin-right: 15px;
`
const GR = styled.div`
  width: 1px;
  height: 18px;
  background: #05920a;
`
const YR = styled.div`
  width: 1px;
  height: 18px;
  background: #ded001;
`
const RR = styled.div`
  width: 1px;
  height: 18px;
  background: #c30707;
`
const Gbox = styled.div`
  width: 292px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 300px;
  background: linear-gradient(90deg, #00ff48 0%, #f1ff00 50%, #ff0a0e 100%);
  margin-top: -10px;
`

export default function ProductDetail() {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  // ✅ 장바구니 담기
  const handleClickShop = async () => {
    if (!product) {
      alert('상품 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || '장바구니 담기 실패')
      }
      console.log('장바구니 추가 성공:', data)
      navigate('/product/cart', {
        state: {
          addedItem: {
            id: data.data.cart_item.cart_item_id,
            title: product.name,
            price: data.data.cart_item.unit_price,
            qty: data.data.cart_item.quantity,
            img: product.image_url,
            seller: product.shop_name,
            spec: product.info,
          },
        },
      })
    } catch (err) {
      console.error('장바구니 추가 실패:', err)
      alert('장바구니 담기에 실패했습니다.')
    }
  }

  // ✅ 상품 상세 불러오기
  useEffect(() => {
    if (id) {
      const fetchProductDetail = async () => {
        try {
          const token = localStorage.getItem('token')
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/product/${id}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )

          console.log('HTTP Status:', res.status)

          if (!res.ok) {
            const errorData = await res.json()
            console.error('상품 상세 조회 실패:', errorData)
            return
          }

          const resData = await res.json()
          const productData = resData.data.product

          setProduct({
            id: productData.id,
            name: productData.name,
            info: productData.info,
            price: productData.price,
            image_url: productData.imageMainUrl || FlowerImg,
            shop_name: productData.shopName,
          })

          console.log('상품 상세 조회 성공:', productData)
        } catch (err) {
          console.error('네트워크 오류:', err)
        }
      }

      fetchProductDetail()
    }
  }, [id])

  return (
    <Container>
      <Header />
      <img
        src={product?.image_url}
        alt="상품 이미지"
        style={{ width: '393px', height: '304px', flexShrink: '0' }}
      />
      <StoreContainer>
        <StoreBox>
          <img
            src={LionImg}
            alt="사자 이미지"
            style={{ width: '30px', height: '30px', borderRadius: '30px' }}
          />
          <Shopname>{product?.shop_name}</Shopname>
          <img
            src={Right}
            alt="가게 바로가기"
            style={{ width: '12px', height: '12px' }}
          />
        </StoreBox>
      </StoreContainer>
      <ContentContainer>
        <ContentTitle>{product?.name}</ContentTitle>
        <ContentBox>
          <BoxTitle>상품 정보</BoxTitle>
          <BoxDetail>{product?.info}</BoxDetail>
        </ContentBox>
        <AIContainer>
          <AITextBox>
            <AITextLine>
              <AIText>AI 신선도</AIText>
              <IoIosInformationCircleOutline
                style={{ cursor: 'pointer' }}
                onClick={() => setOpen(!open)}
              />
              <Rectengle />
              <Circle />
              <FreshText />
            </AITextLine>
            {open && (
              <div>
                <ComplainBox>
                  <ComplainLine>
                    <IoIosInformationCircleOutline />
                    <ComplainText>
                      생산자가 꽃을 업로드하면, AI가 꽃잎·줄기·색상 등 시각적
                      요소를 분석하여 신선도 등급을 자동 분류
                    </ComplainText>
                  </ComplainLine>
                </ComplainBox>
              </div>
            )}
            <MaybeFresh>( 예상 신선도 유지 기간 : 8일)</MaybeFresh>
          </AITextBox>
          <ShowBox>
            <StepLine>
              <Green>매우 신선</Green>
              <Yellow>양호</Yellow>
              <Red>판매 임박</Red>
            </StepLine>
            <RectengleLine>
              <GR />
              <YR />
              <RR />
            </RectengleLine>
            <Gbox />
          </ShowBox>
        </AIContainer>
      </ContentContainer>
      <BuyContainer>
        <BuyTextLine>
          <Money>{product?.price}</Money>
          <BuyText>원/송이</BuyText>
        </BuyTextLine>
        <ButtonLine>
          <ShopListButton
            onClick={handleClickShop}
            style={{
              opacity: product ? 1 : 0.5,
              pointerEvents: product ? 'auto' : 'none',
              cursor: product ? 'pointer' : 'not-allowed',
            }}
          >
            <ShopText>장바구니</ShopText>
          </ShopListButton>
          <BuyButton
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setActiveId('BuyButton')
            }}
          >
            <PayText>바로 결제</PayText>
          </BuyButton>
          {activeId === 'BuyButton' && (
            <BuySheet
              productId={product.id}
              onClose={() => setActiveId(null)}
              onPurchase={order => console.log('최종 주문:', order)}
            />
          )}
        </ButtonLine>
      </BuyContainer>
    </Container>
  )
}
