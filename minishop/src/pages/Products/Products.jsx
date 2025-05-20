import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Products.module.css";

const PRODUCTS_PER_PAGE = 12;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skip = (page - 1) * PRODUCTS_PER_PAGE;
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
        );
        const data = await response.json();
        setProducts(data.products);
        const uniqueCats = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCats);
        setTotal(data.total);
      } catch (error) {
        console.error("Fejl ved hentning af produkter:", error);
      }
    };

    fetchProducts();
  }, [page]);

  const getFilteredandSortedProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const sortedFilteredProducts = getFilteredandSortedProducts();

  const handleReset = () => {
    setSortBy("");
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <div className={styles.container}>
      <h1>Produkter</h1>

      <div className={styles.sorting}>
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterPanel
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

        <button className={styles.resetBtn} onClick={handleReset}>
          Nulstil
        </button>
      </div>
      <ProductList products={sortedFilteredProducts} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
