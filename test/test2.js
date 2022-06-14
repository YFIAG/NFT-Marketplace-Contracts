const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/gtre32RhjQXWRjUFJ4SJfCpy4ltJrqxY"
);
const signer = new ethers.Wallet(
  "",
  provider
);

const multichainAddress = "0x8Cd3B3e753D7A08E78f3F4aDb8CA52429A8235ba";
const multicallABI = require("./abiMulticall.json");
const abiFetchLp = require("./abiFetchLp.json");
const BigNumber = require("bignumber.js");
const { Interface } = require("@ethersproject/abi");

async function test() {
  const multi = new ethers.Contract(multichainAddress, multicallABI, provider);
  const itf = new Interface(abiFetchLp);
  const calls = [
    {
      address: "0x01CaA3341049D03E874a6B5502aB67e865aeFBB1",
      name: "getUserStakeWeight",
      params: [0, "0xeFfe75B1574Bdd2FE0Bc955b57e4f82A2BAD6bF9", 25504751],
    },
    {
      address: "0x01CaA3341049D03E874a6B5502aB67e865aeFBB1",
      name: "getUserStakeWeight",
      params: [0, "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1", 25504751],
    },
  ];
  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);
  console.log("calldata", calldata);
  const { returnData } = await multi.aggregate(calldata);
  const res = returnData.map((call, i) =>
    itf.decodeFunctionResult(calls[i].name, call)
  );

  console.log("return data: ", res);

  const data = res.map((val) => new BigNumber(val).toString(10));
  console.log(data);
}

test();