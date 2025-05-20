import styles from "./SearchFilter.module.css";

export default function SearchFilter({ searchTerm, setSearchTerm }) {
  return (
    <div className={styles.search}>
      <label htmlFor="search">Søg</label>
      <input
        type="text"
        id="search"
        placeholder="søg efter titel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
