import ProductList from "../../components/ProductList/ProductList";
import styles from "./Products.module.css";

export default function Products() {
  return (
    <div className={styles.container}>
      <h1>Produkter</h1>
      <ProductList />
    </div>
  );
}
