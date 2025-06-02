import styles from "./Contact.module.css";
import ContactFormRHF from "../../components/ContactFormRHF/ContactFormRHF";

export default function Contact() {
  return (
    <div className={styles.contactContainer}>
      <ContactFormRHF />
    </div>
  );
}
