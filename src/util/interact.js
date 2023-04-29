// require('dotenv').config();
const alchemyKey = "wss://eth-goerli.g.alchemy.com/v2/whetCIbBXq3KoYRz5bT5jnTXrA_ICz-m";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../contract-abi.json");
const contractAddress = "0xfc5BC169504FF1000D085B3B6395E6af77da3467";

export const helloWorldContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const loadCurrentMessage = async () => {
    const message = await helloWorldContract.methods.message().call();
    return message;
};

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
            });
            const obj = {
            status: "👆🏽 Write a message in the text-field above.",
            address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
            address: "",
            status: "😥 " + err.message,
            };
        }
        } else {
        return {
            address: "",
            status: "😥 " + 'Make sure metamask is installed',
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (addressArray.length > 0) {
            return {
              address: addressArray[0],
              status: "👆🏽 Write a message in the text-field above.",
            };
          } else {
            return {
              address: "",
              status: "🦊 Connect to Metamask using the top right button.",
            };
          }
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
      } else {
        return {
            address: "",
            status: "😥 " + 'Make sure metamask is installed',
        };
    }
};

export const updateMessage = async (address, message) => {

    //input error handling
    if (!window.ethereum || address === null) {
      return {
        status:
          "💡 Connect your Metamask wallet to update the message on the blockchain.",
      };
    }
  
    if (message.trim() === "") {
      return {
        status: "❌ Your message cannot be an empty string.",
      };
    }
  
    //set up transaction parameters
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: address, // must match user's active address.
      data: helloWorldContract.methods.update(message).encodeABI(),
    };
  
    //sign the transaction
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        status: "✅ View the status of your transaction on Etherscan! ℹ️ Once the transaction is verified by the network, the message will be updated automatically.",
      };
    } catch (error) {
      return {
        status: "😥 " + error.message,
      };
    }
};