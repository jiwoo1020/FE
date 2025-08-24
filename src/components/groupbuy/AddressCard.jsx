import Card from './Card'
import styled from '@emotion/styled'

export default function AddressCard({
  recipientName,
  onChangeName,
  recipientPhone,
  onChangePhone,
  address,
  onChangeAddress,
}) {
  return (
    <Card>
      <SectionTitle>배송지 입력</SectionTitle>
      <InputRow>
        <InputBox>
          <InputLabel>받는 분</InputLabel>
          <Input
            type="text"
            placeholder="이름 입력"
            value={recipientName}
            onChange={e => onChangeName(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <InputLabel>연락처</InputLabel>
          <Input
            type="text"
            placeholder="010-0000-0000"
            value={recipientPhone}
            onChange={e => onChangePhone(e.target.value)}
          />
        </InputBox>
      </InputRow>
      <InputBox full>
        <InputLabel>주소</InputLabel>
        <Input
          type="text"
          placeholder="주소 입력"
          value={address}
          onChange={e => onChangeAddress(e.target.value)}
        />
      </InputBox>
    </Card>
  )
}

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
`
const InputRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: ${props => (props.full ? '1' : '1')};
  min-width: 0;
`
const InputLabel = styled.div`
  font-size: 10px;
  color: #000;
`
const Input = styled.input`
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #1f3906;
    box-shadow: 0 0 0 2px rgba(31, 57, 6, 0.2);
  }
`
