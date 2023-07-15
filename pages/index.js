import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AssessmentContract from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [assessmentContract, setAssessmentContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
 // Added missing state variable
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [addPersonSuccess, setAddPersonSuccess] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false); // Added missing state variable

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the deployed contract address
  const assessmentContractABI = AssessmentContract.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once the wallet is set, get a reference to the deployed contract
    getAssessmentContract();
  };

  const getAssessmentContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const assessmentContract = new ethers.Contract(contractAddress, assessmentContractABI, signer);

    setAssessmentContract(assessmentContract);
  };

  const getBalance = async () => {
    if (assessmentContract) {
      const contractBalance = await assessmentContract.getBalance();
      setBalance(contractBalance.toNumber());
    }
  };

  const sendPayment = async () => {
    try {
      if (!account || !ethWallet || !assessmentContract) {
        console.log("Account, ethWallet, or assessmentContract not available");
        return;
      }
  
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const contractWithSigner = new ethers.Contract(contractAddress, assessmentContractABI, signer);
  
      const transaction = await contractWithSigner.sendPayment({ value: ethers.utils.parseEther(amount) });
      await transaction.wait();
      setMessage('Payment sent successfully!');
      setMessage(`Payment of ${ethers.utils.formatEther(amount)} ETH sent to the address: ${contractAddress}`);
      setAmount('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send payment.');
    }
  };
  

  const addPerson = async () => {
    if (!assessmentContract || !name || !age || !favoriteNumber) return;

    try {
      await assessmentContract.addPerson(name, age, favoriteNumber);
      setAddPersonSuccess(true);
      setName("");
      setAge(0);
      setFavoriteNumber(0);
    } catch (error) {
      console.error("Add person failed:", error);
    }
  };

  const getPeople = async () => {
    if (!assessmentContract) return;

    try {
      const count = await assessmentContract.getPeopleCount();
      const peopleArr = [];
      for (let i = 0; i < count; i++) {
        const person = await assessmentContract.getPersonByIndex(i);
        peopleArr.push({
          name: person[0],
          age: person[1].toNumber(),
          favoriteNumber: person[2].toNumber(),
        });
      }
      setPeople(peopleArr);
    } catch (error) {
      console.error("Get people failed:", error);
    }
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (assessmentContract) {
      getBalance();
      getPeople();
    }
  }, [assessmentContract]);

  useEffect(() => {
    if (assessmentContract) {
      assessmentContract.on("NewPersonAdded", () => {
        setAddPersonSuccess(true);
        getPeople();
      });

      return () => {
        assessmentContract.off("NewPersonAdded");
      };
    }
  }, [assessmentContract]);

  return (
    <main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #363958;
        }
      `}</style>
  
      <header>
        <h1 className="app-title">DEFI APP</h1>
      </header>
  
      {account ? (
        <div className="content-container">
          <div className="section">
            <h2 className="section-title">Transfer Amount</h2>
            <div className="input-group">
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" inputMode="numeric" pattern="[0-9]*" value={amount} onChange={(e) => setAmount(e.target.value)} />

            </div>
            <button className="action-button" onClick={sendPayment}>
              Send Payment
            </button>
            <p className="message">{message}</p>
          </div>
  
          <div className="section">
            <h2 className="section-title">Register Yourself</h2>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="age">Age:</label>
              <input  type="text" id="amount" inputMode="numeric" pattern="[0-9]*"  onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="favoriteNumber">Favorite Number:</label>
              <input
                 type="text" id="amount" inputMode="numeric" pattern="[0-9]*" 
                value={favoriteNumber}
                onChange={(e) => setFavoriteNumber(e.target.value)}
              />
            </div>
            <button className="action-button" onClick={addPerson}>
              Add Person
            </button>
            {addPersonSuccess && <p className="success-message">{name} added successfully!</p>}
          </div>
  
          <div className="section">
            <h2 className="section-title">Stored Data</h2>
            <ul className="data-list">
              {people.map((person, index) => (
                <li key={index} className="data-item">
                  <p>
                    <strong>Name:</strong> {person.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {person.age}
                  </p>
                  <p>
                    <strong>Favorite Number:</strong> {person.favoriteNumber}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="connect-button-container">
          <button className="connect-button" onClick={connectAccount}>
            Connect Wallet
          </button>
        </div>
      )}
  
      <style jsx>{`
        .app-title {
          text-align: center;
          margin-bottom: 1rem;
          
        }
  
        .content-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
        }
  
        .section {
          width: 100%;
          max-width: 400px;
        }
  
        .section-title {
          text-align: center;
          margin-bottom: 1rem;
        }
  
        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
  
        .input-group label {
          margin-bottom: 0.5rem;
        }
  
        .input-group input {
          padding: 0.5rem;
          appearance: none;
          -moz-appearance: textfield;
          -webkit-appearance: none;
          border: 1px solid #ccc;
          border-radius: 4px;
          outline: none;
          box-shadow: none;
          transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
  
        .input-group input:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }
  
        .action-button {
          padding: 0.5rem 1rem;
          margin-top: 1rem;
        }
  
        .message {
          text-align: center;
          margin-top: 1rem;
        }
        .section{
          padding: 30px;
	        margin-top: 50px;
	        border-radius: 10px;
	        box-shadow: 5px 5px gray;
          color: white;
          background-color: royalblue;
        }
  
        .success-message {
          
          text-align: center;
          margin-top: 1rem;
        }
  
        .data-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 200px;
          overflow-y: auto;
        }
  
        .data-item {
          padding: 1rem;
          border: 1px solid #ccc;
          margin-bottom: 1rem;
        }
  
        .connect-button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
  
        .connect-button {
          padding: 0.5rem 1rem;
        }
      `}</style>
    </main>
  );
  
  
}
