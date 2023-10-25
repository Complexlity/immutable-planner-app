'use client'

import { useMyContext } from "@/store/passportStore";
import { passport } from "@imtbl/sdk";
import { useRef, useState, useEffect } from 'react'

export default function ImmutableWidget() {
  const { providerImx, passportState: passportInstance  } = useMyContext()
  const inputRef = useRef(null)
  const providerZkevm = passportInstance?.connectEvm()
  console.log({providerZkevm})

  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      if(!passportInstance) return
      const user = await passportInstance.getUserInfo()
      setUser(user)
    })()
  }, [passportInstance])






  async function handleSubmit(e) {
    if (!providerImx) return
    e.preventDefault()
    const inputValue = inputRef.current.value

    const tradeRequest = {
      order_id: parseInt(inputValue),
      user: providerImx.user.imx.ethAddress
    };
    console.log({ tradeRequest })
    const result = await providerImx.createTrade(tradeRequest);
    console.log(result);

  }

  return (
    <div style={{ minWidth: 300, maxWidth: 500 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "row",

        }}
      >
        <p style={{
          color: "white",
          fontSize: "24px"
        }}>Immutable</p>
      </div>
      <div
        className="tokens">

        <details><summary>Id Token</summary>{providerImx?.user.idToken ?? ""}</details>

        <details><summary>Access Token</summary>{providerImx?.user.accessToken ?? ""}</details>

        <details><summary>Refresh Token</summary>{providerImx?.user.refreshToken ?? ""}</details>
        <details><summary>Nickname</summary>{providerImx?.user.profile.nickname ?? "User has no nickname"}</details>

        <form action="" className="flex gap-2" onSubmit={handleSubmit}>
          <input type="number" placeholder="Enter order number" className='rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic' ref={inputRef} />
          <button type="submit" className="rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Create Trade</button>
        </form>
      </div>
    </div>
  );
}
