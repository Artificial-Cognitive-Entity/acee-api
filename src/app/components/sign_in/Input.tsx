const InputField: React.FC = () => {
  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-white text-center font-medium mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="mail@yourorg.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
      />
      <label htmlFor="password" className="block text-white text-center font-medium mb-2 mt-4">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
      />
    </div>
  );
};

export default InputField;