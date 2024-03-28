'use client';
import React from 'react';
import VEHeader from './VEHeader';
import InputField from './Input';
import VEButton from './VEButton';

const VEForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="bg-black rounded-2xl shadow-2xl p-8">
          <VEHeader />
          <form className="space-y-6">
            <InputField />
            <VEButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VEForm;