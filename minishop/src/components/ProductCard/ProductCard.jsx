import styles from "./ProductCard.module.css";

export default function ProductCard({ product, toggleFavorites, favorites }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.price}>{product.price} DKK</p>
      <button
        onClick={() => toggleFavorites(movie.id)}
        className={styles.favoriteBtn}
      >
        {favorites.includes(movie.id) ? "⭐" : "☆"} {movie.title}
      </button>
    </div>
  );
}
