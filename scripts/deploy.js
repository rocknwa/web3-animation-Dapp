// Import necessary modules
const { ethers } = require("hardhat");
const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Main function to deploy contracts
async function main() {

  // Get the deployer's signer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the necessary parameters from environment variables
  const vrfCoordinatorV2Address = process.env.VRF_ADDRESS; // address of the VRFCoordinatorV2 contract
  const subId = process.env.SUB_ID; // subscription ID for Chainlink VRF
  const keyHash = process.env.KEY_HASH; // key hash for Chainlink VRF
  const gasLimit = 2000000; // gas limit for contract deployment

  // Prepare arguments array for contract deployment
  const argumentsArray = [vrfCoordinatorV2Address, subId, keyHash, gasLimit ]

  // Convert arguments array to string and save it to a file
  const content = "module.exports = " + JSON.stringify(argumentsArray, null, 2) + ";";
  fs.writeFileSync("./arguments.js", content);
  console.log("arguments.js file generated successfully.");

  // Deploying OnePiecePersonalityDapp contract
  const OnePiecePersonalityDapp = await ethers.getContractFactory("OnePieceMint");
  console.log("Deploying OnePiecePersonalityDapp...");

  // Deploy the contract with provided arguments
  const onePiecePersonalityDapp = await OnePiecePersonalityDapp.deploy(
    vrfCoordinatorV2Address,
    subId,
    keyHash,
    gasLimit);

  // Log the address where the contract is deployed
  console.log("OnePiecePersonalityDapp deployed to:", await onePiecePersonalityDapp.getAddress());
}

// Execute the main function
main()
  .then(() => process.exit(0)) // Exit with success status
  .catch((error) => {
    // Log error and exit with failure status
    console.error(error);
    process.exit(1);
  });

