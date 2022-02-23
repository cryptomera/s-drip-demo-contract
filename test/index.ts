import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("faucet", function () {
  it("Should return the new greeting once it's changed", async function () {
    const DripToken = await ethers.getContractFactory("DripToken");
    const dripToken = await DripToken.deploy(parseEther("1000000"));
    await dripToken.deployed();

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(dripToken.address);
    await vault.deployed();

    await dripToken.setVaultAddress(vault.address);


    const Faucet = await ethers.getContractFactory("FaucetV4");
    const faucet = await Faucet.deploy(
      dripToken.address,
      vault.address
    );
    await faucet.deployed();
    
    await faucet.setMinAmount(parseEther("10"));
    // deposit
    const [owner] = await ethers.getSigners();
    const approveTx = await dripToken.approve(faucet.address, parseEther("1000000"));
    await approveTx.wait();

    const depoistTx = await faucet.deposit(owner.address, parseEther("20"));
    await depoistTx.wait();


  });
});
