
import { auth, currentUser } from "@clerk/nextjs/server";

import { User } from "@/components/user/User";


export default async function HomePage() {

  const authInfo = await auth();

  console.log(authInfo);

  if (!authInfo.userId) {
    return authInfo.redirectToSignIn();
  }

  // Get a self built JWT called "test"
  // You set up the JWT on clerk dashboard
  // const token = await authInfo.getToken({
  //   template: "orgs"
  // });
  // console.log(token);


  const activeOrgToken = await authInfo.getToken({
    template: "active_org"
  });
  // console.log(activeOrgToken);

  const user = await currentUser();
  // console.log(user);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <User />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
