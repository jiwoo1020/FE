import styled from '@emotion/styled'

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px; /* 모바일 최대 폭 */
  margin: 0 auto;
  background: #ffffff;
  min-height: 100vh;
  height: auto;
  overflow-y: auto;
  padding-bottom: 90px;
`

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #1f3906;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 306px;
  box-sizing: border-box;
`

export const OrderContainer = styled.div`
  display: flex;
  width: 362px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 11px;
  margin-top: 11px;
  gap: 8px;
`

export const Orderbox = styled.div`
  display: flex;
  width: 343px;
  padding: 11px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  margin-top: 11px;
`

export const OrderTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 17px;
`

export const DetailLine = styled.div`
  display: flex;
  width: 328px;
  height: 87px;
  padding-right: 241px;
  align-items: center;
  flex-shrink: 0;
  flex-direction: row;
`

export const DetailTextBox = styled.div`
  width: 235px;
  height: 87px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #f8f8f8;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 21px;
`

export const DetailTitle = styled.div`
  color: #111;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  align-self: stretch;
  margin-bottom: 6px;
  margin-top: 14px;
`

export const Detail = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 9px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 22px;
`

export const DeliverTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

export const DeliverTextBox = styled.div`
  display: flex;
  width: 343px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`

export const DeliverTextLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`

export const PlaceBox = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

export const PlaceText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const Place = styled.div`
  width: 120px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`

export const NumberContainer = styled.div`
  display: flex;
  width: 213px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

export const NumberTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const NumberBox = styled.div`
  width: 213px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`

export const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`

export const PeopleTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const PeopleBox = styled.div`
  width: 343px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`

export const DateContainer = styled.div`
  display: flex;
  padding: 11px;
  align-items: flex-start;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  flex-direction: row;
  width: 343px;
`

export const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

export const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  margin-top: 15px;
`

export const DateText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const GuideText = styled.div`
  color: #777;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 4px;
`

export const OptionBox = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 5px;
`

export const OptinLine = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 5px;
`

export const OPtionText = styled.div`
  color: #3a3a3a;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const CalendarBox = styled.div`
  display: flex;
  width: 175px;
  height: 174px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  max-width: 175px;
  width: 100%;
`

export const DateBox = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid #808080;
`

export const DateTextBox = styled.div`
  display: flex;
  width: 146px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`

export const PayTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

export const ButtonLine = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  flex-direction: row;
`

export const CashButton = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.37);
  background: #000;
  color: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const CardButton = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #d5d5d5;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const TotalLine = styled.div`
  display: flex;
  width: 317px;
  align-items: center;
  gap: 200px;
  flex-direction: row;
`

export const Total = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const Howmuch = styled.div`
  color: #d70505;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const Box = styled.div`
  display: flex;
  height: 56px;
  padding-left: 13px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
`

export const MoneyLine = styled.div`
  display: flex;
  align-items: center;
  gap: 200px;
  align-self: stretch;
  flex-direction: row;
`

export const Pay = styled.div`
  color: #777;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const Product = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const TaxLine = styled.div`
  display: flex;
  align-items: center;
  gap: 225px;
  align-self: stretch;
  flex-direction: row;
`

export const OrderButton = styled.div`
  display: flex;
  width: 362px;
  height: 40px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #1f3906;
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const MonthBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`

export const July = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 6px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 8.4px */
  letter-spacing: -0.15px;
`

export const Agust = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 7px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 9.8px */
  letter-spacing: -0.175px;
`

export const September = styled.div`
  color: #808080;
  font-family: Pretendard;
  font-size: 6px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 8.4px */
  letter-spacing: -0.15px;
`

export const InputInner = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 14px;
  line-height: 1.4;
  padding: 8px 0;
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

export const CalGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px 10px;
  margin-top: 10px;
`

export const DowCell = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  aspect-ratio: 1 / 1;
  color: ${p => (p.isSun ? '#e84e4e' : '#888')};
`

export const DateCell = styled.button`
  all: unset;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  font-family: 'Pretendard', sans-serif;
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: ${p => (p.isSun ? '#e84e4e' : '#333')};
  background: ${p => (p.selected ? '#e6e6e6' : 'transparent')};
  &:hover {
    background: ${p => (p.disabled ? 'transparent' : '#f0f0f0')};
  }
`
