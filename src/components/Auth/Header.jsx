import styled from '@emotion/styled'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'

export default function Header({ logoSrc, onBack }) {
  return (
    <>
      <BackBtn onClick={onBack} aria-label="back">
        <HiOutlineArrowNarrowLeft />
      </BackBtn>
      <Logo src={logoSrc} alt="pium logo" />
    </>
  )
}

const BackBtn = styled.button`
  position: absolute;
  left: 25px;
  top: 20px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1a1c1e;
  display: grid;
  place-items: center;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2px;
  }
`
const Logo = styled.img`
  position: absolute;
  z-index: 9999;
  width: 81px;
  height: 39px;
  left: calc(50% - 81px / 2);
  top: 13px;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`
