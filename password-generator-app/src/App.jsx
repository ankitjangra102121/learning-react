import { use } from "react";
import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowSymbols, setAllowSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumbers) str += "0123456789";
    if (allowSymbols) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPassword(pass);
  }, [length, allowNumbers, allowSymbols]);

  const copyPassToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(password);
    }
  };

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 text-center p-5">
        <h1 className="text-white text-center mt-0 my-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700"
            // when i click on the copy button then it alert the user that the password is copied to clipboard. how to do that-
            onClick={() => {
              copyPassToClipboard();
              alert("Password copied to clipboard!");
            }}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1"></div>
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex flex-around mt-4 gap-x-4">
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={allowNumbers}
              id="numberInput"
              onChange={() => setAllowNumbers((prev) => !prev)}
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={allowSymbols}
              id="symbolInput"
              onChange={() => setAllowSymbols((prev) => !prev)}
            />
            <label htmlFor="symbolInput">Include Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
