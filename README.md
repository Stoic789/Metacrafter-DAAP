Metacrafter-DAAP
================

===========================

Assessment Contract
-------------------

This Solidity contract implements an assessment contract that allows users to add people to a list and make payments.

### Contract Variables

-   `owner`: The address of the contract owner (deployer).

### Events

-   `NewPersonAdded`: Triggered when a new person is added to the contract.
-   `PaymentReceived`: Triggered when an amount is received as a payment.

### Constructor

#### `constructor() payable`

Initializes the contract by setting the `owner` as the deployer of the contract.

### Public Functions

#### `sendPayment()`

solidityCopy code

solidityCopy code

`function sendPayment() public payable`

Allows the sender to make a payment to the contract. Requires that the payment amount is greater than zero. Updates the `balances` mapping for the sender's address and emits the `PaymentReceived` event.

#### `addPerson(string memory name, uint age, string memory note)`

solidityCopy code

solidityCopy code

`function addPerson(string memory name, uint age, string memory note) external`

Adds a new person to the contract by providing their `name`, `age`, and `note` as parameters. Requires that the name, age, and note are not empty. Updates the `people` mapping and adds the person's address to the `peopleAddresses` array. Emits the `NewPersonAdded` event.

#### `getPeopleCount()`

solidityCopy code

solidityCopy code

`function getPeopleCount() external view returns (uint)`

Returns the total number of people in the `peopleAddresses` array.

#### `getPersonByIndex(uint index)`

solidityCopy code

solidityCopy code

`function getPersonByIndex(uint index) external view returns (string memory, uint, string memory)`

Returns the details of a person at a specific index in the `peopleAddresses` array. Requires a valid index. Returns the person's `name`, `age`, and `note`.

Running Procedure
-----------------

To run the Assessment contract, follow these steps:

1.  Clone the repository:

bashCopy code

`git clone <repository-link>`

1.  Install the dependencies:

bashCopy code

`npm install`

1.  Start the local Ethereum node:

bashCopy code

`npx hardhat node`

1.  Deploy the contract on the local network:

bashCopy code

`npm run scripts/deploys.js --network localhost`

1.  Start the application:

bashCopy code

`npm run dev`

Tech Stack:

-   [Ethereum](https://ethereum.org/) - The blockchain platform.
-   [Hardhat](https://hardhat.org/) - Development environment for Ethereum.
-   [Ether.js](https://docs.ethers.io/) - JavaScript library for interacting with Ethereum.
-   [Next.js](https://nextjs.org/) - React framework for web development.
-   [Solidity](https://docs.soliditylang.org/) - Programming language for Ethereum smart contracts.
-   [MetaMask](https://metamask.io/) - Ethereum wallet and browser extension.

