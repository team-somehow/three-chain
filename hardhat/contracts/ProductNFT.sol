// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

contract ProductNFT is ERC721A {
    constructor() ERC721A("ThreeChain", "THC") {}

    struct Batch {
        string name;
        uint256 quantity;
        uint256 startTokenId;
        uint256 endTokenId;
        bool verification;
        address owner;
        uint256 currentPrice;
    }

    mapping(uint256 => Batch) batchData;
    mapping(uint256 => bool) escrowProcess;
    mapping(uint256 => address) escrowRecevier;
    mapping(uint256 => address) escrowSender;

    mapping(uint256 => bool) hasBuyerApproved;
    mapping(uint256 => bool) hasLogisticsApproved;

    struct Bid {
        address bidder;
        uint256 bidPrice;
        bool isWinner;
    }
    // to maintain downpayment
    mapping(uint256 => Bid[]) public batchIdToBid;

    function batchMint(
        uint256 quantity,
        string memory name,
        uint256 batchUid
    ) public payable {
        uint256 start = _nextTokenId();
        batchData[batchUid].name = name;
        batchData[batchUid].quantity = quantity;
        batchData[batchUid].startTokenId = start;
        batchData[batchUid].endTokenId = start + quantity;
        batchData[batchUid].verification = false;
        batchData[batchUid].owner = msg.sender;
        batchData[batchUid].currentPrice = 0;
        _mint(msg.sender, quantity);
    }

    function getBatchData(uint256 batchId) public view returns (Batch memory) {
        return batchData[batchId];
    }

    function regulatorApproval(uint256 batchId) public {
        batchData[batchId].verification = true;
    }

    function escrowBid(uint256 batchId) public payable {
        batchIdToBid[batchId].push(Bid(msg.sender, msg.value, false));
        escrowProcess[batchId] = true;
    }

    function escrowBatch(uint256 batchId, address winnerAddress) public {
        require(escrowProcess[batchId], "Need the escrow process to start!");

        escrowSender[batchId] = batchData[batchId].owner;
        batchData[batchId].owner = address(this);

        // loop over all bids and set the winner
        for (uint i = 0; i < batchIdToBid[batchId].length; i++) {
            if (batchIdToBid[batchId][i].bidder == winnerAddress) {
                batchIdToBid[batchId][i].isWinner = true;
                // console.log("Winner is: %s", winnerAddress);
                escrowRecevier[batchId] = winnerAddress;
            } else {
                // refund the losers
                payable(batchIdToBid[batchId][i].bidder).transfer(
                    batchIdToBid[batchId][i].bidPrice
                );
                // console.log("Loser is: %s", batchIdToBid[batchId][i].bidder);
            }
        }
    }

    function escrowEndBuyer(uint256 batchId) public {
        require(escrowProcess[batchId], "Need the escrow process to start!");

        hasBuyerApproved[batchId] = true;

        if (hasLogisticsApproved[batchId]) {
            Batch memory data = batchData[batchId];
            payable(escrowSender[batchId]).transfer(data.currentPrice);
            batchData[batchId].owner = escrowRecevier[batchId];
            for (uint i = data.startTokenId; i < data.endTokenId; i++) {
                safeTransferFrom(
                    escrowSender[batchId],
                    escrowRecevier[batchId],
                    i
                );
            }
        }
    }

    function escrowEndLogistics(uint256 batchId) public {
        require(escrowProcess[batchId], "Need the escrow process to start!");

        hasLogisticsApproved[batchId] = true;

        if (hasBuyerApproved[batchId]) {
            Batch memory data = batchData[batchId];
            payable(escrowSender[batchId]).transfer(data.currentPrice);
            batchData[batchId].owner = escrowRecevier[batchId];
            for (uint i = data.startTokenId; i < data.endTokenId; i++) {
                safeTransferFrom(
                    escrowSender[batchId],
                    escrowRecevier[batchId],
                    i
                );
            }
        }
    }

    function getOwner(uint256 batchId) public view returns (address) {
        return batchData[batchId].owner;
    }

    function checkAuthentication(
        uint256 batchId
    ) public view returns (Batch memory) {
        return batchData[batchId];
    }
}
