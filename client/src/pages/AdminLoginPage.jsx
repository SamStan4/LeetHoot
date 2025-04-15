import { useState } from "react";
import { hostLogin } from "@utility/api";

export default function AdminLoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  {/** can you add the error text to the login? */}

  const handleLogin = async () => {
    const result = await hostLogin(userName, password);
    if (!result) {
      setErrorText("unable to login");
      return;
    }
    // other logic i will write later
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="w-[350px] p-6 bg-[#212526] rounded-[20px] border-[1px] border-[#87898A] flex flex-col gap-4"
      >
        <h2
          className="text-2xl font-semibold text-center text-[#FFFFFF]"
        >
          Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="text-[#FFFFFF] px-4 py-2 rounded-[20px] border-[1px] border-[#87898A] focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="text-[#FFFFFF] px-4 py-2 rounded-[20px] border-[1px] border-[#87898A] focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorText && (
          <p className="text-red-500 text-sm text-center">{errorText}</p>
        )}
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}