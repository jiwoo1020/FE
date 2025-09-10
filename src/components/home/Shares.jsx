import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

export default function Shares({ cards = [] }) {
  const navigate = useNavigate()

  const data = (cards.length
    ? cards
    : [
        {
          id: 1,
          productName: '작약',
          farmName: '멋사네가게',
          price: 28000,
          currentParticipants: 14,
          maxParticipants: 20,
          imageUrl: '/uploads/sample.jpg', 
        },
      ]
  ).map(c => ({
    ...c,
    imageUrl: c.imageUrl?.startsWith('/')
      ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${c.imageUrl}`
      : c.imageUrl,
  }))
  

  return (
    <Wrap>
      <Head>
        <Title>Sharing Service</Title>
        <SeeAll onClick={() => navigate('/groupbuy')}>See All</SeeAll>
      </Head>

      <Grid>
        {data.map(c => {
          const progress = Math.min(
            1,
            Math.max(0, c.currentParticipants / c.maxParticipants)
          )

          return (
            <Card key={c.id}>
              <Header>
              <FloImg
                style={{
                  backgroundImage: `url(${c.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
                <ShopName>
                  | {c.productName} <br />| {c.farmName}
                </ShopName>
              </Header>

              <Price>₩{c.price?.toLocaleString()}</Price>

              <Meta>
                <span>
                  {c.currentParticipants}/{c.maxParticipants}명 참여
                </span>
              </Meta>

              <Track>
                <Bar style={{ width: `${progress * 105}px` }} />
              </Track>

              <JoinBtn onClick={() => navigate(`/groupbuy/${c.id}`)}>
                공동구매 참여하기
              </JoinBtn>
            </Card>
          )
        })}
      </Grid>
    </Wrap>
  )
}

const Wrap = styled.section`
  position: relative;
  width: 378px;
  margin: 20px auto 0;
`
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.h2`
  margin: 0;
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: 19.8px;
  letter-spacing: -1.04px;
  color: #0a0909;
  line-height: 59px;
`
const SeeAll = styled.a`
  font: 500 14px 'Poppins';
  color: #f06292;
  text-decoration: none;
  cursor: pointer;
`
const Grid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 119px);
  gap: 14px;
`
const Card = styled.div`
  box-sizing: border-box;
  width: 119px;
  height: 119px;
  background: #f2f3f5;
  border-bottom: 1px solid #e2e2e2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  position: relative;
`
const Header = styled.div`
  position: absolute;
  left: 9px;
  top: 13px;
  width: 105px;
  height: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const FloImg = styled.div`
  width: 25px;
  height: 25px;
  background: #d9d9d9;
  border-radius: 100px;
`
const ShopName = styled.span`
  font: 600 10px 'Pretendard';
  color: #000;
`
const Price = styled.div`
  position: absolute;
  left: 9px;
  top: 47px;
  font: 700 11px 'Pretendard';
  color: #1f3906;
`
const Meta = styled.div`
  position: absolute;
  left: 7px;
  top: 65px;
  width: 100px;
  display: flex;
  font: 400 8px 'Pretendard';
  color: #000;
`
const Track = styled.div`
  position: absolute;
  left: 7px;
  top: 80px;
  width: 105px;
  height: 4px;
  border-radius: 10px;
  background: #fff;
`
const Bar = styled.div`
  height: 4px;
  border-radius: 10px;
  background: #1f3906;
`
const JoinBtn = styled.button`
  position: absolute;
  left: 17px;
  top: 94px;
  width: 87px;
  height: 20px;
  border: 0;
  border-radius: 10px;
  background: #1f3906;
  color: #fff;
  font: 600 9px 'Pretendard';
  cursor: pointer;
`
