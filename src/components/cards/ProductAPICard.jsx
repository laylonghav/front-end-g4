export default function ProductAPICard({ data }) {
  //   console.log("Product Card: ", data);
  return (
    <div
      className={
        " bg-gray-100 p-5 rounded-2xl flex flex-col gap-1.5 shadow-2xl transition-all duration-300 hover:scale-105"
      }
    >
      {data?.images && <img className={""} src={data?.images} alt="" />}

      <div className={"font-bold text-xl"}>{data?.title}</div>
      <div className={""}>{data?.description}</div>
      <div className={"flex flex-row gap-1 justify-center"}>
        <div className={""}>Category: {data?.category}</div>|
        <div className={""}>Brand: {data?.brand}</div>|
        <div className={""}>{data?.availabilityStatus}</div>
      </div>
      <div className={"flex flex-row gap-1 justify-center"}>
        <div className={""}>Price: ${data?.price}</div>
        <div className={""}>Rating: {data?.rating}</div>
        <div className={""}>Stock: {data?.stock}</div>
      </div>
      <button
        onClick={() => data.btnDetail?.(data)}
        className={
          "p-2 bg-blue-600 rounded-2xl text-white text-xl hover:bg-blue-800 hover:cursor-pointer transition-all duration-300 hover:scale-105"
        }
      >
        Add to cart
      </button>
    </div>
  );
}
