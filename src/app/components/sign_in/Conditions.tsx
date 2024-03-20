'use client'
import React, { useState } from 'react'

const Conditions = () => {
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2 focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="text-sm text-gray-700">
          Remember me
        </label>
      </div>
      <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
        Forgot password?
      </a>
    </div>
  )
}

export default Conditions
