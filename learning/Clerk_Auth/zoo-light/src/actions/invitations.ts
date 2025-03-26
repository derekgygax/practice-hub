"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { createClerkClient } from '@clerk/backend'


// TODO you are handing createClerk WRONG!!!
// TODO you are handing createClerk WRONG!!!
// TODO you are handing createClerk WRONG!!!
// TODO you are handing createClerk WRONG!!!
// TODO you are handing createClerk WRONG!!!


export const sendOrganzationInvitation = async () => {
  const organizationId = 'org_2upj2MAPYEjcfhS2EA9EnGLb0E2';

  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  const user = await currentUser();
  console.log(user?.id);

  const inviterUserId = user?.id;

  const emailAddress = 'derekgygaxcode@gmail.com';

  const role = 'org:member';

  const response = await clerkClient.organizations.createOrganizationInvitation({
    organizationId,
    inviterUserId,
    emailAddress,
    role,
    redirectUrl: "http://localhost:3000/sign-up"
  });
  console.log(response);
}


export const getInvitedEmail = async (ticket: string) => {
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  try {
    // 1. Decode the JWT token (no verification needed for Clerk tokens)
    const decoded = JSON.parse(
      Buffer.from(ticket.split('.')[1], 'base64').toString()
    ) as {
      oid: string;  // Organization ID
      sid: string;  // Invitation ID
      st: 'organization_invitation';
    };

    // 2. Fetch invitation details from Clerk
    const invitation = await clerkClient.organizations.getOrganizationInvitation({
      organizationId: decoded.oid,
      invitationId: decoded.sid,
    });

    // 3. Return the email + verification status
    return {
      email: invitation.emailAddress,
      valid: invitation.status === 'pending', // Check if invitation is still active
      organizationId: decoded.oid
    };

  } catch (err) {
    console.error('Invalid invitation:', err);
    return { error: "Invalid or expired invitation" };
  }
};