"use client"

import { CreateOrganization, UserButton, UserProfile, useUser } from "@clerk/nextjs";

export const User = () => {

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  if (user) {
    return (
      <div>
        <div>Hello {user.firstName}</div>
        <CreateOrganization />
      </div>
    )
  }
}
