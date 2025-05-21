import FormWithFocus from "../../components/FormWithFocus/FormWithFocus";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <h2>Om MiniShop</h2>
      <p>
        MiniShop er en moderne og alsidig butik. Her finder du et bredt udvalg
        af varer - lige fra dagligvarer og tøj til elektronik, boligartikler og
        legetøj - alt sammen under ét tag. MiniShop fokuserer på gode priser,
        høj kvalitet og en nem indkøbsoplevelse for hele familien. Det er det
        ideelle sted til både hverdagens behov og større indkøb.
      </p>
      <div className={styles.contact}>
        <p>Kontakt os for mere information</p>
      </div>
      <FormWithFocus />
      <p>
        <em>Vi værdsætter dit feedback og dine henvendelser.</em>
      </p>
    </div>
  );
}
