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
  const marketPlace = '0xC566eD7CFf875a64351659d077b401ACfCFF6379'
  const YFIAGLaunchPad = await hre.ethers.getContractFactory(
    "YFIAGLaunchPad"
  );
  const yFIAGLaunchPad = await YFIAGLaunchPad.deploy();

  await yFIAGLaunchPad.deployed();

  console.log("Launchpad deployed to:", yFIAGLaunchPad.address);
  await yFIAGLaunchPad.setAddressMarketplace(marketPlace)
  await yFIAGLaunchPad.transferOwnership("0xeFfe75B1574Bdd2FE0Bc955b57e4f82A2BAD6bF9");

 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
