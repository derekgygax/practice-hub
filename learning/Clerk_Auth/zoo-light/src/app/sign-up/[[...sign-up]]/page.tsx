

import { getInvitedEmail } from "@/actions/invitations";
import { SignUpForm } from "@/components/signUpForm/SignUpForm";

interface SignUpPageProps {
  searchParams: Promise<{
    __clerk_status: string;
    __clerk_ticket: string;
  }>
}

export default async function SignUpPage(props: SignUpPageProps) {

  const { __clerk_status, __clerk_ticket } = await props.searchParams;

  const invitation = await getInvitedEmail(__clerk_ticket);

  return (
    <div>
      <SignUpForm
        email={invitation.email ?? "NO FIND"}
      />
    </div>
  );
}