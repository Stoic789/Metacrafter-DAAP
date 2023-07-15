// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
     address payable public owner;
     uint256 public balance;
     mapping(address => uint256) public balances;

    //event Deposit(uint256 amount);
    //event Withdraw(uint256 amount);
     event AmountTransferred(address indexed sender, uint256 amount);
     event NewPersonAdded(string name, uint age, uint favoriteNumber);
     event PaymentReceived(address indexed sender, uint256 amount);
    

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }
    
     function sendPayment() public payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        
        balances[msg.sender] += msg.value;
        emit PaymentReceived(msg.sender, msg.value);
    }
  
   


     struct Person {
        string name;
        uint age;
        uint favoriteNumber;
    }

    mapping(address => Person) public people;
    address[] public peopleAddresses;

   
    //event AmountSplit(address indexed sender, uint amount, uint recipientCount, uint amountPerRecipient);

    function addPerson(string memory name, uint age, uint favoriteNumber) external {
        require(bytes(name).length > 0, "Name should not be empty.");
        require(age > 0, "Age should be greater than 0.");
        require(favoriteNumber > 0, "Favorite number should be greater than 0.");

        Person memory newPerson = Person(name, age, favoriteNumber);
        people[owner] = newPerson;
        peopleAddresses.push(owner);

        emit NewPersonAdded(name, age, favoriteNumber);
    }

    function getPeopleCount() external view returns (uint) {
        return peopleAddresses.length;
    }

    function getPersonByIndex(uint index) external view returns (string memory, uint, uint) {
        require(index < peopleAddresses.length, "Invalid index.");

        address personAddress = peopleAddresses[index];
        Person memory person = people[personAddress];

        return (person.name, person.age, person.favoriteNumber);
    }

    
}
