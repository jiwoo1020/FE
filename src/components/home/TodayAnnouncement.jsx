import styled from '@emotion/styled'

export default function TodayAnnouncement({ events = [] }) {
  return (
    <Wrap>
      <H3>Today’s announcement</H3>
      {events.length === 0 ? (
        <EmptyCard>오늘의 일정이 없습니다.</EmptyCard>
      ) : (
        events.map(e => (
          <Card key={e.event_id}>
            <DateTxt>{e.date}</DateTxt>
            <Badge
              style={
                e.iconImageUrl
                  ? {
                      backgroundImage: `url(${e.iconImageUrl})`,
                      backgroundSize: 'cover',
                    }
                  : {}
              }
            />
            <Main>{e.title}</Main>
            <Desc>{e.description}</Desc>
          </Card>
        ))
      )}
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
  margin: 8px;
  background: #acc3b4;
  border-bottom: 1px solid #e2e2e2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
`
const EmptyCard = styled.div`
  position: relative;
  width: 375px;
  height: 80px;
  margin: 8px;
  background: #f2f2f2;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font: 500 14px 'Pretendard';
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
