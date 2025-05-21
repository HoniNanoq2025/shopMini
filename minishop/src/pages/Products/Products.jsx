import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Products.module.css";

const PRODUCTS_PER_PAGE = 12;

export default function Products() {
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch all products once on initial load
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        // Fetch all products (or a reasonably large number)
        const response = await fetch(
          "https://dummyjson.com/products?limit=200"
        );
        const data = await response.json();

        setAllProducts(data.products || []);

        // Extract unique categories from products
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

  // Apply filters and pagination whenever filters or page changes
  useEffect(() => {
    // Apply filters first
    let filtered = [...allProducts];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Apply pagination - slice the filtered products for current page
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    setDisplayedProducts(filtered.slice(startIndex, endIndex));

    // If current page is now invalid, reset to page 1
    if (page > 1 && startIndex >= filtered.length) {
      setPage(1);
    }
  }, [allProducts, selectedCategory, searchTerm, sortBy, page]);

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

  const totalPages = Math.max(
    1,
    Math.ceil(totalFilteredItems / PRODUCTS_PER_PAGE)
  );

  const handleReset = () => {
    setSortBy("");
    setSearchTerm("");
    setSelectedCategory("");
    setPage(1);
  };

  // When changing filters, go back to page 1
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>Produkter</h1>

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

      {loading ? (
        <div className={styles.loading}>Indlæser produkter...</div>
      ) : displayedProducts.length > 0 ? (
        <>
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
