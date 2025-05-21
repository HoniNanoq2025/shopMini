import { useState, useEffect } from 'react';
import styles from './TopRatedProductSlider.module.css'; // Import your CSS styles

export default function TopRatedProductSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch products from the API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Sort products by rating (highest first) and take top 5
        const topRated = data.products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);

        setProducts(topRated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Navigate to previous slide
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Navigate to next slide
  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  if (loading) {
    return <div className={styles.loading}>Loading top products...</div>;
  }

  return (
    <div className={styles['product-slider']}>
      <h2 className={styles['slider-title']}>Top Rated Products</h2>
  
      <div className={styles['slider-container']}>
        {products.length > 0 && (
          <div className={styles['slide']}>
            <div className={styles['product-image']}>
              <img
                src={products[currentIndex]?.thumbnail}
                alt={products[currentIndex]?.title}
              />
              <span className={styles['product-rating']}>
                {products[currentIndex]?.rating} ★
              </span>
            </div>
  
            <div className={styles['product-info']}>
              <h3>{products[currentIndex]?.title}</h3>
              <p>{products[currentIndex]?.description}</p>
  
              <div className={styles['product-price']}>
                <span className={styles['discount-price']}>
                  $
                  {getDiscountedPrice(
                    products[currentIndex]?.price,
                    products[currentIndex]?.discountPercentage
                  )}
                </span>
                <span className={styles['original-price']}>
                  ${products[currentIndex]?.price}
                </span>
                <span className={styles['discount-tag']}>
                  {products[currentIndex]?.discountPercentage}% OFF
                </span>
              </div>
  
              <div className={styles['product-details']}>
                <p>
                  <strong>Category:</strong> {products[currentIndex]?.category}
                </p>
              </div>
            </div>
          </div>
        )}
  
        <button className={`${styles['nav-button']} ${styles['prev']}`} onClick={goToPrevious}>
          &#10094;
        </button>
        <button className={`${styles['nav-button']} ${styles['next']}`} onClick={goToNext}>
          &#10095;
        </button>
      </div>
  
      <div className={styles['slider-dots']}>
        {products.map((_, idx) => (
          <span
            key={idx}
            className={`${styles['dot']} ${currentIndex === idx ? styles['active'] : ""}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}