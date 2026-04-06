import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

export default function PosCard({ data }) {
  return (
    <div className="">
      <Card className={"p-4 flex flex-col gap-2"}>

        <div className="w-full rounded-xl overflow-hidden">
          <img className="w-full h-full" src={data?.image_url} alt="" />
        </div>
        <div className="font-bold ">{data?.name}</div>
        <div className="flex gap-1 flex-col text-muted-foreground">
          <p>{data?.description}</p>
          <div className="flex flex-row gap-2 ">
            <strong>{data?.brand?.name}</strong>|
            <strong>{data?.category?.name}</strong>|
            <strong>
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
            </strong>
          </div>
          <div className="flex flex-row gap-2">
            <strong>Quantity : {data?.qty}</strong>|
            <strong>${data?.price}</strong>|<strong>{data?.discount}%</strong>
          </div>
        </div>
        <Separator />
        <div className="flex gap-1 flex-col">
          <Button onClick={() => data?.addToCart?.(data)}>Add to cart</Button>
          <Button>Detail</Button>
        </div>
      </Card>
    </div>
  );
}
