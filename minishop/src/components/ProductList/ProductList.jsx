import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Fejl ved hentning af produkter:", error);
      }
    };

    fetchProducts();
  }, []);

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

  // funktion til at toggle status på favoritter
  const toggleFavorites = (id) => {
    //hvis film allerede er en favorit fjernes den fra listen
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      // Hvis film ikke er en favorit, tilføjes den til listen
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <ul className={styles.movieList}>
          {products.map((product) => (
            <li key={product.id} className={styles.item}>
              <img
                src={product.images}
                alt={product.title}
                className={styles.productImage}
              />
              <button onClick={() => navigate(`/products/${product.id}`)}>
                Read more
              </button>
              <button
                onClick={() => toggleFavorites(product.id)}
                className={styles.favoriteBtn}
              >
                {favorites.includes(product.id) ? "⭐" : "☆"} {product.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
