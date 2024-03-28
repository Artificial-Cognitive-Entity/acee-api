'use client';
import React, { FormEvent } from 'react';
import LoginHeader from './LoginHeader';
import InputField from './Input';
import Conditions from './Conditions';
import SignInButton from './signInButton';
import { signIn } from 'next-auth/react';

const LoginForm: React.FC = () => {
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
    <div className="flex items-center justify-center min-h-screen bg-black pt-0">
      <div className="w-full max-w-md">
        <div className="rounded-2xl shadow-2xl p-8 mt-[-4rem]"> {/* Adjust the mt-[value] as needed */}
          <div className="mb-8">
            <LoginHeader />
          </div>
          <form onSubmit={handleSubmit}>
            <InputField />
            <Conditions />
            <SignInButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;