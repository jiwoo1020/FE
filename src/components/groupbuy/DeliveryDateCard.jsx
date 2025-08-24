import Card from './Card'
import styled from '@emotion/styled'

export default function DeliveryDateCard({ value, onChange }) {
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 3)
  const minDateStr = minDate.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm

  return (
    <Card>
      <SectionTitle>희망 배송일</SectionTitle>
      <DateRow>
        <DateInput
          type="datetime-local"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={minDateStr}
        />
      </DateRow>
      <Hint>{minDateStr.split('T')[0]} 이후 날짜부터 선택 가능합니다.</Hint>
    </Card>
  )
}

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
`
const DateRow = styled.div`
  display: flex;
  gap: 10px;
`
const DateInput = styled.input`
  border: 1px solid #808080;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 12px;
`
const Hint = styled.div`
  font-size: 10px;
  color: #777;
  margin-top: 4px;
`
