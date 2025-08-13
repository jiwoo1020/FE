import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

export default function Categories({ items = [] }) {
  const navigate = useNavigate()
  return (
    <Wrap>
      <Head>
        <Title>Categories</Title>
        <SeeAll onClick={() => navigate('/product')}>See All</SeeAll>
      </Head>

      <Grid>
        {(items.length
          ? items
          : [
              { name: 'Roses' },
              { name: 'Lilies' },
              { name: 'Tulips' },
              { name: 'Daisies' },
            ]
        ).map((it, i) => (
          <Item key={i}>
            <Thumb
              style={
                it.image
                  ? {
                      backgroundImage: `url(${it.image})`,
                      backgroundSize: 'cover',
                    }
                  : {}
              }
            />
            <Name>{it.name}</Name>
          </Item>
        ))}
      </Grid>
    </Wrap>
  )
}

const Wrap = styled.section`
  position: relative;
  width: 366px;
  margin: 200px auto 0;
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
`
const Grid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, minmax(70px, 1fr));
  gap: 17px;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`
const Thumb = styled.div`
  width: 71px;
  height: 71px;
  border: 1px solid #f8f8f8;
  background: #e9e9e9;
  border-radius: 100px;
`
const Name = styled.span`
  font: 500 14px 'Plus Jakarta Sans';
  color: #777;
`
