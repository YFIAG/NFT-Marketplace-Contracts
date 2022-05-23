// We import Chai to use its asserting functions here.
const { ethers, waffle, network } = require("hardhat");

describe("Contract NFT marketplace", function () {
  let yFIAGNftMarketplace;
  let yFIAGNNftPool;
  let yFIAGNftBridgeTreasury;
  let yFIAGLaunchPad;

  let owner;
  let addr1;
  let addr2;
  let addrs;

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const YFIAGNftMarketplace = await ethers.getContractFactory(
      "YFIAGNftMarketplace"
    );
    yFIAGNftMarketplace = await YFIAGNftMarketplace.deploy();
    await yFIAGNftMarketplace.deployed();

    const YFIAGNftPool = await ethers.getContractFactory("YFIAGNftPool");
    yFIAGNNftPool = await YFIAGNftPool.deploy(
      yFIAGNftMarketplace.address,
      owner.address
    );
    await yFIAGNNftPool.deployed();

    const YFIAGNftBridgeTreasury = await ethers.getContractFactory(
      "YFIAGNftBridgeTreasury"
    );
    yFIAGNftBridgeTreasury = await YFIAGNftBridgeTreasury.deploy(
      yFIAGNftMarketplace.address
    );
    await yFIAGNftBridgeTreasury.deployed();

    const YFIAGLaunchPad = await ethers.getContractFactory("YFIAGLaunchPad");
    yFIAGLaunchPad = await YFIAGLaunchPad.deploy(yFIAGNftMarketplace.address);
    await yFIAGLaunchPad.deployed();

    await yFIAGNftMarketplace.setPool(yFIAGNNftPool.address);
    await yFIAGNftMarketplace.setLaunchPad(yFIAGLaunchPad.address);

    console.log("yFIAGNftMarketplace address", yFIAGNftMarketplace.address);
    console.log("yFIAGNNftPool address", yFIAGNNftPool.address);
    console.log(
      "yFIAGNftBridgeTreasury address",
      yFIAGNftBridgeTreasury.address
    );
    console.log("yFIAGLaunchPad address", yFIAGLaunchPad.address);
    console.log("yFIAGLaunchPad1 address", owner.address);
  });

  // Mint token (owner) => List token for sell (owner)=> Buy token (addr1)=>  List token for sell (addr1)=> Buy token (owner)
  it("Create, list for sell and buy NFT", async function () {
    await yFIAGNftMarketplace.mint(
      owner.address,
      ZERO_ADDRESS,
      "URI",
      100,
      false,
      {
        from: owner.address,
      }
    );
    await yFIAGNftMarketplace.setPriceAndSell(1, ethers.utils.parseEther("1"));

    await yFIAGNftMarketplace.connect(addr1).buy(1, {
      value: ethers.utils.parseEther("1"),
    });

    await yFIAGNftMarketplace
      .connect(addr1)
      .setPriceAndSell(1, ethers.utils.parseEther("1"));

    await yFIAGNftMarketplace.connect(owner).buy(1, {
      value: ethers.utils.parseEther("1"),
    });
  });

  // Create a Launchpad => Owner stake to Launchpad => addr1 stake to launchpad => Admin set winner of launchpad => owner (winner) claim NFT => addr1 (loser) unstake
  it("Launchpad", async function () {
    const Token = await ethers.getContractFactory("TestERC20");
    const token = await Token.deploy();
    await token.deployed();
    await token.connect(addr1).mint();

    await yFIAGNftMarketplace.mint(
      owner.address,
      ZERO_ADDRESS,
      "URI",
      100,
      true,
      {
        from: owner.address,
      }
    );
    await yFIAGLaunchPad.addLaunchPad(
      "Token 1",
      token.address,
      1,
      1,
      Math.floor(new Date().getTime() / 1000),
      Math.floor(new Date().getTime() / 1000) + 1000,
      ethers.utils.parseEther("10")
    );
    await token.approve(
      yFIAGLaunchPad.address,
      ethers.utils.parseEther("100000")
    );
    await token
      .connect(addr1)
      .approve(yFIAGLaunchPad.address, ethers.utils.parseEther("100000"));
    await yFIAGLaunchPad.stake(0, ethers.utils.parseEther("15"));
    await yFIAGLaunchPad.connect(addr1).stake(0, ethers.utils.parseEther("15"));

    await network.provider.send("evm_increaseTime", [3600]);

    await yFIAGLaunchPad.setWinners(0, [owner.address]);

    console.log(
      "winner",
      owner.address,
      " ",
      await yFIAGLaunchPad.winners(0, owner.address)
    );
    console.log(
      "winner",
      owner.address,
      " ",
      await yFIAGLaunchPad.winners(0, addr1.address)
    );

    await yFIAGLaunchPad.connect(owner).claim(0);
    await yFIAGLaunchPad.connect(addr1).unstake(0);
  });

  // Mint NFT (addr1) => List for sell (addr1) => addr2 send 1.5 eth to Treasury => admin buyAndBurn Token => admin mintByCrosschain to addr2 
  it("Bridge", async function () {
    const YFIAGNftBridgeTreasury = await ethers.getContractFactory(
      "YFIAGNftBridgeTreasury"
    );
    yFIAGNftBridgeTreasury = await YFIAGNftBridgeTreasury.deploy(
      yFIAGNftMarketplace.address
    );
    await yFIAGNftBridgeTreasury.deployed();

    await yFIAGNftMarketplace
      .connect(addr1)
      .mint(addr1.address, ZERO_ADDRESS, "URI", 100, false);
    await yFIAGNftMarketplace
      .connect(addr1)
      .setPriceAndSell(1, ethers.utils.parseEther("1"));

    await yFIAGNftBridgeTreasury
      .connect(addr2)
      .pay(
        1,
        ethers.utils.parseEther("1"),
        ethers.utils.parseEther("1.5"),
        "97",
        "80001",
        {
          value: ethers.utils.parseEther("1.5"),
        }
      );

    await yFIAGNftMarketplace.connect(owner).buyAndBurn(1, {
      value: ethers.utils.parseEther("1"),
    });

    await yFIAGNftMarketplace.mintByCrosschain(
      addr2.address,
      ZERO_ADDRESS,
      "URI",
      100,
      addr1.address
    );
  });
});
