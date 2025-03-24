"use client"

import { printJWT } from "@/app/actions/clicks";
import { CreateOrganization, UserButton, UserProfile, useUser } from "@clerk/nextjs";

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
