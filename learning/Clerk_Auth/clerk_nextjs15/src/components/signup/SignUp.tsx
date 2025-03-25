"use client"

import { useSignUp } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export const SignUpComponent = () => {
  const { isLoaded, signUp } = useSignUp()

  if (!isLoaded) {
    // Handle loading state
    return null
  }

  console.log(signUp);

  return (
    <div className='flex justify-center'>
      <SignUp />
    </div>
  )
}
