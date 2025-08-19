import styled from '@emotion/styled'

export default function RoleSelector({ value, onChange }) {
  return (
    <Wrap>
      <Option
        onClick={() => {
          console.log('role -> seller')
          onChange('seller')
        }}
      >
        <HiddenRadio
          type="radio"
          name="role"
          value="seller"
          checked={value === 'seller'}
          onChange={e => {
            console.log('role ->', e.target.value)
            onChange(e.target.value)
          }}
        />
        <Dot checked={value === 'seller'} />
        <LabelText>판매자</LabelText>
      </Option>

      <Option
        onClick={() => {
          console.log('role -> consumer')
          onChange('coustomer')
        }}
      >
        <HiddenRadio
          type="radio"
          name="role"
          value="consumer"
          checked={value === 'consumer'}
          onChange={e => {
            console.log('role ->', e.target.value)
            onChange(e.target.value)
          }}
        />
        <Dot checked={value === 'consumer'} />
        <LabelText>구매자</LabelText>
      </Option>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`

const Option = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 24px;
  padding: 4px 2px;
  cursor: pointer;
`

const HiddenRadio = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  margin: 0;
`

const Dot = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background: #fff;
  border: 1px solid #000;
  position: relative;
  flex: 0 0 16px;

  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 30px;
    background: ${({ checked }) => (checked ? '#000' : 'transparent')};
  }
`

const LabelText = styled.span`
  font-family: 'Inter', system-ui;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.01em;
  color: #6c7278;
`
