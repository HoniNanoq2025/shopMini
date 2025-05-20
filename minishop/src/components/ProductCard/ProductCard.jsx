import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductCard.module.css";

export default function ProductCard({ toggleFavorites, favorites }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
      <h2 className={styles.title}>{product.title}</h2>
      <div className={styles.details}>
        <span>💰 {product.price} DKK</span>
        <span>⭐ {product.rating}</span>
      </div>
      <div className={styles.description}>
        <p>{product.description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => toggleFavorites(product.id)}
          className={styles.favoriteBtn}
        >
          {favorites && favorites.includes(product.id) ? "❤️ Liked" : "🤍 Like"}
        </button>
      </div>
    </div>
  );
}
