import { useState } from 'react'
import Card from './Card'
import styled from '@emotion/styled'

export default function DeliveryDateCard() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [fast, setFast] = useState(false)

  // 오늘 기준 3일 뒤부터 선택 가능
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 3)
  const minDateStr = minDate.toISOString().split('T')[0]

  const handleFastChange = e => {
    const checked = e.target.checked
    setFast(checked)
    if (checked) {
      setDate(minDateStr)
      setTime('00:00')
    } else {
      setDate('')
      setTime('')
    }
  }

  return (
    <Card>
      <SectionTitle>희망 배송일</SectionTitle>
      <DateRow>
        <DateInput
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={minDateStr}
        />
        <TimeInput
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </DateRow>
      <Hint>{minDateStr} 이후 날짜부터 선택 가능합니다.</Hint>
      <CheckboxRow>
        <input type="checkbox" checked={fast} onChange={handleFastChange} />
        <span>가능한 빠른 배송 요망</span>
      </CheckboxRow>
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
const TimeInput = styled.input`
  border: 1px solid #808080;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 12px;
  width: 120px;
`
const Hint = styled.div`
  font-size: 10px;
  color: #777;
  margin-top: 4px;
`
const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
`
