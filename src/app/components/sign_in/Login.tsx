'use client'
import React , { FormEvent }  from 'react'
import LoginHeader from './LoginHeader'
import InputField from './Input'
import Conditions from './Conditions'
import SignInButton from './signInButton'
import { signIn } from 'next-auth/react'

const LoginForm = () => {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData.get("email"));
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
    });

    console.log({ response });
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <LoginHeader />
          </div>
          <form   onSubmit={handleSubmit}>
            <InputField />
            <Conditions />
            <SignInButton />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Not registered yet?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create an Account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm