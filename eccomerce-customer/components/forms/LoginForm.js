'use client'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { useEffect } from 'react'  // 添加這行
import { loginAction } from '@/app/data/actions/auth-actions'
import { useRouter } from 'next/navigation'  // 添加這行
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

export function SigninForm() {
  const router = useRouter()  // 添加這行
  const [state, action] = useActionState(loginAction, undefined)
  
  useEffect(() => {
    if (state?.success) {
      router.push('/')
    }
  }, [state, router])
  return (
    <FormContainer action={action}>
      <FormHeader>
        <Title>會員登入</Title>
        <Subtitle>
          歡迎回來！請登入您的帳號
        </Subtitle>
      </FormHeader>

      <FormGroup>
        <Label htmlFor="email">電子郵件</Label>
        <Input 
          id="email" 
          name="email" 
          type="text"
          placeholder="請輸入您的電子郵件" 
          autoComplete="email"
        />
        {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">密碼</Label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          placeholder="請輸入密碼"
          autoComplete="current-password"
        />
      </FormGroup>
      
      <SubmitButton />

      <Footer>
        還沒有帳號？
        <Link href="/signup">立即註冊</Link>
      </Footer>
    </FormContainer>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {pending ? '登入中...' : '登入'}
    </Button>
  )
}

