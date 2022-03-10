// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Router = await ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(
    "0x311674DFE4159a8139a6e4c762D1BcF33493193f",
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  );
  await router.deployed();
  console.log("router: ", router.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
