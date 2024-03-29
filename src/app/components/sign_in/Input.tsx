const InputField: React.FC = () => {
  return (
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-white text-center font-medium mb-2"
      >
        Email
      </label>
      <input
        required
        type="email"
        id="email"
        name="email"
        placeholder="mail@yourorg.com"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
      />
      <label
        htmlFor="password"
        className="block text-white text-center font-medium mb-2 mt-4"
      >
        Password
      </label>
      <input
        required
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
