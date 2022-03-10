import { ethers } from "hardhat";
import { Contract, utils } from "ethers";
import { addresses } from './constants';
import { MaxUint256 } from '@ethersproject/constants';
import { parseEther } from "ethers/lib/utils";

async function main() {
  
  const factory = await ethers.getContractAt("UniswapV2Factory", addresses.factory);
  const router = await ethers.getContractAt("UniswapV2Router02", addresses.router);
  const token = await ethers.getContractAt("ERC20", "0xfA5D78d4517d2C5CCbAd2e56fA8Fc321d6544F2b");

  await factory.createPair("0xfA5D78d4517d2C5CCbAd2e56fA8Fc321d6544F2b", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
  console.log("pair created");
  const [owner] = await ethers.getSigners();
  // approve
  const balance = await token.balanceOf(owner.address);
  await token.approve(router.address, balance);
  
  // add liquidity
  await router.addLiquidityETH(
    token.address,
    balance,
    0,
    0,
    owner.address,
    MaxUint256,
    {
      value: parseEther("0.8")
    }
  );
  console.log("add Liquidity");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
