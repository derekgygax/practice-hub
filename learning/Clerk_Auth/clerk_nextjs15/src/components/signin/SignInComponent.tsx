"use client"

import { useSignUp, useSignIn } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export const SignInComponent = () => {
  const { isLoaded, signIn } = useSignIn()

  if (!isLoaded) {
    // Handle loading state
    return null
  }

  console.log(signIn);

  return (
    <div className='flex justify-center'>
      <SignIn />
    </div>
  )
}
