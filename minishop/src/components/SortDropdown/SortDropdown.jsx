import styles from "./SortDropDown.module.css";

export default function SortDropDown({ sortBy, setSortBy }) {
  return (
    <div className={styles.dropdown}>
      <label htmlFor="sort">Sortér efter:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Ingen</option>
        <option value="title">Title (A-Z)</option>
        <option value="price">Pris (lav til høj)</option>
        <option value="rating">Rating (høj til lav)</option>
      </select>
    </div>
  );
}
