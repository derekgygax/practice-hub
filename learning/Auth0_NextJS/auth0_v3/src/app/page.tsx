import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <a href="/api/auth/login">Login</a>
        </div>
        <div>
          <a href="/api/auth/logout">Logout</a>
        </div>
      </main>
    </div>
  );
}
