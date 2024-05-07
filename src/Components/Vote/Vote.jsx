import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Proxy from "../../abi/Proxy.json";
import toast, { Toaster } from "react-hot-toast";
const Vote = () => {
  // State to store the list of candidates

  // State variables for candidate inputs
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [party, setParty] = useState("");
  const [can, setCan] = useState([]);
  const [account, setAccount] = useState();
  const[hasVote,setHasVote]=useState(false);

  const checkProxy=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const proxyAddress = "0x8E49024cAc8741f8FF1c6F6e257DF5D4F308ac43";
    const proxy = new ethers.Contract(proxyAddress, Proxy.abi, signer);
    return proxy
  }

  useEffect(() => {
    const fetch = async () => {
       const proxy=await checkProxy();
      const check = await proxy.getListCandidates();
    

      let tempName = [];
      let tempVote = [];
      let tempId = [];
      let tempParty = [];
      check[0].forEach((cand) => tempName.push(cand));
      check[3].forEach((cand) => tempVote.push(parseInt(cand._hex, 16)));
      check[2].forEach((cand) => tempParty.push(cand));
      check[1].forEach((cand) => tempId.push(parseInt(cand._hex, 16)));

      const tempObjs = [];
      for (let i = 0; i < tempName.length; i++) {
        const tempObj = {
          name: tempName[i],
          vote: tempVote[i],
          id: tempId[i],
          party: tempParty[i],
        };
        tempObjs.push(tempObj);
      }
      setCan(tempObjs); // Set the state here
    };

    fetch();
  }, []);


  useEffect(()=>{
    const fetch=async()=>{
      const proxy=await checkProxy();
      const voted=await proxy.getVote(account);

      setHasVote(voted);
    }
  
    fetch();
  },[account])



  useEffect(() => {
    if (window.ethereum == undefined) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.log("MetaMask is not connected.");
          toast.error("MetaMask Not Connected");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleVote = async (id) => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {

        const proxy=await checkProxy();

        // Call the transfer function
        const tx = await proxy.vote(id, account, {
          value: ethers.utils.parseEther("0.0001"),
        });

        // Wait for the transaction to be confirmed
        await tx.wait();

        // Show success toast
        toast.success("Vote Added");
        window.location.reload();
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
  // Function to handle adding a new candidate
  const addCandidate = async () => {
    try {

      if(!name||!id||!party)
      {
        return;
      }
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
        const tx = await proxy.addCandidates(name, id, party, {
          value: ethers.utils.parseEther("0.0001"),
        });

        // Wait for the transaction to be confirmed
        await tx.wait();

        // Show success toast
        toast.success("Candidate Added");
        window.location.reload();
      } else {
        // MetaMask not installed, show error toast
        toast.error("MetaMask not detected");
      }
    } catch (error) {
      // Error occurred, show error toast
      toast.error("CandidateId and Party Name should be unique");
      console.error(error);
    }

    setName("");
    setId("");
    setParty("");
  };

  const findWinner=async()=>{
    if (window.ethereum) {
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const proxy=await checkProxy();

      // Call the transfer function
      const winner = await proxy.getWinner();
      toast.success(winner[0]+" "+" won the election!")



    } else {
      // MetaMask not installed, show error toast
      toast.error("MetaMask not detected");
    }
  }




  return (
    <div className=" mx-auto p-4 bg-gray-100 rounded-lg h-screen w-screen shadow-md bg-gray-400">
      <h2 className="text-xl font-bold mb-4">Vote(CandidateId and Party Name should be unique)</h2>
      <div className="mb-4">
        {/* Input fields for adding a new candidate */}
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Candidate ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addCandidate}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Candidate
        </button>
      </div>


     {/* get Winner */}
      <button
          onClick={findWinner}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Winner (click to know the winner) 
        </button>

      {/* Display the list of candidates */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Candidates:(User Can vote only Once)</h3>
        <div className="w-full ">
          <table className="w-full">
            <thead className="w-full">
              <tr className="bg-gray-800 text-white">
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Vote
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  CandidateId
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Party
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Vote(press)
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {can.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                  >
                    <td className="text-left py-3 px-4">{item.name}</td>
                    <td className="text-left py-3 px-4">{item.vote}</td>
                    <td className="text-left py-3 px-4">{item.id}</td>
                    <td className="text-left py-3 px-4">{item.party}</td>
                    <td>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={hasVote ? null : () => handleVote(item.id)}
                        disabled={hasVote}


                      >
                       {hasVote?"You Already Voted": "Vote"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Vote;
