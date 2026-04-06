import { useEffect, useState } from "react";
import ProductAPICard from "../../components/cards/ProductAPICard";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const fetchingData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data) {
      setProduct(data?.products);
    }
    console.log("API Product: ", data);
  };

  function btnDetail(item) {
    alert(item?.id);
    console.log("Item card: ", item?.id);
    navigate(`/product/${item?.id}`);
  }

  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <div>
      <h1>Product Page</h1>
      <div className="p-8 flex justify-center">
        {/* <h1>{product[0]?.title}</h1>
      <h1 style={{color:"red"}}>{product[0]?.description}</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 w-[1300px]">
          {product?.map((item, index) => (
            <ProductAPICard
              key={index}
              index={index}
              data={{ ...item, btnDetail: () => btnDetail(item) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
