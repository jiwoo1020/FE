import styled from '@emotion/styled'

const InfoContainer = styled.div`
  width: 352px;
  height: auto;
  border-radius: 24px;
  background: rgba(255, 255, 224, 0.50);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 26.72px 13.78px;
  margin: 13px auto 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const InfoField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 19px;
  font-size: 16px;
`

const Label = styled.p`
  margin: 0;
  min-width: 60px;
  font-size: 16px;
  white-space: nowrap;
`

const InfoValue = styled.span`
  display: inline-block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 4px 0;
  width: 260px;
  line-height: 20px;
`

export default function UserInformationItem({
  name = '홍길동',
  id = '멋쟁이사자',
  phoneNumber = '010-1234-5678',
}) {
  return (
    <InfoContainer>
      {/*<InfoField>
        <Label>이름</Label>
        <InfoValue>{name}</InfoValue>
      </InfoField> */}
      <InfoField>
        <Label>아이디</Label>
        <InfoValue>{id}</InfoValue>
      </InfoField>
      <InfoField>
        <Label>전화번호</Label>
        <InfoValue>{phoneNumber}</InfoValue>
      </InfoField>
    </InfoContainer>
  )
}
