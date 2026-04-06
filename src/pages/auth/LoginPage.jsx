import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setToken } from "@/store/tokenSlice";
import { request } from "@/utils/helper/request";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [validate, setValidate] = useState({});
  async function onLogin(e) {
    e.preventDefault();
    try {
      const res = await request("login", "post", data);

      if (res?.error) {
        if (res?.errors) {
          setValidate(res?.errors);
        }
        return;
      }
      if (res) {
        console.log("Logged in : ", res);
        navigate("/");
        dispatch(setUser(res?.user));
        dispatch(setToken(res?.token));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={onLogin}
        className="w-[400px] bg-gray-100 rounded-xl p-4 flex flex-col gap-5"
      >
        <h1 className="font-bold text-xl text-center">Login</h1>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Email</Label>
            <Input
              type={"email"}
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Email"
              reqired
            />
            {validate?.email && (
              <p className="text-red-500">{validate?.email[0]}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Password</Label>
            <Input
              type={"password"}
              value={data?.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Password"
              reqired
            />
            {validate?.password && (
              <p className="text-red-500">{validate?.password[0]}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit">Login</Button>
          <Button variant="outline">Cancel</Button>
        </div>
        <div className=" text-center">
          <span>I don't have an account </span>
          <NavLink
            to={"/auth/register"}
            className={"text-blue-600 hover:underline"}
          >
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}
