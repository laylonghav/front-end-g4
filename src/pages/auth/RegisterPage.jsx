import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { request } from "@/utils/helper/request";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
    role: "user",
  });
  async function onRegister(e) {
    e.preventDefault();
    try {
      const res = await request("register", "post", {
        ...data,
        password_confirmation: data?.password,
      });
      console.log("Res api: ", res);

      if (res?.error) {
        if (res?.errors) {
          setValidate(res?.errors);
        }
        return;
      }
      if (res) {
        console.log("Register in : ", res);
        navigate("/auth/login");
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
        onSubmit={onRegister}
        className="w-[400px] bg-gray-100 rounded-xl p-4 flex flex-col gap-5"
      >
        <h1 className="font-bold text-xl text-center">Register</h1>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Username</Label>
            <Input
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Username"
              reqired
            />
          </div>
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
          <Button type="submit">Register</Button>
          <Button variant="outline">Cancel</Button>
        </div>
        <div className=" text-center">
          <span>I already have an account ? </span>
          <NavLink
            to={"/auth/login"}
            className={"text-blue-600 hover:underline"}
          >
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}
