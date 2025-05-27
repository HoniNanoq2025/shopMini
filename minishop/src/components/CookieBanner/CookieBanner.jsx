import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./CookieBanner.module.css";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 90 }); // Expires in 90 days
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set("cookieConsent", "declined", { expires: 90 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <p className={styles.message}>
        Vi bruger cookies for at forbedre din oplevelse. Ved at fortsætte med at
        benytte vores side, accepterer du vores brug af cookies i 90 dage
      </p>
      <div className={styles.cookieButtons}>
        <button className={styles.acceptBtn} onClick={handleAccept}>
          Acceptér
        </button>
        <button className={styles.declineBtn} onClick={handleDecline}>
          Afvis
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
