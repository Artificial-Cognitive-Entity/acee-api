'use client';
import React from 'react'
import PRHeader from './PRHeader'
import InputField from './Input'
//import Conditions from './Conditions'
import PRButton from './PRButton'

const PRForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="bg-black rounded-2xl shadow-2xl p-8">
          <PRHeader />
          <form className="space-y-6">
            <InputField />
            <PRButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PRForm;