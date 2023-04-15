const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductNFT", function () {
  let contract;
  let owner;
  let addr1;

  const batchUid = 1;

  before(async function () {
    // use ethers to get our contract
    const ProductNFT = await ethers.getContractFactory("ProductNFT");
    // and deploy it
    contract = await ProductNFT.deploy();
    await contract.deployed();

    // get addresses of users
    const [_owner, _addr1] = await ethers.getSigners();
    owner = _owner;
    addr1 = _addr1;
  });

  it("should mint a batch of NFTs", async () => {
    const quantity = 10;
    const name = "Test Batch";
    const batchUid = 1;

    // Ensure that batch minting works correctly
    await contract.batchMint(quantity, name, batchUid, {
      value: ethers.utils.parseEther("1"),
    });
    expect(await contract.balanceOf(owner.address)).to.equal(quantity);

    // Ensure that batch data is stored correctly
    const batchData = await contract.getBatchData(batchUid);
    expect(batchData.name).to.equal(name);
    expect(batchData.quantity).to.equal(quantity);
    expect(batchData.startTokenId).to.equal(0);
    expect(batchData.endTokenId).to.equal(quantity);
    expect(batchData.verification).to.be.false;
    expect(batchData.owner).to.equal(owner.address);
    expect(batchData.currentPrice).to.equal(0);
  });

  it("should set verification to true", async function () {
    const quantity = 10;
    const name = "Test Batch";

    await contract.connect(owner).batchMint(quantity, name, batchUid);
    await contract.connect(owner).regulatorApproval(batchUid);

    const batchData = await contract.getBatchData(batchUid);
    expect(batchData.verification).to.equal(true);
  });

  it("should start the escrow process", async function () {
    const escrowAmount = ethers.utils.parseEther("1");

    await contract.connect(owner).escrowStart(batchUid, {
      value: escrowAmount,
    });

    const batchData = await contract.getBatchData(batchUid);
    expect(batchData.currentPrice).to.equal(escrowAmount);
    // expect(await contract.escrowProcess(batchUid)).to.equal(true);
    // expect(await contract.escrowRecevier(batchUid)).to.equal(
    //   await owner.getAddress()
    // );
  });
});
