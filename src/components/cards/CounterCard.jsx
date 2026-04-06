import { useEffect, useState } from "react";

export default function CounterCard() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    console.log("Counter: ", counter);

    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div>
      <h1>{counter}</h1>
      <h1>Counter Card</h1>
    </div>
  );
}
