'use client'

import { useMyContext } from "@/store/passportStore";
import { useRef, useState } from 'react';
import Web3 from 'web3'

export default function ImmutableWidget() {
  const { passportState: passportInstance, userInfo } = useMyContext()
  const providerZkevm = passportInstance?.connectEvm()
  const [isLoading, setIsLoading] = useState(false);
  const[gasPrice, setGasPrice] = useState('');
  const[userBalance, setUserBalance] = useState('');
  const[latestBlockNumber, setLatestBlockNumber] = useState('');
  const[chainId, setChainId] = useState('');
  const[e, setTransactionHash] = useState('');

  async function getGasPrice() {
    if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    try {

      const gasPrice = await providerZkevm.request({ method: 'eth_gasPrice' });
      setGasPrice(gasPrice)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  async function getUserBalance() {
    console.log({user: userInfo.address})
    if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    try {
      const userBalance = await providerZkevm.request({
        method: 'eth_getBalance',
  params: [
    userInfo.address,
    'latest'
  ]
      });
      setUserBalance(userBalance)
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
  async function sendTransaction(e) {
    e.preventDefault()
    let address = e.target.address.value
    const data = e.target.data.value
    console.log({address, data})
  // if (!passportInstance || !userInfo.address) return
    setIsLoading(true)
    if (!address) {
      address = "0x4e665Bd3e2A1c4c4CCCEBa625Ec518faAAcE6B0B"
      // alert('Address missing')
      // return
    }
    try {
      const addresses = await providerZkevm.request({ method: 'eth_requestAccounts' });
      console.log({addresses})
      const transactionHash = await providerZkevm.request({
  method: 'eth_sendTransaction',
  params: [
    {
      to: "0x4e665Bd3e2A1c4c4CCCEBa625Ec518faAAcE6B0B",
      data: data ?? "Hello world",
      value:
    }
  ]
      });
      console.log({transactionHash})
      setTransactionHash(transactionHash)
    } catch (error) {
      console.log(error)
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
          <button disabled={isLoading} onClick={getGasPrice} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Imx Gas Price</button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>
            {gasPrice}
          </div>
        </div>
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getUserBalance} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Get User Balance</button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>
            {userBalance}
          </div>

        </div>
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getLatestBlockNumber} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">
            Latest Block Number
          </button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>{latestBlockNumber}</div>
        </div>
        <div  className="flex gap-2">
          <button disabled={isLoading} onClick={getChainId} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Chain Id</button>
          <div className='bg-white w-full rounded-sm py-1 px-2 placeholder:text-gray-800 placeholder:italic'>{chainId}</div>
        </div>
        <form onSubmit={sendTransaction}>
          <p>
            Send A transaction
          </p>
          <input type="text" placeholder="address" name="address" />
          <input type="text" placeholder="data (optional)" name="data"/>
          <button disabled={isLoading} className="w-full rounded-full px-3 py-1 bg-green-400 hover:bg-green-500">Send</button>
        </form>

</div>
      </details>
    </div>
  );
}
