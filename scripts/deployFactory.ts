// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
async function main() {
  const [owner] = await ethers.getSigners();
  const FactoryV2 = await ethers.getContractFactory("UniswapV2Factory");
  const factoryV2 = await FactoryV2.deploy(owner.address);
  await factoryV2.deployed();
  console.log("factory: ", factoryV2.address);
  const hashCode = await factoryV2.pairCodeHash();
  console.log("hashCode: ", hashCode);

  // await factoryV2.createPair(tokenA.address, tokenB.address);
  // await factoryV2.createPair(tokenA.address, wETH.address);
  // await factoryV2.createPair(wETH.address, tokenB.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
