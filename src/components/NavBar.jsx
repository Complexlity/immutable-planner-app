'use client'

import { useMyContext } from "@/store/passportStore";
import Head from "next/head";
import { useState } from 'react';

export default function NavButton() {
  const { setProviderImx, providerImx ,passportState: passportInstance, providerZkevm  } = useMyContext();
  const [buttonState, setButtonState] = useState('Connect Passport')
  const [isLoading, setIsLoading] = useState(false)





  async function login() {
    if (!passportInstance) return
    setButtonState("...Connecting")
    setIsLoading(true)
    let providerImx = await passportInstance.connectImxSilent()
    console.log("provider after silent connect", providerImx);
    if (!providerImx) {
      try {
        console.log("I am connecting now")
        providerImx = await passportInstance.connectImx()
      }

      catch (error) {
        console.log("Something went wrong")
        console.log({ error })
        setButtonState('Connect Passport')
        throw error
      }
      finally {
        setIsLoading(false)

      }
    }

    setProviderImx(providerImx)
    setButtonState('Connected')
    return
    // try {

    //   let provider = await passportInstance.connectEvm()
    //   console.log(provider)
    //   const blockNumber = await provider.request({ method: 'eth_blockNumber' });
    //   console.log({blockNumber})
    // } catch (error) {
    //   console.log("Something went wrong")
    //   console.log(err)
    // }
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
      </Head>
      <div className="fixed flex justify-end px-4 gap-4 top-0 backdrop-blur-md py-4   w-full">

          {
            buttonState === 'Connected'
            ?
            <>
            {providerImx != null
              ?
            <>
              <p className="px-4 py-2 bg-teal-600 rounded-lg text-gray-200 flex items-center justify-center">{providerImx.user.profile.email} </p>
                  <p className="px-4 py-2 bg-teal-600 rounded-lg text-gray-200 flex items-center justify-center">{providerImx.user.imx.ethAddress }</p>
                </>
                : null
            }
            <button onClick={logout} className="bg-red-500 text-grey-800 px-4 py-2 opacity-100 rounded-full text-lg  text-gray-100">Logout</button>
            </>
            : <button disabled={isLoading} className={`text-grey-100 px-4 py-2 opacity-100 rounded-full ${isLoading ? "bg-green-200" : "bg-green-500" }`} onClick={login}>
          {buttonState}
        </button>
          }

        </div>
      </>


  );
}


