import styles from "./style.module.css";

export default function ProductCard({ data }) {
  return (
    <div className={styles.card}>
      {data?.image && (
        <div className={styles.wrap_image}>
          <img
            className={styles.image}
            src={data?.image}
            alt={`pic : ${data?.name}`}
          />
        </div>
      )}
      <div className={styles.name}>{data?.name}</div>
      <div className={styles.description}>{data?.description}</div>
      <div className={styles.wrap}>
        <div className={styles.qty}>Quantity: {data?.qty}</div>
        <div className={styles.price}>Price: ${data?.price}</div>
      </div>
      <button
        style={{
          padding: "1rem",
          fontSize: "18px",
          outline: "none",
          border: "none",
          borderRadius: "2rem",
          cursor: "pointer",
        }}
        className={styles.btn}
        onClick={() => data.btnAddToCard?.(data)}
      >
        Add to card
      </button>
    </div>
  );
}
