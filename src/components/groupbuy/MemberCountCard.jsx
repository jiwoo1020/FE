import Card from './Card'
import styled from '@emotion/styled'
import Slider from '@mui/material/Slider'

export default function MemberCountCard({
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
}) {
  const handleRangeChange = (e, newValue) => {
    onChangeMin(newValue[0])
    onChangeMax(newValue[1])
  }

  return (
    <Card>
      <SectionTitle>인원</SectionTitle>
      <Row>
        <NumberInput
          type="number"
          value={minValue}
          min={3}
          max={maxValue}
          onChange={e => onChangeMin(Number(e.target.value))}
        />
        <span>—</span>
        <NumberInput
          type="number"
          value={maxValue}
          min={minValue}
          max={20}
          onChange={e => onChangeMax(Number(e.target.value))}
        />
      </Row>
      <SmallHint>최소인원: {minValue}명</SmallHint>

      <Slider
        value={[minValue, maxValue]}
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
