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
    "YFIAGNftMarketplace",
  );
  
  const yFIAGNftMarketplace = await YFIAGNftMarketplace.attach("0xc887405a1484F7F8d4BD7Bb1544FB96E4C845235");

  const YFIAGNftPool = await hre.ethers.getContractFactory("YFIAGNftPool");
  const yFIAGNftPool = await YFIAGNftPool.deploy( yFIAGNftMarketplace.address, "0xeFfe75B1574Bdd2FE0Bc955b57e4f82A2BAD6bF9");

  await yFIAGNftPool.deployed();

  console.log("YFIAGNftPool deployed to:", yFIAGNftPool.address);

  await yFIAGNftMarketplace.setPool(yFIAGNftPool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
