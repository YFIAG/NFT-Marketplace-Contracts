const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

  beforeEach(async function () {

    PaybNftMarketplace = await hre.ethers.getContractFactory(
      "PaybNftMarketplace"
    );
    Payb = await PaybNftMarketplace.deploy();
  
    await Payb.deployed();
  
    console.log("paybNftMarketplace deployed to:", Payb.address);
  
    const PaybNftPool = await hre.ethers.getContractFactory("PaybNftPool");
    const paybNftPool = await PaybNftPool.deploy(Payb.address);
  
    await paybNftPool.deployed();
  
    console.log("PaybNftPool deployed to:", paybNftPool.address);
  
    await Payb.setPool(paybNftPool.address);
  });


  describe("Deployment", function () {


    it("Should set onwer is Admin", async function () {
      expect(await Payb.isAdmin(owner.address)).to.equal(true);
    });

    it("Should have name and symbol", async function () {
      expect(await Payb.name()).to.equal("HaoToken");
      expect(await Payb.symbol()).to.equal("HTK");
    });
  });

});
});
