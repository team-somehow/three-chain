// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract ProductNFT is ERC721A{
    constructor() ERC721A("ThreeChain","THC"){}
    struct Batch {
        string name;
        uint256 quantity;
        uint256 startTokenId;
        uint256 endTokenId;
        bool verification;
        address owner;
        uint256 currentPrice;

    }
    mapping(uint256=>Batch) batchData;
    mapping(uint256=>bool) escrowProcess;
    mapping(uint256=>address) escrowRecevier;
    mapping(uint256 =>address) escrowSender;
    
    function batchMint(uint256 quantity,string memory name,uint256 batchName) public payable {
        uint256 start=_nextTokenId();
        batchData[batchName].name=name;
        batchData[batchName].quantity=quantity;
        batchData[batchName].startTokenId=start;
        batchData[batchName].endTokenId=start+quantity;
        batchData[batchName].verification=false;
        batchData[batchName].owner=msg.sender;
        batchData[batchName].currentPrice=0;
        _mint(msg.sender,quantity);
    }
    function getBatchData(uint256 batchId) public view returns(Batch memory){
        return batchData[batchId];
    }

    function regulatorApproval(uint256 batchId) public   {
        batchData[batchId].verification=true;
    }

    function escrowStart(uint256 batchId) public payable  {
        require(batchData[batchId].verification,"Need to be verified!");
        batchData[batchId].currentPrice=msg.value;
        escrowProcess[batchId]=true;
        escrowRecevier[batchId]=msg.sender;
    }
    function escrowBatch(uint256 batchId) public {
        require(escrowProcess[batchId] ,"Need the escrow process to start!");
        escrowSender[batchId]=batchData[batchId].owner;
        batchData[batchId].owner=address(this);
    }
    function escrowEnd(uint256 batchId) public  {
        Batch memory data= batchData[batchId];
        payable(escrowSender[batchId]).transfer(data.currentPrice);
        batchData[batchId].owner=escrowRecevier[batchId];
        for (uint i = data.startTokenId; i < data.endTokenId; i++) {
            safeTransferFrom(escrowSender[batchId],escrowRecevier[batchId],i);
        }
    }
    function getOwner(uint256 batchId) public view returns (address){
        return batchData[batchId].owner;
    }
    function checkAuthentication(uint256 batchId) public view returns(Batch memory){
        return batchData[batchId];
    }
}