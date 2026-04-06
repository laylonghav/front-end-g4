import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { clearAllItemCart } from "@/store/cartSlice";
import { request } from "@/utils/helper/request";
import { setRefresh } from "@/store/refreshSlice";

export default function CheckOutCard({ data }) {
  const [remark, setRemark] = useState("");
  const [paid_amount, setPaidAmount] = useState("");
  const [payment_method, setPaymentMethod] = useState("");

  const totalItem = data?.reduce((acc, item) => acc + item?.qty, 0);
  const totalOreginal = data?.reduce(
    (acc, item) => acc + Number(item?.qty) * Number(item?.price),
    0,
  );
  const totalDiscount = data
    ?.reduce(
      (acc, item) =>
        acc +
        ((Number(item?.price) * Number(item?.discount)) / 100) *
          Number(item?.qty),
      0,
    )
    .toFixed(2);

  const total = totalOreginal - totalDiscount;

  const dispatch = useDispatch();

  const onCheckout = async () => {
    const payload = {
      total_amount: total,
      paid_amount: paid_amount,
      remark: remark,
      payment_method: payment_method,
      detail: data?.map((item) => ({
        price: item?.price,
        qty: item?.qty,
        product_id: item?.id,
        discount: item?.discount,
        total:
          Number(item?.qty) * Number(item?.price) -
          ((Number(item?.price) * Number(item?.discount)) / 100) *
            Number(item?.qty),
      })),
    };

    console.log("Data payload : ", payload);

    const res = await request("order", "post", payload);
    if (res) {
      console.log("Order created : ", res);
      setPaidAmount("");
      setRemark("");
      dispatch(clearAllItemCart());
       dispatch(setRefresh(true));
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between border-b">
        <p>Item : </p>
        <p>{totalItem}</p>
      </div>
      <div className="flex justify-between border-b">
        <p>Total oreginal : </p>
        <p>${totalOreginal}</p>
      </div>
      <div className="flex justify-between border-b">
        <p>Total discount : </p>
        <p>${totalDiscount}</p>
      </div>
      <div className="flex justify-between border-b">
        <p>Total : </p>
        <p>${total}</p>
      </div>
      <div className="flex justify-between gap-2 border-b ">
        <Input
          className={"mb-1"}
          value={paid_amount}
          onChange={(e) => setPaidAmount(e.target.value)}
          placeholder="Paid amount"
        />

        <Select
          value={payment_method}
          onValueChange={(value) => setPaymentMethod(value)}
        >
          <SelectTrigger className={"w-full mb-1"}>
            <SelectValue placeholder="Pls select Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ABA">ABA</SelectItem>
            <SelectItem value="AC">AC</SelectItem>
            <SelectItem value="Wing">Wing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        placeholder="remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant={"outline"} onClick={onCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
