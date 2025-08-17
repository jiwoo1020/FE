import { useState } from 'react'
import Card from './Card'
import styled from '@emotion/styled'

export default function DeadlineCard() {
  const [deadline, setDeadline] = useState('')

  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 3)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <Card>
      <SectionTitle>공동구매 마감일</SectionTitle>
      <DateRow>
        <DateInput
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          min={minDateStr}
        />
      </DateRow>
    </Card>
  )
}

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
`
const DateRow = styled.div`
  display: flex;
`
const DateInput = styled.input`
  border: 1px solid #808080;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 12px;
`
