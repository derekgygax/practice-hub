"use client"

import { sendOrganzationInvitation } from "@/actions/invitations";

export const OrganizationInvitation = () => {

  return (
    <div>
      <button
        onClick={async () => {
          await sendOrganzationInvitation()
        }}
      >Send Invitation</button>
    </div>
  )
}
