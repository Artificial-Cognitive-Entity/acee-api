import React from 'react'

const signInButton = () => {
  return (
    <button className="
    w-full px-6 py-5 mb-5  font-bold leading-none transition duration-300 md:w-96 rounded-2xl group hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500
    relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm text-gray-900 bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Sign in
    </span>
  </button>
  )
}

export default signInButton