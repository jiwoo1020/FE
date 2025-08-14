import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import MonthCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 430px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  `;

const Header = styled.div`
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
`;

const BackButton = styled(FaArrowLeftLong)`
  width: 25px;
  height: 26px;
  color: #fff;
  cursor: pointer;
`;

const SearchButton = styled(IoSearchOutline)`
  width: 28px;
  height: 28px;
  color: #fff;
`;

const Title = styled.h1`
  color: #000;
  //font-family: Pretendard;
  font-size: 24px;
  font-weight: 200;
  letter-spacing: -0.96px;
  margin-left: 17px;
`;

const CalendarWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;

  .react-calendar {
    width: 100% !important;
    max-width: 100%;
    padding-bottom: 12px;
    border: none;

    /* ---- 크기 조절 노브 ---- */
    --tile-h: 74px; /* ← 세로로 긴 직사각형 높이 */
    --day: 30px; /* ← 숫자를 감싸는 원 지름 */
    --fs: 14px; /* ← 숫자 폰트 크기 */
    --dot: 5px; /* ← 이벤트 점 크기 */
    --dot-gap: 10px; /* ← 셀 바닥에서 점까지 간격 */
  }

  /* 상단 네비게이션 전체 */
  .react-calendar__navigation {
    display: flex;
    align-items: center;
    gap: 16px; /* ← 버튼과 라벨 사이 간격 */
  }

  /* 현재 월 라벨 */
  .react-calendar__navigation__label {
    font-size: 16px;
    min-width: 0px;
  }

  .react-calendar__navigation button {
    border-radius: 50px;
  }

  .react-calendar__navigation button:enabled:hover {
    background: #f8f9fa;
  }

  .react-calendar__tile {
    position: relative;
    display: flex;
    font-size: 12px;
    color: #000;
    height: var(--tile-h);
    border-radius: 50px;
    -webkit-tap-highlight-color: transparent;   
    justify-content: center;
    align-items: flex-start;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: transparent;
    color: inherit;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: transparent !important;
    color: #fff !important;
  }

  .react-calendar__tile--now {
    background: transparent;
    outline: none;
  }

  .react-calendar__tile > abbr {
    display: inline-flex;
    width: var(--day);
    height: var(--day);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: var(--fs);
    line-height: 1;
    text-decoration: none;
  }

  .react-calendar__tile--now > abbr {
    box-shadow: inset 0 0 0 1px #1f3906;
  }

  .react-calendar__tile--active > abbr {
    background: #1f3906;
    color: #fff !important;
  }

  .react-calendar__tile--active {
    background: transparent !important;
    color: #fff !important; /* 글자만 흰색 */
  }

  .react-calendar__tile--active > abbr {
    background: #1f3906;
    color: #fff !important;
    border-radius: 50px;
  }

  .react-calendar__tile--active:enabled:hover::after {
    background: #1f3906; 
  }

  .react-calendar__month-view__weekdays__weekday {
    abbr {
      text-decoration: none;
      color: #000;
      font-size: 12px;
      font-weight: lighter;
    }
  }

  /* 요일 헤더 중 일요일 */
  .react-calendar__month-view__weekdays__weekday:first-of-type abbr {
    color: red;
  }

  /* 1) 주말 기본 빨강 제거 (토/일 공통) */
  .react-calendar__month-view__days__day--weekend {
    color: #222;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: transparent !important;
    pointer-events: none; /* 클릭 불가 */
  }

  .event-dot {
    position: absolute;
    bottom: 24px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1f3906;
  }
`;

const EventListContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: #fff;
  border-radius: 30px 30px 0 0;
  border-top: 1px solid #1f3906;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden; /* 내부 스크롤 영역으로 넘김 */
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 357px;
  height: 84px;
  gap: 18px;
`;

const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  margin-top: 20px;
`;

const EventIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: gray;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const EventTitle = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 400;
`;

const EventDescription = styled.div`
  font-size: 12px;
`;

const DragHandle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #d9d9d9;
  margin: 0 auto 4px;
  cursor: grab;
  user-select: none;
  touch-action: none; /* 모바일에서 수직 드래그 방해 최소화 */
`;

const Today = styled.div`
  color: #808080;
  font-size: 12px;
  font-weight: 400;
`;

export default function Calendar() {
  const [value, setValue] = React.useState(new Date());
  const [events, setEvents] = React.useState([]);

  const toKey = (d) => format(d, 'yyyy-MM-dd');
  //const todayKey = toKey(new Date());

  // 목데이터 (API 연결 전 임시)
  React.useEffect(() => {
    const mock = [
      {
        event_id: 501,
        title: '장미데이',
        description: '연인들이 서로에 대한 사랑의 표현으로 장미를 주고받는 날',
        date: '2025-08-20',
      },
      {
        event_id: 502,
        title: '한국외대 졸업식',
        description: '졸업을 축하하는 공식 행사',
        date: '2025-08-27',
      },
    ];
    setEvents(mock);
  }, []);

  const eventsByDate = React.useMemo(() => {
    const m = new Map();
    for (const e of events) {
      const d = e.date || e.event_date || e.eventDate;
      if (!d) continue;
      const key = d.slice(0, 10); // 'yyyy-MM-dd'로 정규화
      const arr = m.get(key) || [];
      arr.push(e);
      m.set(key, arr);
    }
    return m;
  }, [events]);

  const eventDateSet = React.useMemo(
    () => new Set(eventsByDate.keys()),
    [eventsByDate]
  );

  const selectedKey = toKey(value);
  const selectedEvents = eventsByDate.get(selectedKey) || [];

  const selectedLabel = useMemo(() => {
    const base = format(value, 'M월 d일', { locale: ko });
    return isToday(value) ? `${base} (오늘)` : base;
  }, [value]);

  // 바텀시트 높이
  const SHEET_MIN = 150; // 접힘 높이
  const SHEET_MAX = 520; // 펼침 높이(디자인에 맞게 조정)
  const [sheetHeight, setSheetHeight] = useState(SHEET_MIN);
  const dragRef = React.useRef({ y: 0, h: SHEET_MIN, dragging: false });

  const onDragStart = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { y: clientY, h: sheetHeight, dragging: true };

    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
  };

  const onDragMove = (e) => {
    if (!dragRef.current.dragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dy = dragRef.current.y - clientY; // 위로 올리면 + 값
    let next = dragRef.current.h + dy;
    if (next < SHEET_MIN) next = SHEET_MIN;
    if (next > SHEET_MAX) next = SHEET_MAX;
    setSheetHeight(next);
    if (e.cancelable) e.preventDefault(); // 모바일 스크롤 방지
  };

  const onDragEnd = () => {
    const threshold = SHEET_MIN + (SHEET_MAX - SHEET_MIN) / 2;
    setSheetHeight((h) => (h >= threshold ? SHEET_MAX : SHEET_MIN));
    dragRef.current.dragging = false;

    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchend', onDragEnd);
  };

  const monthEvents = useMemo(() => {
    const y = value.getFullYear();
    const m = value.getMonth();
    return events.filter((e) => {
      const raw = e.date || e.event_date || e.eventDate;
      if (!raw) return false;
      const d = new Date(raw);
      return d.getFullYear() === y && d.getMonth() === m;
    });
  }, [events, value]);

  const expanded = sheetHeight === SHEET_MAX;

  return (
    <Container>
      <Header>
        <BackButton />
        <SearchButton />
      </Header>

      <Title>이번 달의 용인 행사</Title>

      <CalendarWrap>
        <MonthCalendar
          onChange={setValue}
          value={value}
          locale="ko-KR"
          calendarType="gregory"
          formatDay={(locale, date) => date.getDate()} // ← '일' 제거
          // 월 전후 이동은 네비게이션 기본 제공 (상단 화살표)
          prev2Label={null}
          next2Label={null}
          //  이벤트가 있는 날이면 점 표시
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
            return eventDateSet.has(toKey(date)) ? (
              <div className="event-dot" />
            ) : null;
          }}
        />
      </CalendarWrap>

      <EventListContainer
        style={{
          height: sheetHeight,
          transition: dragRef.current.dragging ? 'none' : 'height 160ms ease',
        }}
      >
        <DragHandle onMouseDown={onDragStart} onTouchStart={onDragStart} />
        <Today>
          {expanded
            ? `${format(value, 'M월 전체 일정', { locale: ko })} (${
                monthEvents.length
              }건)`
            : selectedLabel}
        </Today>

        <div style={{ overflowY: 'auto', height: `calc(${sheetHeight}px - 60px)` }}>
          {(expanded ? monthEvents : selectedEvents).length === 0 ? (
            <EventTitle
              style={{
                color: '#808080',
                fontSize: '14px',
                fontWeight: 300,
                marginTop: '20px',
              }}
            >
              이 날짜에는 행사가 없습니다.
            </EventTitle>
          ) : (
            (expanded ? monthEvents : selectedEvents).map((e) => (
              <EventContainer key={e.event_id}>
                <EventInfoContainer>
                  <EventIcon />
                  <EventInfo>
                    <EventTitle>{e.title}</EventTitle>
                    <EventDescription>{e.description}</EventDescription>
                  </EventInfo>
                </EventInfoContainer>
              </EventContainer>
            ))
          )}
        </div>
      </EventListContainer>
    </Container>
  );
}
