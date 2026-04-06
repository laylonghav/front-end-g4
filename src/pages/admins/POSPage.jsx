import CartCard from "@/components/cards/CartCard";
import CheckOutCard from "@/components/cards/CheckOutCard";
import PosCard from "@/components/cards/PosCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addItemToCart, clearAllItemCart } from "@/store/cartSlice";
import { setRefresh } from "@/store/refreshSlice";
import { request } from "@/utils/helper/request";
import { Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function POSPage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  // For search
  const [query, setQuery] = useState("");

  const fetchingData = async () => {
    setLoading(true);
    const res = await request("product", "get");
    if (res) {
      setLoading(false);
      setProduct(res?.data);
      console.log("Res Api: ", res);
    }
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const refresh = useSelector((state) => state.refresh.value);

  useEffect(() => {
    fetchingData();
    if (refresh) {
      fetchingData();
      dispatch(setRefresh(false));
    }
  }, [refresh, useSelector]);

  const addToCart = (itemAddToCard) => {
    console.log("Item add to card: ", itemAddToCard);
    dispatch(addItemToCart(itemAddToCard));
  };

  const totalItem = cart.reduce((accc, item) => accc + item?.qty, 0);

  return (
    <div>
      <div className="flex flex-row gap-3 items-center">
        <h1>Product Page</h1>
        <div className="">
          <Input
            value={query}
            placeholder="search brand"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Button
          onClick={async () => {
            setLoading(true);
            const res = await request(`product/search/?q=${query}`);
            if (res) {
              setLoading(false);
              console.log("Search Product : ", res);
              // New Category data to render on Table
              setProduct(res?.data);
            }
          }}
        >
          <Search />
        </Button>

        <Button
          onClick={() => {
            // Set all category data ot render on Table
            fetchingData();
            setQuery("");
          }}
        >
          <SearchSlash />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-7">
        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {loading ? (
            <div className="flex justify-center items-center mt-20 col-span-3">
              <Spinner className={"size-15"} />
            </div>
          ) : (
            <>
              {product?.map((item, index) => (
                <PosCard
                  data={{ ...item, addToCart: () => addToCart(item) }}
                  key={index}
                />
              ))}
            </>
          )}
        </div>
        <div className="col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2>Item cart: {totalItem}</h2>
            <Button
              onClick={() => {
                dispatch(clearAllItemCart());
              }}
            >
              <Trash />
            </Button>
          </div>
          {Array.isArray(cart) && cart.length ? (
            <div className="flex flex-col gap-3">
              {cart?.map((item, index) => (
                <CartCard key={index} data={item} />
              ))}
            </div>
          ) : (
            <div>
              <h1 className="text-muted-foreground text-center mt-5">
                No data
              </h1>
            </div>
          )}

          <div className="mt-5">
            <CheckOutCard data={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
