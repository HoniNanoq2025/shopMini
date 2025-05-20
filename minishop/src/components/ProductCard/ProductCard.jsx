import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({ toggleFavorites, favorites }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fejl ved hentning af produkt:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.price}>{product.price} DKK</p>
      <div className={styles.description}>
        <p>{product.description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => toggleFavorites(product.id)}
          className={styles.favoriteBtn}
        >
          {favorites.includes(product.id) ? "❤️ Liked" : "🤍 Like"}
        </button>
      </div>
    </div>
  );
}
