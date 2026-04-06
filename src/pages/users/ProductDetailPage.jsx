import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchingData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data) {
      setProduct(data?.products);
    }
    console.log("API Product: ", data);
  };

  const productDetail = product.find((item, index) => item?.id == id);
  console.log("Detail product: ", productDetail);

  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <div>
      <button
        style={{
          padding: "1rem",
          fontSize: "18px",
          outline: "none",
          border: "none",
          borderRadius: "1rem",
          backgroundColor: "yellow",
          color: "red",
          cursor: "pointer",
         
        }}
        onClick={() => {
          navigate("/product");
        }}
      >
        Back
      </button>
      <h1>Title: {productDetail?.title}</h1>
      <h1>Product Detail Page</h1>
    </div>
  );
}
