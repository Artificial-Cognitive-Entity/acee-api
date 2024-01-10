import React from 'react'
import LoginHeader from './LoginHeader'
import InputField from './Input'
import Conditions from './Conditions'
import SignInButton from './signInButton'

const LoginForm = () => {
  return (
    <div className="container flex flex-col mx-auto rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
            <LoginHeader></LoginHeader>
            <InputField></InputField>
            <Conditions></Conditions>
              
             <SignInButton></SignInButton>

              {/* <p className="text-sm leading-relaxed text-grey-900">
                Not registered yet?{" "}
                <a href="javascript:void(0)" className="font-bold text-grey-700">
                  Create an Account
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}



export default LoginForm

