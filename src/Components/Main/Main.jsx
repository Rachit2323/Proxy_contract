import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Dashboard from "./Dashboard";
import Proxy from "../../abi/Proxy.json";
import { ethers } from "ethers";

const Main = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [proxyContract, setProxyContract] = useState(null);

  const connectWebsite = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0xaa36a7") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setIsConnected(true);
    } catch (err) {
      if (err.code === 4001) {
        toast.error("User rejected the request.");
      } else {
        console.error("err", err);
      }
    }
  };

  const connectContract = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner();
    const proxyAddress = "0x8E49024cAc8741f8FF1c6F6e257DF5D4F308ac43";

    const proxy = new ethers.Contract(proxyAddress, Proxy.abi, signer);

    setProxyContract(proxy);
  };


  useEffect(() => {
    if (window.ethereum == undefined) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          connectContract();
          console.log("MetaMask is connected!");
          setIsConnected(true);
        } else {
          console.log("MetaMask is not connected.");
          toast.error("MetaMask Not Connected");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-400">
      {!isConnected ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => connectWebsite()}
        >
          Connect to MetaMask
        </button>
      ) : (
        <Dashboard />
      )}
      <Toaster />
    </div>
  );
};

export default Main;
