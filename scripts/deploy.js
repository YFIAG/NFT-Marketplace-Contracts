// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const YFIAGNftMarketplace = await hre.ethers.getContractFactory(
    "YFIAGNftMarketplace"
  ); 
  const yFIAGNftMarketplace = await YFIAGNftMarketplace.deploy();

  await yFIAGNftMarketplace.deployed();

  console.log("yFIAGNftMarketplace deployed to:", yFIAGNftMarketplace.address);

  const YFIAGNftPool = await hre.ethers.getContractFactory("YFIAGNftPool");
  const yFIAGNftPool = await YFIAGNftPool.deploy(yFIAGNftMarketplace.address, "0xeFfe75B1574Bdd2FE0Bc955b57e4f82A2BAD6bF9");

  await yFIAGNftPool.deployed();

  console.log("YFIAGNftPool deployed to:", yFIAGNftPool.address);

  const YFIAGNftBridgeTreasury = await hre.ethers.getContractFactory(
    "YFIAGNftBridgeTreasury"
  );
  const yFIAGNNftBridgeTreasury = await YFIAGNftBridgeTreasury.deploy(yFIAGNftMarketplace.address);

  await yFIAGNNftBridgeTreasury.deployed();

  console.log("yFIAGNNftBridgeTreasury deployed to:", yFIAGNNftBridgeTreasury.address);

  await yFIAGNftMarketplace.setPool(yFIAGNftPool.address);
  await yFIAGNftMarketplace.setAdmin("0xeFfe75B1574Bdd2FE0Bc955b57e4f82A2BAD6bF9", true);
  await yFIAGNftMarketplace.transferOwnership("0xeFfe75B1574Bdd2FE0Bc955b57e4f82A2BAD6bF9");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
