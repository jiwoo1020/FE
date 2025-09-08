import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styled from '@emotion/styled'
import BackgroundEllipses from '@/components/Auth/BackgroundEllipses'
import Header from '@/components/Auth/Header'
import TextField from '@/components/Auth/TextField'
import logoPium from '../../assets/logo.svg'
import logoFlower from '../../assets/flowers.svg'

// Yup 스키마
const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-z0-9_]{4,20}$/, '아이디는 소문자/숫자 4~20자여야 합니다.')
    .required('아이디를 입력하세요.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?]).{8,}$/,
      '비밀번호는 8자 이상, 영문/숫자/특수문자 포함'
    )
    .required('비밀번호를 입력하세요.'),
})

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async values => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        console.error('로그인 실패:', response.status, response.statusText)
        alert('아이디 또는 비밀번호를 확인하세요.')
        return
      }

      const data = await response.json()
      console.log('서버 응답:', data)

      if (data.data?.accessToken) {
        localStorage.setItem('token', data.data.accessToken)
        localStorage.setItem('username', values.username)

        const role = data.data?.role?.toLowerCase()
        localStorage.setItem('role', role)
        if (role?.toLowerCase() === 'consumer') {
          navigate('/profile/buy', { replace: true })
        } else if (role?.toLowerCase() === 'seller') {
          navigate('/profile/sell', { replace: true })
        } else {
          navigate('/', { replace: true }) // fallback
        }
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

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Id"
            placeholder="아이디를 작성해주세요."
            autoComplete="off"
            {...register('username')}
          />
          {errors.username && <ErrorMsg>{errors.username.message}</ErrorMsg>}

          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            toggle
            placeholder="비밀번호를 작성해주세요."
            {...register('password')}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}

          <PrimaryButton type="submit">Log In</PrimaryButton>
        </Form>

        <AuthRow>
          <span>Don’t have an account?</span>
          <a href="/auth/signup">Sign Up</a>
        </AuthRow>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 393px; /* 모바일 최대 폭 */
  margin: 0 auto;
  background: #ffffff;
  overflow: hidden;
`
const Card = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% - 17.5px));
  width: 90%;
  max-width: 300px;
  height: 500px;

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

const AuthRow = styled.div`
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
const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`
