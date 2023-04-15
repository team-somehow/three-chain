const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductNFT", function () {
  let contract;
  let owner;
  let bidder1;
  let bidder2;
  let seller;

  const quantity = 10;
  const name = "Test Batch";
  const batchUid = 1;

  before(async function () {
    // use ethers to get our contract
    const ProductNFT = await ethers.getContractFactory("ProductNFT");
    // and deploy it
    contract = await ProductNFT.deploy();
    await contract.deployed();

    // get addresses of users
    const [_owner, _bidder1, _bidder2, _seller] = await ethers.getSigners();

    owner = _owner;
    bidder1 = _bidder1;
    bidder2 = _bidder2;
    seller = _seller;
  });

  it("should mint a batch of NFTs", async () => {
    // Ensure that batch minting works correctly
    await contract.connect(seller).batchMint(quantity, name, batchUid, {
      value: ethers.utils.parseEther("1"),
    });
    expect(await contract.balanceOf(seller.address)).to.equal(quantity);

    // Ensure that batch data is stored correctly
    const batchData = await contract.getBatchData(batchUid);

    expect(batchData.name).to.equal(name);
    expect(batchData.quantity).to.equal(quantity);
    expect(batchData.startTokenId).to.equal(0);
    expect(batchData.endTokenId).to.equal(quantity);
    expect(batchData.verification).to.be.false;
    expect(batchData.owner).to.equal(seller.address);
    expect(batchData.currentPrice).to.equal(0);
  });

  it("should set verification to true", async function () {
    await contract.connect(seller).batchMint(quantity, name, batchUid);
    await contract.connect(seller).regulatorApproval(batchUid);

    const batchData = await contract.getBatchData(batchUid);
    expect(batchData.verification).to.equal(true);
  });

  it("bidder 1 bids for batch", async function () {
    const escrowAmount = ethers.utils.parseEther("1");

    await contract.connect(bidder1).escrowBid(batchUid, {
      value: escrowAmount,
    });
  });

  it("bidder 2 bids for batch", async function () {
    const escrowAmount = ethers.utils.parseEther("2");

    await contract.connect(bidder2).escrowBid(batchUid, {
      value: escrowAmount,
    });
  });

  it("seller accepts bidder 2's bid", async function () {
    await contract.connect(seller).escrowBatch(batchUid, bidder2.address);
  });

  it("end escrow", async function () {
    await contract.connect(seller).escrowEnd(batchUid);
  });
});
