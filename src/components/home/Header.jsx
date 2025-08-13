import styled from '@emotion/styled'
import logoWhite from '../../assets/logo_white.svg'
import { FiSearch } from 'react-icons/fi'
import { PiShoppingCartLight, PiSlidersHorizontal } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

export default function Header({ onSearchChange }) {
  const navigate = useNavigate()

  const onLoginClick = () => {
    navigate('auth/login')
  }
  const onSettingsClick = () => {
    // navigate('auth/login')
    //filters로 가게하기
  }
  const onCartClick = () => {
    navigate('/product/cart')
  }
  return (
    <Wrap>
      <Bg />

      <Row>
        <Search>
          <SearchIcon />
          <Input placeholder="Search flowers" onChange={onSearchChange} />
        </Search>
        <Settings onClick={onSettingsClick} aria-label="settings">
          <SettingsIcon />
        </Settings>
      </Row>

      <Pills>
        <Cart>
          <CartIcon onClick={onCartClick} />
        </Cart>
        <Login onClick={onLoginClick}>Login</Login>
      </Pills>

      <LogoWhite src={logoWhite} alt="logo white" />
    </Wrap>
  )
}

const Wrap = styled.header`
  position: relative;
  width: 100%;
`

const Bg = styled.div`
  position: absolute;
  inset: 0;
  width: 446px;
  height: 166px;
  left: 50%;
  transform: translateX(calc(-50% - 2.5px));
  background: #1f3906;
`
const LogoWhite = styled.img`
  position: absolute;
  top: 22px;
  left: 10px;
  width: 90px;
  height: 46px;
`

const Row = styled.div`
  position: absolute;
  left: 10px;
  top: 93px;
  width: 373px;
  height: 45px;
  display: grid;
  grid-template-columns: 1fr 46px;
  gap: 12px;
`

const Search = styled.div`
  position: relative;
  height: 45px;
  background: #fff;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
`

const SearchIcon = styled(FiSearch)`
  padding: 13px;
  width: 20px;
  height: 20px;
`

const Input = styled.input`
  position: absolute;
  left: 45px;
  top: 11px;
  width: calc(100% - 60px);
  height: 23px;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: #616161;
`

const Settings = styled.div`
  height: 46px;
  width: 46px;
  border-radius: 10px;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
`
const SettingsIcon = styled(PiSlidersHorizontal)`
  width: 22px;
  height: 22px;
`

const Pills = styled.div`
  position: absolute;
  right: 12px;
  top: 31px;
  display: flex;
  gap: 8px;
`

const Login = styled.div`
  width: 46px;
  height: 29px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.7);
  color: #1f3906;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Cart = styled.div`
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CartIcon = styled(PiShoppingCartLight)`
  width: 16px;
  height: 16px;
`
