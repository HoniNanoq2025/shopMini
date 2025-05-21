import { useState, useEffect } from "react";
import styles from "./TopRatedProductSlider.module.css"; // Importerer CSS-stilarter

export default function TopRatedProductSlider() {
  // Tilstandsvariabler til at håndtere produkter, indlæsningsstatus og den aktuelle visningsindeks
  const [products, setProducts] = useState([]); // Gemmer alle produkter
  const [loading, setLoading] = useState(true); // Kontrollerer indlæsningstilstand
  const [currentIndex, setCurrentIndex] = useState(0); // Holder styr på hvilket produkt der vises

  // useEffect krog der henter produkter når komponenten mountes
  useEffect(() => {
    // Henter produktdata fra dummyjson API
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Sorterer produkter efter bedømmelse (højeste først) og tager de 5 bedste
        const topRated = data.products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);

        setProducts(topRated); // Opdaterer produkttilstanden med de sorterede produkter
        setLoading(false); // Markerer indlæsning som fuldført
      })
      .catch((error) => {
        console.error("Error fetching products:", error); // Logger fejl hvis API-kaldet mislykkes
        setLoading(false); // Stopper indlæsningsstatus selvom der opstod en fejl
      });
  }, []); // Tom afhængighedsarray betyder, at dette kun køres ved første rendering

  // Funktion til at navigere til forrige slide i karousellen
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex); // Opdaterer indekset, med omløb fra første til sidste element
  };

  // Funktion til at navigere til næste slide i karousellen
  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex); // Opdaterer indekset, med omløb fra sidste til første element
  };

  // Hjælpefunktion til at beregne den nedsatte pris baseret på original pris og rabatprocent
  const getDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2); // Returnerer prisen med to decimaler
  };

  // Viser en indlæsningsbesked mens data hentes
  if (loading) {
    return <div className={styles.loading}>Loading top products...</div>;
  }

  // Hovedrenderingslogik for produktslider
  return (
    <div className={styles["product-slider"]}>
      <h2 className={styles["slider-title"]}>Top Rated Products</h2>

      <div className={styles["slider-container"]}>
        {products.length > 0 && (
          <div className={styles["slide"]}>
            {/* Visning af produktbillede og bedømmelse */}
            <div className={styles["product-image"]}>
              <img
                src={products[currentIndex]?.thumbnail}
                alt={products[currentIndex]?.title}
              />
              <span className={styles["product-rating"]}>
                {products[currentIndex]?.rating} ★
              </span>
            </div>

            {/* Visning af produktinformation */}
            <div className={styles["product-info"]}>
              <h3>{products[currentIndex]?.title}</h3>
              <p>{products[currentIndex]?.description}</p>

              {/* Prisvisning med original pris, rabat og nedsat pris */}
              <div className={styles["product-price"]}>
                <span className={styles["discount-price"]}>
                  $
                  {getDiscountedPrice(
                    products[currentIndex]?.price,
                    products[currentIndex]?.discountPercentage
                  )}
                </span>
                <span className={styles["original-price"]}>
                  ${products[currentIndex]?.price}
                </span>
                <span className={styles["discount-tag"]}>
                  {products[currentIndex]?.discountPercentage}% OFF
                </span>
              </div>

              {/* Visning af produktkategori */}
              <div className={styles["product-details"]}>
                <p>
                  <strong>Category:</strong> {products[currentIndex]?.category}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigationsknapper til forrige og næste produkt */}
        <button
          className={`${styles["nav-button"]} ${styles["prev"]}`}
          onClick={goToPrevious}
        >
          &#10094; {/* HTML-entitet for venstre vinkel-bøjet parentes */}
        </button>
        <button
          className={`${styles["nav-button"]} ${styles["next"]}`}
          onClick={goToNext}
        >
          &#10095; {/* HTML-entitet for højre vinkel-bøjet parentes */}
        </button>
      </div>

      {/* Navigationsprikker i bunden til at vise position og give direkte navigation */}
      <div className={styles["slider-dots"]}>
        {products.map((_, idx) => (
          <span
            key={idx}
            className={`${styles["dot"]} ${
              currentIndex === idx ? styles["active"] : ""
            }`}
            onClick={() => setCurrentIndex(idx)} // Skifter direkte til det valgte produkt
          />
        ))}
      </div>
    </div>
  );
}
