import {
  DateContainer,
  DateTextBox,
  Title,
  DateInputWrapper,
  DateBox,
  DateText,
  GuideText,
  CalendarBox,
  CalGrid,
  DowCell,
  DateCell,
} from './order.styles'
import { BiCalendar } from 'react-icons/bi'

export default function OrderDatePicker({
  viewDate,
  setViewDate,
  pickedDate,
  setPickedDate,
  delivery,
}) {
  const y = viewDate.getFullYear()
  const m = viewDate.getMonth()

  const prevMonth = () => setViewDate(new Date(y, m - 1, 1))
  const nextMonth = () => setViewDate(new Date(y, m + 1, 1))

  const sameDate = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const fmtK = d => {
    if (!d) return ''
    const dw = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()]
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} (${dw})`
  }

  const first = new Date(y, m, 1)
  const leading = first.getDay()
  const days = new Date(y, m + 1, 0).getDate()
  const cells = [
    ...Array(leading).fill(null),
    ...Array.from({ length: days }, (_, i) => new Date(y, m, i + 1)),
  ]

  // === 오늘 기준으로 이틀 뒤 날짜 ===
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const minSelectable = new Date(today)
  minSelectable.setDate(today.getDate() + 2)

  return (
    <DateContainer>
      <DateTextBox>
        <Title>희망 배송일</Title>
        <DateInputWrapper>
          <DateBox>
            <DateText>{fmtK(pickedDate)}</DateText>
          </DateBox>
          <BiCalendar />
        </DateInputWrapper>
        <GuideText>오늘 기준으로 이틀 이후부터 선택 가능</GuideText>
      </DateTextBox>
      <CalendarBox>
        <CalGrid>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <DowCell key={d} isSun={d === 'Sun'}>
              {d}
            </DowCell>
          ))}
          {cells.map((d, i) => {
            const isDisabled = !d || d < minSelectable
            return (
              <DateCell
                key={i}
                disabled={isDisabled}
                isSun={d && d.getDay() === 0}
                selected={sameDate(d, pickedDate)}
                onClick={() => !isDisabled && setPickedDate(d)}
              >
                {d ? d.getDate() : ''}
              </DateCell>
            )
          })}
        </CalGrid>
      </CalendarBox>
    </DateContainer>
  )
}
