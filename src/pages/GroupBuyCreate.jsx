/** @jsxImportSource @emotion/react */
import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react'
import MainHeader from '../components/nav/Header'
import PeonyImg from '../assets/peony.svg'
import Logo from '../assets/logo.svg'
import Slider from '@mui/material/Slider'

export default function GroupBuyForm() {
  const [selected, setSelected] = useState(null)

  const handleSelect = () => {
    // 실제로는 모달/리스트에서 선택 후 값 세팅
    setSelected({
      image: PeonyImg,
      name: '작약 (Peony)',
      farm: '멋사네 가게',
    })
  }
  const [countRange, setCountRange] = useState([3, 10])

  // 슬라이더 핸들러
  const handleRangeChange = (event, newValue) => {
    setCountRange(newValue)
  }
  const [minCount, setMinCount] = useState(3)
  const [maxCount, setMaxCount] = useState(20)
  const [date, setDate] = useState('')
  const [fast, setFast] = useState(false)
  // 오늘 날짜 기준으로 3일 뒤 계산
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 3)

  // yyyy-mm-dd 형식으로 변환
  const minDateStr = minDate.toISOString().split('T')[0]
  const handleFastChange = e => {
    const checked = e.target.checked
    setFast(checked)
    if (checked) {
      setDate(minDateStr) // 3일 후 날짜 자동 설정
    } else {
      setDate('') // 해제 시 비워주기 (선택)
    }
  }
  return (
    <Container>
      <MainHeader />
      {/* 공동구매 대표 */}
      <Card>
        <Row>
          <Label>공동구매 대표</Label>
          <Divider />
          <Value>아무개</Value>
        </Row>
      </Card>

      {/* 공동구매 항목 */}
      <Card>
        <SectionTitle>공동구매 항목</SectionTitle>
        {!selected ? (
          // 초기 상태 (선택 전)
          <Row>
            <Image src={Logo} alt="기본 로고" />
            <SelectBox onClick={handleSelect}>항목 선택하기</SelectBox>
          </Row>
        ) : (
          // 선택 후 상태
          <Row>
            <Image src={selected.image} alt="상품 이미지" />
            <InfoCol>
              <InfoBox>
                <InfoRow>
                  <SmallLabel>상품명</SmallLabel>
                  <Divider />
                  <SmallValue>{selected.name}</SmallValue>
                </InfoRow>
              </InfoBox>
              <InfoBox>
                <InfoRow>
                  <SmallLabel>구매 농장</SmallLabel>
                  <Divider />
                  <SmallValue>{selected.farm}</SmallValue>
                </InfoRow>
              </InfoBox>
            </InfoCol>
          </Row>
        )}
      </Card>

      {/* 배송지 입력 */}
      <Card>
        <SectionTitle>배송지 입력</SectionTitle>
        <InputRow>
          <InputBox>
            <InputLabel>받는 분</InputLabel>
            <Input type="text" />
          </InputBox>
          <InputBox>
            <InputLabel>연락처</InputLabel>
            <Input type="text" />
          </InputBox>
        </InputRow>
        <InputBox full>
          <InputLabel>주소</InputLabel>
          <Input type="text" />
        </InputBox>
      </Card>

      {/* 희망 배송일 */}
      <Card>
        <SectionTitle>희망 배송일</SectionTitle>
        <DateRow>
          <DateInput
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            min={minDateStr}
          />
        </DateRow>
        <Hint>오늘과 내일은 선택할 수 없으며, 3일 후부터 선택 가능합니다.</Hint>
        <CheckboxRow>
          <input type="checkbox" checked={fast} onChange={handleFastChange} />
          <span>가능한 빠른 배송 요망</span>
        </CheckboxRow>
      </Card>
      {/* 마감일 */}
      <Card>
        <SectionTitle>공동구매 마감일</SectionTitle>
        <DateRow>
          <DateInput
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            min={minDateStr}
          />
        </DateRow>
      </Card>

      {/* 인원 */}

      <Card>
        <SectionTitle>인원</SectionTitle>
        <Row>
          <NumberInput
            type="number"
            value={countRange[0]} // 최소 인원
            min={3}
            max={countRange[1]}
            onChange={e =>
              setCountRange([Number(e.target.value), countRange[1]])
            }
          />
          <span>—</span>
          <NumberInput
            type="number"
            value={countRange[1]} // 최대 인원
            min={countRange[0]}
            max={20}
            onChange={e =>
              setCountRange([countRange[0], Number(e.target.value)])
            }
          />
        </Row>
        <SmallHint>최소인원: {countRange[0]}명</SmallHint>

        <Slider
          value={countRange}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          min={3}
          max={20}
          sx={{
            color: '#1f3906',
          }}
        />
      </Card>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 393px;
  height: 100vh;
  margin: 0 auto;
  overflow-y: scroll;
  background: #fff;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
`

const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #000;
`
const SelectBox = styled.div`
  flex: 1;
  border-radius: 12px;
  background: #f8f8f8;
  padding: 12px;
  text-align: center;
  color: #777;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`

const Label = styled.div`
  font-size: 15px;
  color: #808080;
  font-weight: 500;
`

const Value = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #808080;
`

const Image = styled.img`
  width: 87px;
  /* height: 87px; */
  border-radius: 24px;
  object-fit: cover;
`

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`

const InfoBox = styled.div`
  background: #f8f8f8;
  border-radius: 10px;
  padding: 8px 12px;
  width: 200px;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;
  align-items: center;
`

const SmallLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #777;
`

const SmallValue = styled.div`
  font-size: 12px;
  color: #000;
`

const InputRow = styled.div`
  display: flex;
  gap: 10px;
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
  font-weight: 300;
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

const DateRow = styled.div`
  display: flex;
`

const DateInput = styled.input`
  display: flex;
  align-items: center;
  border: 1px solid #808080;
  border-radius: 5px;
  padding: 6px 12px;
  gap: 10px;
  font-size: 12px;
`

const Hint = styled.div`
  font-size: 8px;
  color: #777;
`

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  color: #3a3a3a;
`

const SmallHint = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #808080;
  margin-top: 5px;
`
const NumberInput = styled.input`
  width: 60px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
`
