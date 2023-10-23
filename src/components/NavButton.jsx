'use client'

import { useMyContext } from "@/store/passportStore";
import Head from "next/head";
import Script from "next/script";
import { useState } from 'react';

export default function NavButton() {
  const [count, setCount] = useState(0)
    const { providerState, setProviderState, passportState: passportInstance, setPassportState,  } = useMyContext();
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  console.log(clientId)
  console.log(passportInstance)
  const [buttonState, setButtonState] = useState('Connect Passport')
  const [isLoading, setIsLoading] = useState(false)


  async function login() {
    console.log("I am here")
    if (!passportInstance) return
    setButtonState("...Connecting")
    setIsLoading(true)
    let provider = await passportInstance.connectImxSilent()
    console.log("provider after silent connect", provider);
    if (!provider) {
      try {
         console.log("I am connecting now")
         provider = await passportInstance.connectImx()
         console.log("provider after popup connect", provider);

        } catch (error) {
          console.log("Something went wrong")
         console.log({ error })
         setButtonState('Connect Passport')
          throw error
      }
      finally {
        setIsLoading(false)
      }
    }
    setProviderState(provider)
      setButtonState('Connected')
    return
  }

  async function logout()  {
    await passportInstance.logout();
    setButtonState('Connect Passport')
}

  return (
 <>

<Head>
        <title>Immutable Planner App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Script>
          {`
      if (typeof global === 'undefined') {
				window.global = window;
			}

			if (typeof process === 'undefined') {
				window.process = { env: { NODE_ENV: 'production' } };
			}
		`}
</Script>
      </Head>
      <div className="fixed flex justify-end px-4 top-0 backdrop-blur-md py-4   w-full">

          {
            buttonState === 'Connected'
            ?
            <>
            <button onClick={logout}>Logout</button>
            </>
            : <button disabled={isLoading} className={`bg-green-500 text-grey-100 px-2 py-2 opacity-100 rounded-full ${isLoading ? "bg-green-200" : "" }`} onClick={login}>
          {buttonState}
        </button>
          }

        </div>
        {/* <p>{JSON.stringify(providerState) ?? "Null"}</p> */}

      </>


  );
}


