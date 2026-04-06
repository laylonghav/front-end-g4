import { Minus, Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { useDispatch } from "react-redux";
import { addItemToCart, clearItemCart, decrementItemCart } from "@/store/cartSlice";

export default function CartCard({ data }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Card className={"p-2 flex flex-row  gap-2"}>
        <div className="w-20 h-20 rounded-xl overflow-hidden">
          <img className="w-full h-full" src={data?.image_url} alt="" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="font-bold">{data?.name}</p>
          <div className="flex flex-row gap-2 text-muted-foreground">
            <p>{data?.brand?.name}</p>|<p>{data?.category?.name}</p>|
            <p>
              {data?.status ? (
                <Badge
                  className={"text-white bg-blue-700"}
                  variant={"Secondary"}
                >
                  Active
                </Badge>
              ) : (
                <Badge variant={"destructive"}>Inactive</Badge>
              )}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Quantity : {data?.qty}</p>
            <button
              onClick={() => {
                dispatch(addItemToCart(data));
              }}
              className=" bg-gray-200 rounded transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              <Plus />
            </button>
            <button
              onClick={() => {
                dispatch(decrementItemCart(data));
              }}
              className=" bg-gray-200 rounded transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              <Minus />
            </button>
          </div>
        </div>
        <div className="">
          <button
            onClick={() => {
              dispatch(clearItemCart(data));
            }}
            className=" bg-gray-200 rounded transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          >
            <X />
          </button>
        </div>
      </Card>
    </div>
  );
}
