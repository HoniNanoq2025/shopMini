import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductList.module.css";

export default function ProductList({ products }) {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Fejl ved parsing af gemte favoritter:", error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to toggle favorites status
  const toggleFavorites = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div className={styles.card} key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h2>{product.title}</h2>
          <div className={styles.details}>
            <span>💰 {product.price} DKK</span>
            <span>⭐ {product.rating}</span>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => navigate(`/products/${product.id}`)}>
              Read more
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorites(product.id);
              }}
              className={styles.favoriteBtn}
            >
              {favorites.includes(product.id) ? "❤️ Liked" : "🤍 Like"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
