
// NO MFA THIS WORKS!!
// 'use client'

// import * as React from 'react'
// import { useSignIn } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'

// export default function SignInForm() {
//   const { isLoaded, signIn, setActive } = useSignIn()
//   const [email, setEmail] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const router = useRouter()

//   // Handle the submission of the sign-in form
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!isLoaded) return

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: email,
//         password,
//       })

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.push('/')
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err: any) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   // Display a form to capture the user's email and password
//   return (
//     <>
//       <h1>Sign in</h1>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div>
//           <label htmlFor="email">Enter email address</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             id="email"
//             name="email"
//             type="email"
//             value={email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Enter password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             id="password"
//             name="password"
//             type="password"
//             value={password}
//           />
//         </div>
//         <button type="submit">Sign in</button>
//       </form>
//     </>
//   )
// }








'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "needs_second_factor") {
        const signInAgain = await signIn.prepareSecondFactor({
          strategy: "phone_code"
        });
        console.log(signInAgain);
      }


      // If sign-in process is complete, set the created session as active
      // and redirect the user
      // if (signInAttempt.status === 'complete') {
      //   await setActive({ session: signInAttempt.createdSessionId })
      //   router.push('/')
      // } else {
      //   // If the status is not complete, check why. User may need to
      //   // complete further steps.
      //   console.error(JSON.stringify(signInAttempt, null, 2))
      // }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Display a form to capture the user's email and password
  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </>
  )
}















































// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// WITH MFA
// 'use client'

// import * as React from 'react'
// import { useSignIn } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'

// export default function SignInForm() {
//   const { isLoaded, signIn, setActive } = useSignIn()
//   const [email, setEmail] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [code, setCode] = React.useState('')
//   const [useBackupCode, setUseBackupCode] = React.useState(false)
//   // const [displayTOTP, setDisplayTOTP] = React.useState(false)
//   const [displayPhoneVerify, setDisplayPhoneVerify] = React.useState(false)
//   const [phoneCode, setPhoneCode] = React.useState('');
//   const router = useRouter();

//   console.log(signIn);

//   // Handle user submitting email and pass and swapping to TOTP form
//   const handleFirstStage = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // setDisplayTOTP(true)
//     await signIn?.prepareSecondFactor({
//       strategy: 'phone_code', // Clerk auto-sends to their registered phone
//     });
//     setDisplayPhoneVerify(true);
//   }

//   // Handle the submission of the TOTP of Backup Code submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!isLoaded) return

//     // Start the sign-in process using the email and password provided
//     try {
//       await signIn.create({
//         identifier: email,
//         password,
//       })

//       // Attempt the TOTP or backup code verification
//       const signInAttempt = await signIn.attemptSecondFactor({
//         strategy: useBackupCode ? 'backup_code' : 'totp',
//         code: code,
//       })

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.push('/')
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.log(signInAttempt)
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error('Error:', JSON.stringify(err, null, 2))
//     }
//   }

//   const handleVerifyPhone = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await signIn?.attemptSecondFactor({
//       strategy: "phone_code",
//       code: phoneCode
//     })
//     router.push("/")
//   };

//   // const handleSignIn = async () => {
//   //   const result = await signIn?.create({ identifier: email, password });
//   //   if (result?.status === 'needs_second_factor') {
//   //     setStep('mfa'); // Enforce MFA
//   //   } else {
//   //     router.push('/dashboard');
//   //   }
//   // };

//   if (displayPhoneVerify) {
//     return (
//       <form onSubmit={handleVerifyPhone}>
//         <input type="text" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} placeholder="SMS code" required />
//         <button type="submit">Verify Phone</button>
//       </form>
//     )
//   }

//   // if (displayTOTP) {
//   //   return (
//   //     <div>
//   //       <h1>Verify your account</h1>
//   //       <form onSubmit={(e) => handleSubmit(e)}>
//   //         <div>
//   //           <label htmlFor="code">Code</label>
//   //           <input
//   //             onChange={(e) => setCode(e.target.value)}
//   //             id="code"
//   //             name="code"
//   //             type="text"
//   //             value={code}
//   //           />
//   //         </div>
//   //         <div>
//   //           <label htmlFor="backupcode">This code is a backup code</label>
//   //           <input
//   //             onChange={() => setUseBackupCode((prev) => !prev)}
//   //             id="backupcode"
//   //             name="backupcode"
//   //             type="checkbox"
//   //             checked={useBackupCode}
//   //           />
//   //         </div>
//   //         <button type="submit">Verify</button>
//   //       </form>
//   //     </div>
//   //   )
//   // }

//   return (
//     <>
//       <h1>Sign in</h1>
//       <form onSubmit={(e) => handleFirstStage(e)}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             id="email"
//             name="email"
//             type="email"
//             value={email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             id="password"
//             name="password"
//             type="password"
//             value={password}
//           />
//         </div>
//         <button type="submit">Continue</button>
//       </form>
//     </>
//   )
// }
















// 'use client'

// import * as React from 'react'
// import { useSignIn } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'

// export default function SignInForm() {
//   const { isLoaded, signIn, setActive } = useSignIn()
//   const [email, setEmail] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const router = useRouter()

//   // Handle the submission of the sign-in form
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!isLoaded) return

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: email,
//         password,
//       });

//       console.log(signInAttempt);

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.push('/')
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err: any) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   // Display a form to capture the user's email and password
//   return (
//     <>
//       <h1>Sign in</h1>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div>
//           <label htmlFor="email">Enter email address</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             id="email"
//             name="email"
//             type="email"
//             value={email}
//             className='border-2 border-black'
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Enter password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             id="password"
//             name="password"
//             type="password"
//             value={password}
//             className='border-2 border-black'
//           />
//         </div>
//         <button type="submit">Sign in</button>
//       </form>
//     </>
//   )
// }



// // 'use client'

// // import * as React from 'react'
// // import { useSignIn } from '@clerk/nextjs'
// // import { useRouter } from 'next/navigation'

// // export default function SignInForm() {
// //   const { isLoaded, signIn, setActive } = useSignIn()
// //   const [email, setEmail] = React.useState('')
// //   const [password, setPassword] = React.useState('')
// //   const [code, setCode] = React.useState('')
// //   const [useBackupCode, setUseBackupCode] = React.useState(false)
// //   const [displayTOTP, setDisplayTOTP] = React.useState(false)
// //   const router = useRouter()

// //   // Handle user submitting email and pass and swapping to TOTP form
// //   const handleFirstStage = (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setDisplayTOTP(true)
// //   }

// //   // Handle the submission of the TOTP of Backup Code submission
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     if (!isLoaded) return

// //     // Start the sign-in process using the email and password provided
// //     try {
// //       await signIn.create({
// //         identifier: email,
// //         password,
// //       })

// //       // Attempt the TOTP or backup code verification
// //       const signInAttempt = await signIn.attemptSecondFactor({
// //         strategy: useBackupCode ? 'backup_code' : 'totp',
// //         code: code,
// //       })

// //       // If verification was completed, set the session to active
// //       // and redirect the user
// //       if (signInAttempt.status === 'complete') {
// //         await setActive({ session: signInAttempt.createdSessionId })
// //         router.push('/')
// //       } else {
// //         // If the status is not complete, check why. User may need to
// //         // complete further steps.
// //         console.log(signInAttempt)
// //       }
// //     } catch (err) {
// //       // See https://clerk.com/docs/custom-flows/error-handling
// //       // for more info on error handling
// //       console.error('Error:', JSON.stringify(err, null, 2))
// //     }
// //   }

// //   if (displayTOTP) {
// //     return (
// //       <div>
// //         <h1>Verify your account</h1>
// //         <form onSubmit={(e) => handleSubmit(e)}>
// //           <div>
// //             <label htmlFor="code">Code</label>
// //             <input
// //               onChange={(e) => setCode(e.target.value)}
// //               id="code"
// //               name="code"
// //               type="text"
// //               value={code}
// //             />
// //           </div>
// //           <div>
// //             <label htmlFor="backupcode">This code is a backup code</label>
// //             <input
// //               onChange={() => setUseBackupCode((prev) => !prev)}
// //               id="backupcode"
// //               name="backupcode"
// //               type="checkbox"
// //               checked={useBackupCode}
// //             />
// //           </div>
// //           <button type="submit">Verify</button>
// //         </form>
// //       </div>
// //     )
// //   }

// //   return (
// //     <>
// //       <h1>Sign in</h1>
// //       <form onSubmit={(e) => handleFirstStage(e)}>
// //         <div>
// //           <label htmlFor="email">Email</label>
// //           <input
// //             onChange={(e) => setEmail(e.target.value)}
// //             id="email"
// //             name="email"
// //             type="email"
// //             value={email}
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="password">Password</label>
// //           <input
// //             onChange={(e) => setPassword(e.target.value)}
// //             id="password"
// //             name="password"
// //             type="password"
// //             value={password}
// //           />
// //         </div>
// //         <button type="submit">Continue</button>
// //       </form>
// //     </>
// //   )
// // }






// EASY PEEZY
// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//   return (
//     <div className='flex justify-center'>
//       <SignIn />
//     </div>
//   );
// }