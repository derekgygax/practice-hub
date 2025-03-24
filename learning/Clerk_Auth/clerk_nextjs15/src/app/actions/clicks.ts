"use server";

import { auth } from "@clerk/nextjs/server";


export const printJWT = async () => {

  const authInfo = await auth();
  const activeOrgToken = await authInfo.getToken({
    template: "active_org"
  });
  console.log(activeOrgToken);
}