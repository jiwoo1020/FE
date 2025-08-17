import styled from '@emotion/styled'

export default function Card({ children }) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`
