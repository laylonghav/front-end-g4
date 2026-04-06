import "./style.css";
import styles from "./style.module.css";

const GreetingCard = ({ data }) => {
  return (
    <div>
      {data && (
        <h1 className="text">
          My name is {data?.name}. I'm {data?.age} old. My major {data?.major}.
        </h1>
      )}

      <h1 className={styles.text_welcome}>Hello world !</h1>
    </div>
  );
};

export default GreetingCard;
