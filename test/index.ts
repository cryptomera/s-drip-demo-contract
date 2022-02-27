import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

describe("faucet", function () {
  it("faucet stake, claim", async function () {
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
    const approveTx = await dripToken.approve(faucet.address, parseEther("100"));
    await approveTx.wait();

    await faucet.updatePayoutRate(1);
    await faucet.updateMaxPayoutCap(parseEther("10000000000"));

    const depoistTx = await faucet.deposit(parseEther("100"));
    await depoistTx.wait();

    // increase time
    await network.provider.send("evm_increaseTime", [86400 * 1]); 
    await network.provider.send("evm_mine");
    
    let payouts = await faucet.payoutOf(owner.address);
    // console.log(payouts);
    const balance1 = await dripToken.balanceOf(owner.address);
    console.log(balance1)
    const claimTx = await faucet.claim();
    await claimTx.wait();
    const balance2 = await dripToken.balanceOf(owner.address);
    console.log(balance2)
    expect(balance2 > balance1).to.true;
  });
});
