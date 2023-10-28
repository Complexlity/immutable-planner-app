'use client'

import { useMyContext } from "@/store/passportStore";
import { useRef, useState } from 'react';

export default function ImmutableWidget() {
  const { passportState: passportInstance, userInfo } = useMyContext()
  const providerZkevm = passportInstance?.connectEvm()
  const [isLoading, setIsLoading] = useState(false);
  const[gasPrice, setGasPrice] = useState('');
  const[myBalance, setMyBalance] = useState('');
  const[latestBlockNumber, setLatestBlockNumber] = useState('');
  const[chainId, setChainId] = useState('');

  async function getGasPrice() {
    if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    try {

      const gasPrice = await providerZkevm.request({ method: 'eth_gasPrice' });
      setGasPrice(parseInt(gasPrice, 16))
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  async function getMyBalance() {
    console.log({user: userInfo.address})
    if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    try {
      const myBalance = await providerZkevm.request({
        method: 'eth_getBalance',
  params: [
    userInfo.address,
    'latest'
  ]
      });
      setMyBalance(parseInt(myBalance, 16))
    } catch (error) {
      console.log(error)
          }
    finally {
      setIsLoading(false)
    }
  }

  async function getLatestBlockNumber() {
    console.log({address: userInfo.address})
  if (!passportInstance || !userInfo.address) return
    setIsLoading(true)

    try {
      const latestBlockNumber = await providerZkevm.request({ method: 'eth_blockNumber' });
      setLatestBlockNumber(latestBlockNumber)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
}

  async function getChainId() {
  if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    try {
      const chainId = await providerZkevm.request({ method: 'eth_chainId' });
      setChainId(chainId)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
}
  async function getTransactionByHash(e) {
    e.preventDefault()
    let hash = e.target.hash.value

  // if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    if (!hash) {
      // Default hash value if not provided
      hash = "0xa0d300ac90e69f3ba6274ca1a712219951b79ba6c0117f538fe16c016a701951"
    }
    try {
      const transaction = await providerZkevm.request({
  method: 'eth_getTransactionByHash',
  params: [
    hash
  ]
      });
      // Download file into user's machine as trasaction.json
       const blob = new Blob([JSON.stringify(transaction, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transaction.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
      URL.revokeObjectURL(url);
      e.target.hash.value = ''
    } catch (error) {
      console.log(error)
      alert("Something went wrong. Please try again")
    }
    finally {
      setIsLoading(false)
    }
}

return (
    <div className="min-w-[400px] max-w-[500px] grid gap-4 py-3 overflow-hidden">

      <details open>
        <summary className="text-white underline text-xl overflow-x-auto max-w-full mb-4">User Details</summary>
      <div
        className="tokens max-w-[500px]">

        <details open className="" ><summary>Id Token</summary>{userInfo.idToken ?? ""}</details>

        <details open><summary>Access Token</summary>{userInfo.accessToken ?? ""}</details>

        <details ><summary>Nickname</summary>{userInfo.nickname ?? "User has no nickname"}</details>
      </div>
          </details>

      <details>
      <summary className="text-white text-xl underline mb-4">
        {isLoading ?
          <svg class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> : null}
         Rpc Methods</summary>
        <div className="grid gap-2">
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getGasPrice} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Get Imx Gas Price</button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>
            {gasPrice}{" "}{gasPrice ? "wei" : ""}
          </div>
        </div>
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getMyBalance} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Get My Balance</button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>
            {myBalance}
          </div>

        </div>
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getLatestBlockNumber} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">
          Get Block Number
          </button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>{latestBlockNumber}</div>
        </div>
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getChainId} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Get Chain Id</button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>{chainId}</div>
        </div>
        <form onSubmit={getTransactionByHash} className="px-1">
          <p className="mx-auto text-white text-center text-xl mb-2 mt-4">
            Get Transaction By Hash
          </p>
          <div className="flex gap-4">
          <input type="text" placeholder="hash" name="hash" className="w-full px-2 py-2 rounded-xl" />
          <button disabled={isLoading} className="w-full max-w-fit rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Get Txn</button>
          </div>
        </form>
        <small className="text-gray-300 text-center"><span className="text-green-400">Tip</span>: You can get example transaction hashed from <a className="underline hover:no-underline text-amber-400 italic" href="https://explorer.testnet.immutable.com/txs" target="_blank">Immutable Explorer</a></small>
</div>
      </details>
    </div>
  );
}
