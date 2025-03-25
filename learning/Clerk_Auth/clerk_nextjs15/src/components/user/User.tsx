// 'use client';

// import { useUser, useSession } from '@clerk/nextjs';
// import { useState } from 'react';

// export default function ResendVerificationPage() {
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const { session, isLoaded: isSessionLoaded } = useSession();
//   const [resendStatus, setResendStatus] = useState(null);

//   const handleResend = async () => {
//     if (!isUserLoaded || !isSessionLoaded || !user || !session || !user.emailAddresses || user.emailAddresses.length === 0) {
//       return;
//     }

//     try {
//       const emailAddressId = user.emailAddresses[0].id;
//       await session.verifyEmailAddress(emailAddressId);
//       setResendStatus('Verification email resent.');
//     } catch (error) {
//       setResendStatus('Error resending verification email.');
//     }
//   };

//   if (!isUserLoaded || !isSessionLoaded) {
//     return <p>Loading...</p>;
//   }

//   if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
//     return <p>User not logged in or no email address found.</p>;
//   }

//   return (
//     <div>
//       <button onClick={handleResend}>Resend Verification Email</button>
//       {resendStatus && <p>{resendStatus}</p>}
//     </div>
//   );
// }












"use client"

import { printJWT } from "@/app/actions/clicks";
import { CreateOrganization, UserButton, UserProfile, useUser, useSession } from "@clerk/nextjs";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

export const User = () => {



  const handleClick = async () => {
    await printJWT();
  }

  const { isLoaded, isSignedIn, user } = useUser();
  const ddd = useOrganization();
  // console.log(ddd);

  // This does NOT get this list of
  // organizationMemberships that you are in
  const eee = useOrganizationList();
  // console.log(eee);

  // This gets the list of organizationMemberships they are in
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: true
  });
  const organizationMemberships = userMemberships.data;
  // console.log(organizationMemberships);

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  if (user) {
    return (
      <div>
        <div>Hello {user.emailAddresses[0].emailAddress}</div>
        {organizationMemberships && organizationMemberships.map((org, index: number) => {
          return (
            <div key={index} className="p-3">
              <p
                onClick={() => {
                  console.log(org.organization.name);
                  if (setActive) {
                    setActive({
                      organization: org.organization.id
                    });
                  }
                }}
              >
                {org.organization.name}
              </p>
            </div>
          )
        })}
        <button className="mt-4" onClick={handleClick}>Print JWT</button>
      </div>
    )
  }
}
