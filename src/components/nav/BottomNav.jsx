import styled from '@emotion/styled'
import { HiOutlineHome, HiOutlineLocationMarker } from 'react-icons/hi'
import { SlCalender } from 'react-icons/sl'
import { CgProfile } from 'react-icons/cg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BottomNav({ defaultActive, userType }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(defaultActive || null) // null이면 기본 비활성

  const items = [
    { key: 'home', label: 'Home', Icon: HiOutlineHome, path: '/' },
    {
      key: 'sharing',
      label: 'Sharing',
      Icon: HiOutlineLocationMarker,
      path: '/groupbuy',
    },
    { key: 'calendar', label: 'Calender', Icon: SlCalender, path: '/calendar' },
    {
      key: 'profile',
      label: 'Profile',
      Icon: CgProfile,
      path: userType === 'seller' ? '/profile/sell' : '/profile/buy',
    },
  ]
  const handleClick = (key, path) => {
    setActive(key)
    navigate(path)
  }

  return (
    <Wrap>
      <Inner>
        {items.map(({ key, label, Icon, path }) => {
          const isActive = active === key
          return (
            <Item
              key={key}
              dim={!isActive && (key === 'sharing' || key === 'profile')}
              onClick={() => handleClick(key, path)}
            >
              <IconBox active={isActive}>
                <Icon size={20} />
              </IconBox>
              <Txt active={isActive}>{label}</Txt>
            </Item>
          )
        })}
      </Inner>
    </Wrap>
  )
}

const Wrap = styled.nav`
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 85px;
  min-height: auto;
  background: #ffffff;
  box-shadow: 0px -28px 17px rgba(0, 0, 0, 0.02),
    0px -13px 13px rgba(0, 0, 0, 0.03), 0px -3px 7px rgba(0, 0, 0, 0.03);
  border-radius: 30px 30px 0 0;
  margin: 15px 0 0 0;
`

const Inner = styled.div`
  position: absolute;
  left: 53px;
  top: 16px;
  width: 287px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 35px;
`

const Item = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  width: 55px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
  cursor: pointer;
`

const IconBox = styled.div`
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  color: ${({ active }) => (active ? '#1F3906' : '#B3B3B3')};
`

const Txt = styled.span`
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: ${({ active }) => (active ? '#1F3906' : '#B3B3B3')};
  font-weight: ${({ active }) => (active ? 500 : 400)};
`
