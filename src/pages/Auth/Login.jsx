import { useState } from 'react'
import styled from '@emotion/styled'
import BackgroundEllipses from '@/components/Auth/BackgroundEllipses'
import Header from '@/components/Auth/Header'
import TextField from '@/components/Auth/TextField'
import logoPium from '../../assets/logo.svg'
import logoFlower from '../../assets/flowers.svg'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()
  const handleLoginClick = async e => {
    e.preventDefault() // form submit 막기
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json', // Swagger 맞추기
        },
        body: JSON.stringify({ username: name, password: pw }),
        // body: JSON.stringify({ username: 'ss1234', password: '1234qwer!' }),
        credentials: 'include',
      })
      if (!response.ok) {
        alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.')
        console.error('로그인 실패 응답:', response.status, response.statusText)
        return
      }

      const data = await response.json()
      console.log('서버 응답:', data)

      if (data.data.accessToken) {
        localStorage.setItem('token', data.data.accessToken) // 토큰 저장
        alert('로그인 성공!')
        navigate('/')
      } else {
        alert('로그인 실패: 토큰이 없습니다.')
      }
    } catch (error) {
      console.error('로그인 오류:', error)
      alert('로그인 중 오류가 발생했습니다.')
    }
  }

  return (
    <Container>
      <BackgroundEllipses />
      <Header logoSrc={logoPium} onBack={() => window.history.back()} />

      <Card>
        <CardBlur />
        <LogoFlower src={logoFlower} alt="flower" />

        <TextWrap>
          <Title>Login</Title>
          <SubTitle>Enter your id and password to log in</SubTitle>
        </TextWrap>

        <Form onSubmit={handleLoginClick}>
          <TextField
            label="Id"
            placeholder="아이디를 작성해주세요."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            toggle //눈 아이콘 활성화
            placeholder="비밀번호를 작성해주세요."
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
          <PrimaryButton type="submit">Log In</PrimaryButton>
        </Form>

        <SignupRow>
          <span>Don’t have an account?</span>
          <a href="/auth/signup">Sign Up</a>
        </SignupRow>
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
  transform: translate(-50%, calc(-50% - 17.5px));
  width: 90%;
  max-width: 343px;
  height: 515px;

  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  isolation: isolate;
  z-index: 1;
`

const CardBlur = styled.div`
  position: absolute;
  width: 320.5px;
  height: 320.5px;
  left: 192px;
  top: -170.5px;
  background: #fff;
  filter: blur(65px);
  z-index: 0;
`

const LogoFlower = styled.img`
  width: 41px;
  height: 56px;
  z-index: 1;
`

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 2;
  width: 100%;
`
const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 130%;
  letter-spacing: -0.02em;
  color: #111827;
`
const SubTitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.01em;
  color: #6c7278;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 3;
`

const PrimaryButton = styled.button`
  width: 99%;
  height: 48px;
  margin-top: 8px;
  border: 0;
  border-radius: 10px;
  padding: 10px 24px;
  background: #1f3906;
  box-shadow: 0 0 0 1px rgba(0, 73, 31, 0.1);
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.01em;
  cursor: pointer;
`

const SignupRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  z-index: 5;
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
