// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract Transfer {
    // Event to log transactions
    event transaction(
        address indexed from,
        address to,
        uint amount
    );
 
    // Function to transfer Ether to a specified address
    function _transfer(
        address payable _to
    ) public payable {
        // Transfer Ether to the specified address
        _to.transfer(msg.value);
        // Emit transaction event with sender, recipient, and amount
        emit transaction(msg.sender, _to, msg.value);
    }

  
}
