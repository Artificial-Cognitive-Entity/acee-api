'use client';
import React, { useState } from 'react';

const Conditions: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="text-sm text-white">
          Remember me
        </label>
      </div>
      <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
        Forgot password?
      </a>
    </div>
  );
};

export default Conditions;