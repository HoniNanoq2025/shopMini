import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
