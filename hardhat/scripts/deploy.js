// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Loan = await hre.ethers.getContractFactory("Loan");

  const loan = await Loan.deploy();

  await loan.deployed();

  console.log("Loan deployed to:", loan.address);

  // We get the contract to deploy
  const ProductNFT = await hre.ethers.getContractFactory("ProductNFT");

  const productNFT = await ProductNFT.deploy();

  await productNFT.deployed();

  console.log("ProductNFT deployed to:", productNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
