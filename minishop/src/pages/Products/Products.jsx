import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Products.module.css";

// Antal produkter der vises per side
const PRODUCTS_PER_PAGE = 8;

export default function Products() {
  // State variabler
  const [allProducts, setAllProducts] = useState([]); // Gemmer alle produkter
  const [displayedProducts, setDisplayedProducts] = useState([]); // Produkter der vises på nuværende side
  const [sortBy, setSortBy] = useState(""); // Sorteringsparameter
  const [searchTerm, setSearchTerm] = useState(""); // Søgeterm
  const [selectedCategory, setSelectedCategory] = useState(""); // Valgt kategori
  const [categories, setCategories] = useState([]); // Liste over alle kategorier
  const [page, setPage] = useState(1); // Nuværende sidenummer
  const [loading, setLoading] = useState(true); // Indlæsning status

  // Henter alle produkter én gang når komponenten indlæses
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        // Henter alle produkter (eller en rimelig stor mængde)
        const response = await fetch(
          "https://dummyjson.com/products?limit=200"
        );
        const data = await response.json();

        setAllProducts(data.products || []);

        // Udtrækker unikke kategorier fra produkterne
        const uniqueCats = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Fejl ved hentning af produkter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Anvender filtre og paginering når filtre eller side ændres
  useEffect(() => {
    // Anvender filtre først
    let filtered = [...allProducts];

    // Filtrerer efter kategori hvis en er valgt
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtrerer efter søgeterm hvis der er indtastet en
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Anvender sortering
    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title)); // Alfabetisk efter titel
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price); // Stigende efter pris
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating); // Faldende efter rating
    }

    // Anvender paginering - udskærer de filtrerede produkter for den aktuelle side
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(filtered.slice(startIndex, endIndex));

    // Hvis nuværende side er ugyldig, nulstil til side 1
    if (page > 1 && startIndex >= filtered.length) {
      setPage(1);
    }
  }, [allProducts, selectedCategory, searchTerm, sortBy, page]);

  // Beregner det totale antal produkter efter filtrering
  const totalFilteredItems = allProducts.filter((product) => {
    let matchesCategory = true;
    let matchesSearch = true;

    if (selectedCategory) {
      matchesCategory = product.category === selectedCategory;
    }

    if (searchTerm.trim()) {
      matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return matchesCategory && matchesSearch;
  }).length;

  // Beregner det totale antal sider baseret på filtrerede produkter
  const totalPages = Math.max(
    1,
    Math.ceil(totalFilteredItems / PRODUCTS_PER_PAGE)
  );

  // Nulstiller alle filtre og sortering
  const handleReset = () => {
    setSortBy("");
    setSearchTerm("");
    setSelectedCategory("");
    setPage(1);
  };

  // Når kategori ændres, gå tilbage til side 1
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  // Når søgeterm ændres, gå tilbage til side 1
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>Produkter</h1>

      {/* Filter og sorteringssektion */}
      <div className={styles.sorting}>
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
        />
        <FilterPanel
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

        <button className={styles.resetBtn} onClick={handleReset}>
          Nulstil
        </button>
      </div>

      {/* Betinget rendering baseret på loading status og resultater */}
      {loading ? (
        <div className={styles.loading}>Indlæser produkter...</div>
      ) : displayedProducts.length > 0 ? (
        <>
          {/* Viser produktlisten og paginering hvis der er resultater */}
          <ProductList products={displayedProducts} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className={styles.noResults}>Ingen produkter fundet</div>
      )}
    </div>
  );
}
