import styles from "./FilterPanel.module.css";

export default function FilterPanel({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className={styles.category}>
      <label htmlFor="category">Kategori</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Alle</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
