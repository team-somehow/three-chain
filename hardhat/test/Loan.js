const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Loan", () => {
    let LoanContract;
    let owner, addr1, addr2, addr3;
    let amount = 1000;
    before(async function () {
        const loan = await ethers.getContractFactory("Loan");
        LoanContract = await loan.deploy();
        await LoanContract.deployed();
        const [_owner, _account1, _account2, account3] =
            await ethers.getSigners();

        owner = _owner;
        addr1 = _account1;
        addr2 = _account2;
        addr3 = account3;
    });
    it("Request Loan", async () => {
        await LoanContract.connect(addr1).requestLoan(
            addr2.address,
            ethers.utils.parseEther(amount.toString()),
            10
        );
    });
    it("give Loan", async () => {
        await LoanContract.connect(addr2).giveLoan({
            value: ethers.utils.parseEther(amount.toString()),
        });
        console.log(await addr1.getBalance());
    });
    it("Repay Loan", async () => {
        console.log(await addr1.getBalance());
        await LoanContract.connect(addr1).repayLoan({
            value: ethers.utils.parseEther(amount.toString()),
        });
        console.log(await addr1.getBalance());
    });
    it("Status Check", async () => {
        console.log(await LoanContract.connect(addr1).loanStatus());
    });
});
