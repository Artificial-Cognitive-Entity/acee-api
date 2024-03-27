import React from 'react'

const InputField = () => {
  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="mail@yourorg.com"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="password" className="block text-gray-700 font-medium mb-2 mt-4">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default InputField