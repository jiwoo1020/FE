import styled from '@emotion/styled'

const StoreInfoContainer = styled.div`
  width: 352px;
  border-radius: 24px;
  background: rgba(200, 230, 201, 0.50);
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
  align-items: center;
  gap: 19px;
  font-size: 16px;
`

const Label = styled.p`
  margin: 0;
  min-width: 80px;
  font-size: 16px;
  white-space: nowrap;
`

const InfoInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  background-color: transparent;
  width: 260px;
  font-size: 16px;
  line-height: 20px;
  padding: 4px 0;
  outline: none;

  &:focus {
    border-bottom: 1px solid #1f3906;
  }
`

const InfoValue = styled.span`
  display: inline-block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 4px 0;
  width: 260px;
  line-height: 20px;
`

export default function StoreInfoCard({
  storeName = '',
  location = '',
  accountNumber = '',
  storeNumber = '',
}) {
  return (
    <StoreInfoContainer>
      <InfoField>
        <Label>가게 이름</Label>
        {storeName ? (
          <InfoValue>{storeName}</InfoValue>
        ) : (
          <InfoInput placeholder="가게 이름을 입력해주세요" />
        )}
      </InfoField>

      <InfoField>
        <Label>가게 위치</Label>
        {location ? (
          <InfoValue>{location}</InfoValue>
        ) : (
          <InfoInput placeholder="가게 위치를 입력해주세요" />
        )}
      </InfoField>

      <InfoField>
        <Label>입금 계좌</Label>
        {accountNumber ? (
          <InfoValue>{accountNumber}</InfoValue>
        ) : (
          <InfoInput placeholder="입금 계좌를 입력해주세요" />
        )}
      </InfoField>

      <InfoField>
        <Label>사업자번호</Label>
        {storeNumber ? (
          <InfoValue>{storeNumber}</InfoValue>
        ) : (
          <InfoInput placeholder="사업자번호를 입력해주세요" />
        )}
      </InfoField>
    </StoreInfoContainer>
  )
}
