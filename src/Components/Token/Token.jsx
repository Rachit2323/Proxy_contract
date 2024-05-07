import React, { useState } from "react";
import { ethers } from "ethers";
import Proxy from "../../abi/Proxy.json";
import toast, { Toaster } from "react-hot-toast";

const Token = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {

        // Connect to MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create ethers provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Get signer
        const signer = provider.getSigner();
        
        // Proxy contract address
        const proxyAddress = "0x8E49024cAc8741f8FF1c6F6e257DF5D4F308ac43";

        // Create contract instance
        const proxy = new ethers.Contract(proxyAddress, Proxy.abi, signer);
        
        // Call the transfer function
        const tx = await proxy.callTransfer(recipientAddress, {
          value: ethers.utils.parseEther(amount), // Convert to wei
        });

        // Wait for the transaction to be confirmed
        await tx.wait();
        
        // Show success toast
        toast.success("Amount Transferred");
      } else {
        // MetaMask not installed, show error toast
        toast.error("MetaMask not detected");
      }
    } catch (error) {
      // Error occurred, show error toast
      toast.error("Error transferring amount");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-400 w-screen h-screen gap-10">
      <div className="flex w-4/5 justify-between items-center">
        <input
          onChange={(e) => setRecipientAddress(e.target.value)}
          value={recipientAddress}
          className="w-3/4 text-white p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder="Paste Recipient Address"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
          className="w-1/4 ml-4 p-3 text-white bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder="Amount"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
        onClick={handleTransfer} // Removed arrow function from onClick
      >
        Submit
      </button>
      <Toaster />
    </div>
  );
};

export default Token;
