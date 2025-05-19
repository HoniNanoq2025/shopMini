import {useState, useEffect} from "react";
import styles from "./FilterPanel.module.css";

export default function FilterPanel() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("title");
}