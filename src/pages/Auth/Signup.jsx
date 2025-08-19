import { useState } from 'react'
import styled from '@emotion/styled'
import BackgroundEllipses from '../../components/Auth/BackgroundEllipses'
import Header from '../../components/Auth/Header'
import TextField from '../../components/Auth/TextField'
import RoleSelector from '../../components/Auth/RoleSelector'
import logoPium from '../../assets/logo.svg'
import axios from 'axios'

export default function Signup() {
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('consumer') // 'seller' | 'consumer'
  const [bizNo, setBizNo] = useState('')
  const [message, setMessage] = useState('')
  // 규칙
  const usernameRe = /^[a-z0-9_]{4,10}$/ // 아이디: 소문자/숫자/_ 4~10자
  const phoneRe = /^01[016789]\d{8}$/ // 010 + 8자리 (하이픈 없이)
  const pwRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?]).{8,}$/ // 8자, 영문/숫자/특수 포함
  const bizRe = /^\d{10}$/ // 사업자번호 10자리

  const onSubmit = e => {
    e.preventDefault()
    const name = userName.trim()
    const phoneDigits = phone.replace(/\D/g, '')
    const bizDigits = bizNo.replace(/\D/g, '')

    if (!name) return alert('이름을 입력해주세요.')
    if (name.length < 4) return alert('이름은 4자 이상 입력해주세요.')

    if (!phoneDigits) return alert('휴대폰 번호를 입력해주세요.')
    if (!phoneRe.test(phoneDigits))
      return alert('휴대폰 형식이 올바르지 않습니다. 예: 01012345678')

    if (!password) return alert('비밀번호를 입력해주세요.')
    if (!pwRe.test(password))
      return alert('비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.')
    if (role === 'seller') {
      if (!bizNo) return alert('사업자 번호를 입력해주세요.')
      if (bizDigits.length !== 10)
        return alert('사업자 번호는 숫자 10자리입니다.')
    }
    registeraxios({
      username: name,
      password,
      role,
      phoneNumber: phoneDigits,
      businessNumber: role === 'seller' ? bizDigits : '',
    })
  }

  const registeraxios = payload => {
    console.log('회원가입 요청 시작', payload)
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/signup`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          alert('회원가입 성공')
          // 회원가입 후 바로 로그인 토큰을 발급해주는 경우
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            navigate('/')
          } else {
            navigate('/login')
          }
        }
      })
      .catch(err => {
        setMessage(err.response?.data?.message)
        console.log(err)
        console.log(err.response.data)
      })
  }
  return (
    <Container>
      <BackgroundEllipses />
      <Header logoSrc={logoPium} onBack={() => window.history.back()} />

      <Card>
        <CardBlur />

        <TextWrap>
          <Title>Sign Up</Title>
          <SubTitle>Create an account to continue!</SubTitle>
        </TextWrap>

        <Form onSubmit={onSubmit}>
          <TextField
            label="Nickname"
            placeholder="소문자, 숫자 포함 4자리 이상"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            minLength={2}
            maxLength={8}
            required
          />

          <TextField
            label="Phone Number"
            type="tel"
            inputMode="numeric"
            placeholder="01012341234"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ''))}
            maxLength={11}
            required
          />
          <TextField
            label="Set Password"
            type="password"
            toggle
            placeholder="8자 이상, 영문/숫자/특수문자 포함"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <RoleSelector value={role} onChange={setRole} />
          {role === 'seller' && (
            <>
              <SellerRow>
                <SellerHint>판매자이신가요?</SellerHint>
                <ExtraBox>
                  <input
                    value={bizNo}
                    onChange={e =>
                      setBizNo(e.target.value.replace(/[^\d]/g, ''))
                    }
                    placeholder="사업자 번호를 입력해주세요."
                    inputMode="numeric"
                    maxLength={10}
                  />
                </ExtraBox>
              </SellerRow>
            </>
          )}
          <PrimaryButton type="submit">Register</PrimaryButton>
        </Form>

        <AuthRow>
          <span>Already have an account?</span>
          <a href="/auth/login">Login</a>
        </AuthRow>
      </Card>
    </Container>
  )
}

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
`

const Card = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50%));
  width: 90%;
  max-width: 343px;
  min-height: 605px;

  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  isolation: isolate;
  z-index: 1;
`

const CardBlur = styled.div`
  position: absolute;
  width: 320.5px;
  height: 320.5px;
  left: 192px;
  top: -170.5px;
  background: #ffffff;
  filter: blur(65px);
  z-index: 0;
`

const TextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 1;
`

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: -0.02em;
  color: #111827;
`

const SubTitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: -0.01em;
  color: #6c7278;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
  z-index: 2;
`

const SellerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`
const SellerHint = styled.p`
  margin: 6px 0 1px;
  font-size: 12px;
  font-weight: 500;
  color: #6c7278;
`

const ExtraBox = styled.div`
  flex: 1;
  min-width: 0;
  height: 36px;
  border: 1px solid #edf1f3;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(228, 229, 231, 0.24);
  display: flex;
  align-items: center;
  padding: 0 14px;

  input {
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    font-size: 12px;
    color: #6c7278;
  }
`

const PrimaryButton = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 8px;
  padding: 10px 24px;
  border: 0;
  border-radius: 10px;
  background: #1f3906;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.01em;
  cursor: pointer;
`

const AuthRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: auto;
  z-index: 3;

  span {
    color: #6c7278;
    font-size: 12px;
    font-weight: 500;
  }
  a {
    color: #f06292;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
  }
`
