import styled from '@emotion/styled'

export default function BackgroundEllipses() {
  return (
    <>
      <Right />
      <Left />
    </>
  )
}
const Right = styled.div`
  position: absolute;
  width: 934px;
  height: 934px;
  right: -586px;
  top: 419px;
  background: #ffffe0;
  opacity: 0.8;
  filter: blur(295.515px);
`
const Left = styled.div`
  position: absolute;
  width: 582px;
  height: 582px;
  left: -229px;
  top: -163px;
  background: #00491f;
  opacity: 0.8;
  filter: blur(184.143px);
`
