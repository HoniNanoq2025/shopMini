import {useRef, useEffect, use} from 'react';
import styles from './FormWithFocus.module.css';

const FormWithFocus = () => {
    const emailRef = useRef(null);
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleFocusClick = () => {
        emailRef.current.focus();
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <label htmlFor="name">Navn</label>
                <input type="text" id='name' name='name' className={styles.input} />
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' ref={emailRef} className={styles.input} />
                <label htmlFor="message">Besked</label>
                <textarea name="message" id="message" rows={4} className={styles.textarea}></textarea>
                <button type='submit' className={styles.submitBtn}>Send</button>
            </form>

            <button onClick={handleFocusClick} className={styles.focusBtn}>Gå til email</button>
        </div>
    )
}

export default FormWithFocus;