import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/counterSlice";
import { logout } from "../../store/userSlice";

export default function HomePage() {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter.value);
  const user = useSelector((state) => state.user);
  return (
    <div>
      {/* <h1>{user?.email}</h1>
      <h1>{user?.password}</h1>

      <h1>{counter}</h1>
      <button
        className="p-2 bg-blue-600 rounded-2xl text-white text-xl hover:bg-blue-800 hover:cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
      <button
        className="p-2 bg-blue-600 rounded-2xl text-white text-xl hover:bg-blue-800 hover:cursor-pointer transition-all duration-300"
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <button
        className="p-2 bg-blue-600 rounded-2xl text-white text-xl hover:bg-blue-800 hover:cursor-pointer transition-all duration-300"
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button> */}
      <h1>Home Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2 border p-5 rounded-xl border-red-500 h-[800px]">
        <div className="bg-red-300    p-4 h-50  flex justify-center items-center text-2xl font-bold">
          Box 1
        </div>
        <div className="bg-blue-300 p-4 h-50  flex justify-center items-center text-2xl font-bold">
          Box 2
        </div>
        <div className="bg-green-300 p-4 h-50  flex justify-center items-center text-2xl font-bold">
          Box 3
        </div>
      </div>
    </div>
  );
}
