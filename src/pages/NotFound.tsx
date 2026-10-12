import Button from "../components/common/Button";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <p className="eyebrow">ERROR · 404</p>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>
          This page isn&apos;t <span className="text-orange">on the map.</span>
        </h2>
        <p className={styles.lede}>
          The link may be out of date, or the page may have been renamed. Try one
          of the directions below.
        </p>
        <div className={styles.actions}>
          <Button as="link" to="/" variant="primary" size="lg" withArrow>
            Back to the home
          </Button>
          <Button as="link" to="/work" variant="secondary" size="lg" withArrow>
            See the work
          </Button>
        </div>
      </div>
    </div>
  );
}
