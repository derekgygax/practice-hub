"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export const User = () => {
  const { user, error, isLoading } = useUser();

  // You  MUST perform this check for isLoading
  // error and user BEFORE showing anything
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // if (user) {
  //   console.log(user);
  // }

  // You MUST check for user here!!
  // There is sensitive info you may NOT want to show
  return (
    user && (
      <div>
        <img src={user.picture ?? undefined} alt={user.name ?? undefined} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
