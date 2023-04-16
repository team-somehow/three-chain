// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/payment/escrow/RefundEscrow.sol";

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
    mapping(uint256 => RefundEscrow) private escrows;

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
    ) public {
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
        require(batchData[batchId].verification, "Batch not verified yet");
        require(msg.value > 0, "Need to send some ether");
        require(!hasBuyerApproved[batchId] && !hasLogisticsApproved[batchId], "Escrow has ended");

        if (escrows[batchId] == RefundEscrow(address(0))) {
            escrows[batchId] = new RefundEscrow(batchData[batchId].owner);
        }

        batchIdToBid[batchId].push(Bid(msg.sender, msg.value, false));

        escrows[batchId].deposit{value: msg.value}(msg.sender);
    }

    function escrowEndBuyer(uint256 batchId) public {
        require(batchData[batchId].verification, "Batch not verified yet");
        require(!hasBuyerApproved[batchId] && !hasLogisticsApproved[batchId], "Escrow has ended");

        hasBuyerApproved[batchId] = true;

        if (hasLogisticsApproved[batchId]) {
            escrows[batchId].close();
            Batch memory data = batchData[batchId];
            payable(escrows[batchId].beneficiary()).transfer(data.currentPrice);
            batchData[batchId].owner = escrows[batchId].recipient();
            for (uint i = data.startTokenId; i < data.endTokenId; i++) {
                safeTransferFrom(
                    escrows[batchId].beneficiary(),
                    escrows[batchId].recipient(),
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
            _release(escrowRecevier[batchId]);
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

    
}