import React from 'react'

const SignInButton: React.FC = () => {
  return (
    <button className="w-full py-2 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
      Sign In
    </button>
  );
};

export default SignInButton;