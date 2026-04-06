import { useSelector } from "react-redux";
import MasterLayout from "../../components/layouts/MasterLayout";

export default function AboutPage() {
  const counter = useSelector((state) => state.counter.value);
  return (
    <div>
      <h1>{counter}</h1>
      <h1>About Page</h1>
    </div>
  );
}
