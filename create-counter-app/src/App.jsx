import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  const addFunc = () => {
    if (counter < 20) setCounter(counter + 1);
  };

  const subFunc = () => {
    if (counter > 0) setCounter(counter - 1);
  };

  return (
    <>
      <h1>Counter Application</h1>
      <h2>Counter : {counter}</h2>
      <span>
        <button onClick={addFunc}>Increase</button>
        <button onClick={subFunc}>Decrease</button>
      </span>
    </>
  );
}

export default App;
