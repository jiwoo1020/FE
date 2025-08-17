import { useState } from 'react'
import Card from './Card'
import styled from '@emotion/styled'
import Slider from '@mui/material/Slider'

export default function MemberCountCard() {
  const [countRange, setCountRange] = useState([3, 10])

  const handleRangeChange = (e, newValue) => {
    setCountRange(newValue)
  }

  return (
    <Card>
      <SectionTitle>인원</SectionTitle>
      <Row>
        <NumberInput
          type="number"
          value={countRange[0]}
          min={3}
          max={countRange[1]}
          onChange={e => setCountRange([Number(e.target.value), countRange[1]])}
        />
        <span>—</span>
        <NumberInput
          type="number"
          value={countRange[1]}
          min={countRange[0]}
          max={20}
          onChange={e => setCountRange([countRange[0], Number(e.target.value)])}
        />
      </Row>
      <SmallHint>최소인원: {countRange[0]}명</SmallHint>

      <Slider
        value={countRange}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        min={3}
        max={20}
        sx={{ color: '#1f3906' }}
      />
    </Card>
  )
}

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const NumberInput = styled.input`
  width: 60px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
`
const SmallHint = styled.div`
  font-size: 12px;
  color: #808080;
  margin-top: 5px;
`
