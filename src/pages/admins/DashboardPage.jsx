import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Button className={"bg-orange-500 hover:bg-amber-300 rounded-3xl cursor-pointer transition-all ease-in duration-300 hover:border-2 border-blue-500 hover:scale-105"}>Click me</Button>
    </div>
  );
}
