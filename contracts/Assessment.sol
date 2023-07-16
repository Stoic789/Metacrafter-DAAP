// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Assessment {
    address payable public owner;

    mapping(address => uint256) public balances;

    event NewPersonAdded(string name, uint age, string note);
    event PaymentReceived(address indexed sender, uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function sendPayment() public payable {
        require(msg.value > 0, "Payment amount must be greater than zero");

        balances[msg.sender] += msg.value;
        emit PaymentReceived(msg.sender, msg.value);
    }

    struct Person {
        string name;
        uint age;
        string note;
    }

    mapping(address => Person) public people;
    address[] public peopleAddresses;

    function addPerson(string memory name, uint age, string memory note) external {
        require(bytes(name).length > 0, "Name should not be empty.");
        require(age > 0, "Age should be greater than 0.");
        require(bytes(note).length > 0, "Note should not be empty.");

        Person memory newPerson = Person(name, age, note);
        people[owner] = newPerson;
        peopleAddresses.push(owner);

        emit NewPersonAdded(name, age, note);
    }

    function getPeopleCount() external view returns (uint) {
        return peopleAddresses.length;
    }

    function getPersonByIndex(uint index) external view returns (string memory, uint, string memory) {
        require(index < peopleAddresses.length, "Invalid index.");

        address personAddress = peopleAddresses[index];
        Person memory person = people[personAddress];

        return (person.name, person.age, person.note);
    }
}
