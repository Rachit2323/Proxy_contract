//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Transfer2 {
    event transaction(
        address indexed from,
        address to,
        uint amount

    );
 
    function _transfer(
        address payable _to
    ) public payable {
        console.log('msf',msg.value);
          require(msg.value > 0.001 ether, "Value should be more");
        _to.transfer(msg.value);
        emit transaction(msg.sender, _to, msg.value);
    }

    function saveTx(
        address from,
        address to,
        uint amount

    ) public {
        emit transaction(from, to, amount);
    }


}
