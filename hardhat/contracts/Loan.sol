// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Loan {
    struct LoanStruct {
        uint256 loanAmount;
        uint256 loanTenure;
        string repaymentStatus;
        address from;
        address to;
        bool active;
        bool rejected;
    }
    uint256 loanCounter = 0;

    mapping(uint256 => LoanStruct) LoanData;
    mapping(uint256 => bool) LoanPaymentStatus;
    mapping(address => uint256) LoanFrom;
    mapping(address => uint256) LoanTo;

    function giveLoan() public payable returns (bool) {
        uint256 loanId = LoanFrom[msg.sender];
        address payable wallet = payable(LoanData[loanId].to);
        wallet.transfer(msg.value);
        LoanData[loanId].active = true;
        LoanData[loanId].rejected = false;
        return true;
    }

    function requestLoan(
        address from,
        uint256 amount,
        uint256 tenure
    ) public returns (uint256) {
        loanCounter = loanCounter + 1;
        LoanData[loanCounter].loanAmount = amount;
        LoanData[loanCounter].loanTenure = tenure;
        LoanData[loanCounter].repaymentStatus = "Loan In Progress";
        LoanData[loanCounter].from = from;
        LoanData[loanCounter].to = msg.sender;
        LoanData[loanCounter].active = false;
        LoanData[loanCounter].rejected = false;
        LoanFrom[from] = loanCounter;
        LoanTo[from] = loanCounter;
        return loanCounter;
    }

    function rejectLoan() public {
        uint256 loanId = LoanFrom[msg.sender];
        LoanData[loanId].rejected = false;
    }

    function repayLoan() public payable returns (string memory) {
        uint256 loanId = LoanFrom[msg.sender];
        if (msg.value > LoanData[loanId].loanAmount) {
            LoanData[loanId].loanAmount = 0;
        } else {
            LoanData[loanId].loanAmount =
                LoanData[loanId].loanAmount -
                msg.value;
        }
        address payable wallet = payable(LoanData[loanId].from);
        wallet.transfer(msg.value);
        if (LoanData[loanId].loanAmount <= 0) {
            LoanData[loanId].active = false;
            LoanData[loanId].repaymentStatus = "Loan complete";
            return LoanData[loanId].repaymentStatus;
        } else {
            return LoanData[loanId].repaymentStatus;
        }
    }

    function loanStatus() public view returns (string memory) {
        uint256 loanId = LoanFrom[msg.sender];
        return LoanData[loanId].repaymentStatus;
    }
}
