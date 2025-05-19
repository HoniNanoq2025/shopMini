import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.module.css";
import ProductList from "./components/ProductList/ProductList";

export default function App() {
  return (
    <div>
      <ProductList />;
    </div>
  );
}
