# Metacrafter-DAAP
===========================

Assessment Contract
-------------------

This Solidity contract implements an assessment contract that allows users to add people to a list and make payments.

### Contract Variables

-   `owner`: The address of the contract owner (deployer).
-   `balance`: The total balance of the contract.
-   `balances`: A mapping that stores the balance of each address.

### Events

-   `AmountTransferred`: Triggered when an amount is transferred from one address to another.
-   `NewPersonAdded`: Triggered when a new person is added to the contract.

### Constructor

#### `constructor(uint initBalance) payable`

Initializes the contract by setting the `owner` as the deployer of the contract and setting the initial `balance` to the `initBalance` value passed as a parameter.

### Public Functions

#### `getBalance()`

solidityCopy code

`function getBalance() public view returns (uint256)`

Returns the current `balance` of the contract.

#### `sendPayment()`

solidityCopy code

`function sendPayment() public payable`

Allows the sender to make a payment to the contract. Requires that the payment amount is greater than zero. Updates the `balances` mapping for the sender's address and emits the `PaymentReceived` event.

#### `addPerson(string memory name, uint age, uint favoriteNumber)`

solidityCopy code

`function addPerson(string memory name, uint age, uint favoriteNumber) external`

Adds a new person to the contract by providing their `name`, `age`, and `favoriteNumber` as parameters. Requires that the name is not empty, age is greater than zero, and favoriteNumber is greater than zero. Updates the `people` mapping and adds the person's address to the `peopleAddresses` array. Emits the `NewPersonAdded` event.

#### `getPeopleCount()`

solidityCopy code

`function getPeopleCount() external view returns (uint)`

Returns the total number of people in the `peopleAddresses` array.

#### `getPersonByIndex(uint index)`

solidityCopy code

`function getPersonByIndex(uint index) external view returns (string memory, uint, uint)`

Returns the details of a person at a specific index in the `peopleAddresses` array. Requires a valid index. Returns the person's `name`, `age`, and `favoriteNumber`.

Running Procedure
-----------------

To run the Assessment contract, follow these steps:

1.  Clone the repository:

bashCopy code

`git clone <repository-link>`

1.  Install the dependencies:

Copy code

`npm install`

1.  Start the local Ethereum node:

Copy code

`npx hardhat node`

1.  Deploy the contract on the local network:

arduinoCopy code

`npm run scripts/deploys.js --network localhost`

1.  Start the application:

arduinoCopy code

`npm run dev`

Tech Stack:

-   [Ethereum](https://ethereum.org/) - The blockchain platform.
-   [Hardhat](https://hardhat.org/) - Development environment for Ethereum.
-   [Ether.js](https://docs.ethers.io/) - JavaScript library for interacting with Ethereum.
-   [Next.js](https://nextjs.org/) - React framework for web development.
-   [Solidity](https://docs.soliditylang.org/) - Programming language for Ethereum smart contracts.
-   [MetaMask](https://metamask.io/) - Ethereum wallet and browser extension.


