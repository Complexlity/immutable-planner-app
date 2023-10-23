import Head from "next/head";
import { useEffect, useState } from 'react'
import { config, passport, provider } from '@imtbl/sdk'
import Script from "next/script";
import { useMyContext } from "@/store/passportStore";

export default function Home() {
  const [count, setCount] = useState(0)
    const { providerState, setProviderState, passportState: passportInstance, setPassportState,  } = useMyContext();
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  console.log(clientId)
  console.log(passportInstance)
  const [buttonState, setButtonState] = useState('Connect Passport')


  async function login() {
    console.log("I am here")
    if (!passportInstance) return
    setButtonState("...Connecting")
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
        <title>Create Next App</title>
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
<>

      <h1>Vite + React</h1>
      <div className="card">

          {
            buttonState === 'Connected'
              ? <button onClick={logout}>Logout</button>
              : <button onClick={login}>
          {buttonState}
        </button>
          }

        </div>
        <p>{JSON.stringify(providerState) ?? "Null"}</p>

    </>
    </>
  );
}


