/* eslint-disable no-process-exit */

import { ethers } from "hardhat";

const main = async () => {
  const domainContractFactory = await ethers.getContractFactory("Domains");
  // We pass in "ninja" to the constructor when deploying
  /* @ts-ignore */
  const domainContract = await domainContractFactory.deploy("ninja");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  const txn = await domainContract.register("mortal", {
    /* @ts-ignore */
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("mortal");
  console.log("Owner of domain mortal:", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
