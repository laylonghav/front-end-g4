import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MasterLayout() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user || !user?.email) {
  //     return navigate("/auth/login");
  //   }
  // }, [user, useSelector]);

  // if (!user || !user?.email) {
  //   return null;
  // }

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
