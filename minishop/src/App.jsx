import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}
