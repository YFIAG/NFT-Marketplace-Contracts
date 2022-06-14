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

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const YFIAGNftMarketplace = await hre.ethers.getContractFactory(
    "YFIAGNftMarketplace"
  );
  const yFIAGNNftMarketplace = await YFIAGNftMarketplace.deploy();

  await yFIAGNNftMarketplace.deployed();

  console.log("YFIAGNNftMarketplace deployed to:", yFIAGNNftMarketplace.address);

  const YFIAGNftPool = await hre.ethers.getContractFactory("YFIAGNftPool");
  const yFIAGNNftPool = await YFIAGNftPool.deploy(yFIAGNNftMarketplace.address, deployer.address);

  await yFIAGNNftPool.deployed();

  console.log("YFIAGNftPool deployed to:", yFIAGNNftPool.address);
  
  const YFIAGNftBridgeTreasury = await hre.ethers.getContractFactory(
    "YFIAGNftBridgeTreasury"
  );
  const yFIAGNNftBridgeTreasury = await YFIAGNftBridgeTreasury.deploy(yFIAGNNftMarketplace.address);

  await yFIAGNNftBridgeTreasury.deployed();

  console.log("YFIAGNNftBridgeTreasury deployed to:", yFIAGNNftBridgeTreasury.address);

  const YFIAGLaunchPad = await hre.ethers.getContractFactory(
    "YFIAGLaunchPad"
  );
  const yFIAGNLaunchPad = await YFIAGLaunchPad.deploy(yFIAGNNftMarketplace.address);

  await yFIAGNLaunchPad.deployed();

  console.log("Launchpad deployed to:", yFIAGNLaunchPad.address);
  
  const Multicall = await hre.ethers.getContractFactory(
    "Multicall"
  );
  const multicall = await Multicall.deploy();
  
  await multicall.deployed();
  
  console.log("Multicall deployed to:", multicall.address);
  
  await yFIAGNNftMarketplace.setPool(yFIAGNNftPool.address);
  await yFIAGNNftMarketplace.setLaunchPad(yFIAGNLaunchPad.address);
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});