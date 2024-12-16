'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/action/auth'
import styled from 'styled-components'
import Link from 'next/link'

const FormContainer = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74,144,226,0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: "⚠️";
    font-size: 0.9rem;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #357abd;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorList = styled.ul`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  list-style-type: none;

  li {
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: "•";
      color: #dc3545;
    }
  }
`

const FormHeader = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <FormContainer action={action}>
      <FormHeader>
        <Title>創建帳號</Title>
        <Subtitle>
          加入我們的會員，享受更多優惠與服務
        </Subtitle>
      </FormHeader>

      <FormGroup>
        <Label htmlFor="name">姓名</Label>
        <Input 
          id="name" 
          name="name" 
          placeholder="請輸入您的姓名" 
          autoComplete="name"
        />
        {state?.errors?.name && <ErrorMessage>{state.errors.name}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">電子郵件</Label>
        <Input 
          id="email" 
          name="email" 
          type="email"
          placeholder="請輸入您的電子郵件" 
          autoComplete="email"
        />
        {state?.errors?.email && <ErrorMessage>{state.errors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">密碼</Label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          placeholder="請設定密碼"
          autoComplete="new-password"
        />
        {state?.errors?.password && (
          <div>
            <ErrorMessage>密碼必須符合以下條件：</ErrorMessage>
            <ErrorList>
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ErrorList>
          </div>
        )}
      </FormGroup>
      
      <SubmitButton />

      <Footer>
        已經有帳號了？
        <Link href="/login">立即登入</Link>
      </Footer>
    </FormContainer>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {pending ? '註冊中...' : '立即註冊'}
    </Button>
  )
}