import React from 'react'
import LoginHeader from './LoginHeader'
import InputField from './Input'
import Conditions from './Conditions'
import SignInButton from './signInButton'

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <LoginHeader />
          </div>
          <form>
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