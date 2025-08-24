import { useState, forwardRef } from 'react'
import styled from '@emotion/styled'

const TextField = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      toggle = false, // password 눈 아이콘 표시 여부
      minLength,
      maxLength,
      pattern,
      required,
      inputMode,
      title,
      error = '',
      ...rest // RHF에서 넘겨주는 onChange, onBlur, name, value 등
    },
    ref
  ) => {
    const [show, setShow] = useState(false)
    const isPassword = type === 'password'

    return (
      <Field>
        {label && <Label>{label}</Label>}
        <InputArea>
          <Input
            ref={ref} // ✅ RHF register에서 전달받은 ref
            type={isPassword ? (show ? 'text' : 'password') : type}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            required={required}
            inputMode={inputMode}
            title={title}
            {...rest} // ✅ RHF register에서 전달받은 onChange, onBlur, name, value
          />
          {toggle && isPassword && (
            <EyeButton
              type="button"
              aria-label={show ? 'hide password' : 'show password'}
              onClick={() => setShow(v => !v)}
            >
              <EyeIcon />
            </EyeButton>
          )}
        </InputArea>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Field>
    )
  }
)

export default TextField
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`
const Label = styled.label`
  width: fit-content;
  height: 19px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: #6c7278;
`
const InputArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 90%;
  height: 46px;
  padding: 0 14px;
  background: #fff;
  border: 1px solid #edf1f3;
  box-shadow: 0 1px 2px rgba(228, 229, 231, 0.24);
  border-radius: 10px;
`
const Input = styled.input`
  flex: 1;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.01em;
  color: #1a1c1e;
  ::placeholder {
    color: #1a1c1e;
    opacity: 0.6;
  }
`
const EyeButton = styled.button`
  border: 0;
  background: transparent;
  width: 24px;
  height: 24px;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
`
const EyeIcon = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1.3px solid #acb5bb;
  border-radius: 999px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    inset: 3px 2px;
    border: 1.3px solid #acb5bb;
    border-radius: 999px;
  }
`
const ErrorMsg = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: red;
`
