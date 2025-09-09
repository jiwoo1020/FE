import styled from '@emotion/styled'
import BackgroundEllipses from '../../components/Auth/BackgroundEllipses'
import Header from '../../components/Auth/Header'
import TextField from '../../components/Auth/TextField'
import RoleSelector from '../../components/Auth/RoleSelector'
import logoPium from '../../assets/logo.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { forwardRef, useState } from 'react'

// Yup 스키마 정의
const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-z0-9_]{4,10}$/, '아이디는 소문자/숫자/_ 4~10자')
    .required('아이디를 입력해주세요.'),
  phoneNumber: yup
    .string()
    .matches(
      /^01[016789]\d{8}$/,
      '휴대폰 형식이 올바르지 않습니다. (예: 01012345678)'
    )
    .required('휴대폰 번호를 입력해주세요.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?]).{8,}$/,
      '비밀번호는 8자 이상, 영문/숫자/특수문자 포함'
    )
    .required('비밀번호를 입력해주세요.'),
  role: yup.string().oneOf(['consumer', 'seller']).required(),

  businessNumber: yup.string().when('role', {
    is: 'seller',
    then: schema =>
      schema
        .matches(/^\d{10}$/, '사업자번호는 숫자 10자리여야 합니다.')
        .required('사업자번호를 입력해주세요.'),
  }),
  shopName: yup.string().when('role', {
    is: 'seller',
    then: schema => schema.required('가게 이름을 입력해주세요.'),
  }),
  depositAccount: yup.object({
    bank: yup.string().when('role', {
      is: 'seller',
      then: schema => schema.required('은행명을 입력해주세요.'),
    }),
    number: yup.string().when('role', {
      is: 'seller',
      then: schema =>
        schema
          .matches(/^\d{10,20}$/, '계좌번호는 10~20자리 숫자')
          .required('계좌번호를 입력해주세요.'),
    }),
    holder: yup.string().when('role', {
      is: 'seller',
      then: schema => schema.required('예금주명을 입력해주세요.'),
    }),
  }),
})

export default function Signup() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      role: 'consumer',
      depositAccount: { bank: '', number: '', holder: '' },
    },
  })

  const role = watch('role')

  const onSubmit = async data => {
    try {
      console.log('회원가입 요청 payload:', data)
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (res.status === 200 || res.status === 201) {
        alert('회원가입 성공!')

        localStorage.setItem('role', data.role)

        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          navigate('/')
        } else {
          navigate('/auth/login')
        }
      }
    } catch (err) {
      console.error('회원가입 에러:', err)
      alert(err.response?.data?.message || '회원가입 중 오류 발생')
    }
  }

  return (
    <Container>
      <BackgroundEllipses />
      <Header logoSrc={logoPium} onBack={() => window.history.back()} />

      <Card role={role}>
        <CardBlur />

        <TextWrap>
          <Title>Sign Up</Title>
          <SubTitle>Create an account to continue!</SubTitle>
        </TextWrap>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <TextField
              label="Nickname"
              placeholder="소문자, 숫자 포함 4자리 이상"
              {...register('username')}
              autoComplete="off"
              error={errors.username?.message}
            />
          </Field>

          <Field>
            <TextField
              label="Phone Number"
              placeholder="01012341234"
              autoComplete="off"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
          </Field>

          <Field>
            <TextField
              label="Set Password"
              type="password"
              autoComplete="new-password"
              toggle
              placeholder="알파벳, 숫자, 특수문자 포함 8자 이상"
              {...register('password')}
              error={errors.password?.message}
            />
          </Field>

          <Field>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RoleSelector value={field.value} onChange={field.onChange} />
              )}
            />
          </Field>

          {role === 'seller' && (
            <>
              <Field>
                <TextField
                  label="Business Number"
                  placeholder="사업자번호 (10자리)"
                  autoComplete="off"
                  {...register('businessNumber')}
                />
                {errors.businessNumber && (
                  <ErrorMsg>{errors.businessNumber.message}</ErrorMsg>
                )}
              </Field>
              <Field>
                <TextField
                  label="Shop Name"
                  placeholder="가게 이름"
                  autoComplete="off"
                  {...register('shopName')}
                />
                {errors.shopName && (
                  <ErrorMsg>{errors.shopName.message}</ErrorMsg>
                )}
              </Field>
              <Field>
                <TextField
                  label="Bank"
                  placeholder="은행명"
                  autoComplete="off"
                  {...register('depositAccount.bank')}
                />
                {errors.depositAccount?.bank && (
                  <ErrorMsg>{errors.depositAccount.bank.message}</ErrorMsg>
                )}
              </Field>
              <Field>
                <TextField
                  label="Account Number"
                  placeholder="계좌번호"
                  autoComplete="off"
                  {...register('depositAccount.number')}
                />
                {errors.depositAccount?.number && (
                  <ErrorMsg>{errors.depositAccount.number.message}</ErrorMsg>
                )}
              </Field>
              <Field>
                <TextField
                  label="Account Holder"
                  placeholder="예금주명"
                  autoComplete="off"
                  {...register('depositAccount.holder')}
                />
                {errors.depositAccount?.holder && (
                  <ErrorMsg>{errors.depositAccount.holder.message}</ErrorMsg>
                )}
              </Field>
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
  min-height: 100vh;
  max-width: 393px; /* 모바일 최대 폭 */
  margin: 0 auto;
  background: #ffffff;
  overflow-x: hidden;
`
const Card = styled.div`
  position: absolute;
  left: 50%;
  top: ${({ role }) => (role === 'seller' ? '70%' : '50%')};
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 300px;
  min-height: 595px;

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
const Field = styled.div`
  display: flex;
  flex-direction: column;
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
const ErrorMsg = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: red;
`
