import styled from '@emotion/styled'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

export default function MainBanner({
  bgUrl,
  copy = 'Brighten every moment with the perfect bloom. Explore stunning flowers for every occasion.',
  ctaText = 'Shop Now',
}) {
  const navigate = useNavigate()
  return (
    <Wrap>
      <Bg
        style={{
          backgroundImage: `linear-gradient(77.36deg, rgba(31,57,6,.1925) 0.94%, rgba(229,205,211,.77) 32.8%), url(${bgUrl})`,
        }}
      />
      <Copy>{copy}</Copy>
      <CTA onClick={() => navigate('/product')}>{ctaText}</CTA>
      <LogoImg src={logo} />
    </Wrap>
  )
}

const Wrap = styled.section`
  position: relative;
  width: 356px;
  height: 171px;
  left: 16px;
  top: 190px;
`
const Bg = styled.div`
  position: absolute;
  left: -8px;
  top: -6px;
  width: 371px;
  height: 183px;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
`
const Copy = styled.p`
  position: absolute;
  left: 177px;
  top: 49px;
  width: 175px;
  height: 47px;
  font: 500 11px/16px 'Plus Jakarta Sans', sans-serif;
  color: #fff;
`
const CTA = styled.button`
  position: absolute;
  left: 196px;
  top: 127px;
  width: 121px;
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: #1f3906;
  color: #fff;
  font: 14px 'Poppins', sans-serif;
  letter-spacing: -0.03em;
  cursor: pointer;
`
const LogoImg = styled.img`
  position: absolute;
  left: 28px;
  top: 58px;
  width: 116px;
  height: 56px;
  display: grid;
  place-items: center;
`
