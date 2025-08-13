import styled from '@emotion/styled'

export default function TodayAnnouncement({
  title = '장미데이',
  date = '8월 20일 (오늘)',
  desc = '연인들이 서로에 대한 사랑의 표현으로 장미를 주고받는 날',
  badgeUrl,
}) {
  return (
    <Wrap>
      <H3>Today’s announcement</H3>
      <Card>
        <DateTxt>{date}</DateTxt>
        <Badge
          style={
            badgeUrl
              ? { backgroundImage: `url(${badgeUrl})`, backgroundSize: 'cover' }
              : {}
          }
        />
        <Main>{title}</Main>
        <Desc>{desc}</Desc>
      </Card>
    </Wrap>
  )
}

const Wrap = styled.section`
  position: relative;
  width: 375px;
`
const H3 = styled.h3`
  position: relative;
  left: 9px;
  margin: 0 0 8px;
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: 19.8px;
  letter-spacing: -1.04px;
  color: #0a0909;
  line-height: 59px;
`
const Card = styled.div`
  position: relative;
  width: 375px;
  height: 116px;
  margin-left: 8px;
  background: #acc3b4;
  border-bottom: 1px solid #e2e2e2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
`
const DateTxt = styled.span`
  position: absolute;
  left: 15px;
  top: 15px;
  font: 400 12px 'Pretendard';
  color: #808080;
`
const Badge = styled.div`
  position: absolute;
  left: 17px;
  top: 55px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: #e6e6e6;
`
const Main = styled.div`
  position: absolute;
  left: 50px;
  top: 57px;
  font: 400 20px 'Pretendard';
  color: #000;
`
const Desc = styled.div`
  position: absolute;
  left: 50px;
  top: 87px;
  width: 270px;
  font: 400 12px 'Pretendard';
  color: #000;
`
