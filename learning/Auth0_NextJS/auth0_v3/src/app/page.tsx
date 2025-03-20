import { User } from "@/components/user/User";
import styles from "./page.module.scss";

import { getSession, getAccessToken } from '@auth0/nextjs-auth0';

export default async function Home() {

  // Get the session
  const session = await getSession();
  console.log(session);
  if (session) {
    console.log(await getAccessToken() ?? "NO NON O");
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!session ? (
          <div>
            <a href="/api/auth/login">Login</a>
          </div>
        ) : (
          <>
            <div>
              <a href="/api/auth/logout">Logout</a>
            </div>
            <User />
          </>
        )}
      </main>
    </div>
  );
}