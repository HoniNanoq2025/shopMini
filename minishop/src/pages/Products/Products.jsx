import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import styles from "./Products.module.css";
import Pagination from "../../components/Pagination/Pagination";

const PRODUCTS_PER_PAGE = 10;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (page - 1) * PRODUCTS_PER_PAGE;
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error("Fejl ved hentning af produkter:", error);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className={styles.container}>
      <h1>Produkter</h1>
      <ProductList products={products} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
