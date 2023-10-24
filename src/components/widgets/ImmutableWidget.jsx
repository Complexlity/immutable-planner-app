'use client'

import { useMyContext } from "@/store/passportStore";
import { useRef } from 'react'

export default function ImmutableWidget() {
  const { providerState: provider } = useMyContext()
  const inputRef = useRef(null)

  async function handleSubmit(e) {
    if (!provider) return
    e.preventDefault()
    const inputValue = inputRef.current.value

    const tradeRequest = {
      order_id: parseInt(inputValue),
      user: provider.user.imx.ethAddress
    };
    console.log({ tradeRequest })
    const result = await provider.createTrade(tradeRequest);
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

        <details><summary>Id Token</summary>{provider?.user.idToken ?? ""}</details>

        <details><summary>Access Token</summary>{provider?.user.accessToken ?? ""}</details>

        <details><summary>Refresh Token</summary>{provider?.user.refreshToken ?? ""}</details>

        <form action="" className="flex gap-2" onSubmit={handleSubmit}>
          <input type="number" placeholder="Enter order number" className='rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic' ref={inputRef} />
          <button type="submit" className="rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Create Trade</button>
        </form>
      </div>
    </div>
  );
}
