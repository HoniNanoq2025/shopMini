import { useForm } from "react-hook-form";
import styles from "./ContactFormRHF.module.css";

const ContactFormRHF = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Formular indsendt med React Hook Form:", data);
    alert("Tak for din besked! Vi vender tilbage hurtigst muligt.");
    reset(); // Nulstil formularen efter indsendelse
  };

  return (
    <form
      className={styles.contactForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className={styles.heading}>Kontakt MiniShop</h2>
      <input
        type="text"
        {...register("name", { required: "Navn er påkrævet" })}
        placeholder="Navn"
        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        aria-invalid={errors.name ? "true" : "false"}
      />
      {errors.name && (
        <p role="alert" className={styles.errors}>
          {errors.name.message}
        </p>
      )}
      <input
        type="email"
        {...register("email", {
          required: "Email er påkrævet",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
          message: "Ugyldig emailadresse",
        })}
        placeholder="Email"
        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && (
        <p role="alert" className={styles.errors}>
          {errors.email.message}
        </p>
      )}
      <textarea
        {...register("message", { required: "Skriv en besked" })}
        placeholder="Din besked..."
        name="message"
        id="message"
        className={`${styles.input} ${errors.message ? styles.inputError : ""}`}
        aria-invalid={errors.message ? "true" : "false"}
      />
      {errors.message && (
        <p role="alert" className={styles.errors}>
          {errors.message.message}
        </p>
      )}

      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
};

export default ContactFormRHF;
