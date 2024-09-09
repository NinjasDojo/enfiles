const express = require("express");
const { ethers } = require("ethers");
const contractABI = require("./abi/demo.json");
const app = express();
const port = 8000;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Ethereum provider setup (replace with your provider URL)
const providerUrl = "https://testnet.inco.org";
const provider = new ethers.JsonRpcProvider(providerUrl);

// Endpoint to get a random number from the smart contract
app.get("/getRandomNumber", async (req, res) => {
  try {
    console.log(contractABI);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const randomNumber = await contract.getRandomNumber();

    // Send the result as a JSON response
    res.json({ randomNumber: randomNumber.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching random number");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
