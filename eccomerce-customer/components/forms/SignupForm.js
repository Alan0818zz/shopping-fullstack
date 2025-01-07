'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signup } from '@/app/data/actions/auth-actions'
import styled from 'styled-components'

// 樣式組件
const FormContainer = styled.form`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74,144,226,0.2);
  }
`

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #357abd;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`

const ErrorList = styled.ul`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
`
const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 0.875rem;
`
export function SignupForm() {
  const [state, action] = useActionState(signup, undefined)

  return (
    
    <FormContainer action={action}>
        <FormHeader>
        <Title>註冊帳號</Title>
        <Subtitle>請填寫以下資料以創建您的帳號</Subtitle>
      </FormHeader>
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Doe" />
        {state?.errors?.name && <ErrorMessage>{state.errors.name}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
    <Label htmlFor="phone">手機號碼</Label>
    <Input 
        id="phone" 
        name="phone" 
        placeholder="0912345678"
        type="tel"
        pattern="09[0-9]{8}"
        />
        {state?.errors?.phone && <ErrorMessage>{state.errors.phone}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="john@example.com" />
        {state?.errors?.email && <ErrorMessage>{state.errors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
        {state?.errors?.password && (
          <div>
            <ErrorMessage>Password must:</ErrorMessage>
            <ErrorList>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ErrorList>
          </div>
        )}
      </FormGroup>
      
      <SubmitButton />
    </FormContainer>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {pending ? 'Signing up...' : 'Sign Up'}
    </Button>
  )
}