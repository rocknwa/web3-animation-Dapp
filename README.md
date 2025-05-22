# OnePieceMint NFT Contract

**OnePieceMint** is an ERC721-based smart contract for minting soulbound (non-transferable) NFTs inspired by the One Piece universe. It integrates Chainlink VRF (Verifiable Random Function) to randomly assign one of five unique character-based NFTs to users based on their answers to a personality quiz. Each NFT is tied to a specific character, represented by a unique token URI hosted on IPFS.

The contract ensures that each user can mint only one NFT, and the NFTs are soulbound, meaning they cannot be transferred after minting.

---

## Features

- **ERC721 Compliance:** Built on OpenZeppelin's ERC721 standard with URI storage for metadata.
- **Chainlink VRF Integration:** Randomly assigns a character NFT using Chainlink's VRF for verifiable randomness.
- **Soulbound NFTs:** NFTs are non-transferable, ensuring they remain with the original minter.
- **Personality-Based Minting:** Users answer a set of five questions, and their responses influence the character NFT they receive.
- **IPFS Metadata:** Token URIs are stored on IPFS for decentralized and persistent metadata.
- **Single Mint per User:** Prevents users from minting multiple NFTs with the same address.

---

## Contract Details

- **Name:** OnePiece NFT
- **Symbol:** OPN
- **Solidity Version:** ^0.8.8

**Dependencies:**
- OpenZeppelin Contracts (`ERC721`, `ERC721URIStorage`, `Ownable`)
- Chainlink VRF (`VRFConsumerBaseV2`, `VRFCoordinatorV2Interface`)

**Token URIs:**
- Five unique IPFS-hosted metadata URIs representing One Piece characters.

---

## Prerequisites

To deploy or interact with the contract, you need:

- Node.js and npm for Hardhat
- Hardhat (for contract compilation and deployment)
- Chainlink VRF Subscription (a valid subscription ID)
- MetaMask or another Ethereum wallet for interacting with the contract

**Environment Variables:**
- `VRF_ADDRESS`: Address of the Chainlink VRF Coordinator (network-specific)
- `SUB_ID`: Chainlink VRF subscription ID
- `KEY_HASH`: Chainlink VRF key hash for the network
- Ether: For deploying the contract and paying gas fees

---

## Deployment

The contract is deployed using Hardhat. Follow these steps to deploy:

#### 1. Clone the Repository

```bash
git clone https://github.com/rocknwa/web3-animation-Dapp
cd web3-animation-Dapp
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:
```env
VRF_ADDRESS=<chainlink-vrf-coordinator-address>
SUB_ID=<chainlink-vrf-subscription-id>
KEY_HASH=<chainlink-vrf-key-hash>
PRIVATE_KEY=<meta mask private key>
```

#### 4. Deploy the Contract

Run the deployment script:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```
The script will deploy the OnePieceMint contract and generate an `arguments.js` file with deployment parameters.

---

## Access

- Access the frontend here: **[OnePieceMint Frontend](https://github.com/rocknwa/one-piece-mint-anime-dapp/tree/main)**

---

## Contract Functions

### `requestNFT(uint256[5] memory answers)`

- **Description:** Initiates the NFT minting process by submitting five quiz answers. Requests a random word from Chainlink VRF to determine the final character ID.
- **Parameters:**  
  `answers`: Array of five integers representing user quiz responses.
- **Emits:** `NftRequested(requestId, msg.sender)`

### `fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)`

- **Description:** Internal function called by Chainlink VRF to process random words and mint the NFT with the final character ID.
- **Parameters:**  
  `requestId`: VRF request ID.  
  `randomWords`: Array of random numbers provided by Chainlink VRF.
- **Emits:** `NftMinted(characterId, recipient)`

### `mintNFT(address recipient, uint256 characterId)`

- **Description:** Internal function to mint an NFT for the recipient with the specified character ID.
- **Parameters:**  
  `recipient`: Address receiving the NFT.  
  `characterId`: ID of the character (0–4) corresponding to a token URI.

### `determineCharacter(uint256[5] memory answers)`

- **Description:** Private function to calculate a character ID based on quiz answers.
- **Parameters:**  
  `answers`: Array of five integers from the quiz.
- **Returns:** `characterId` (1–5)
- **Emits:** `CharacterTraitDetermined(characterId)`

### `tokenURI(uint256 tokenId)`

- **Description:** Returns the IPFS-hosted metadata URI for a given token ID.
- **Parameters:**  
  `tokenId`: ID of the NFT.
- **Returns:** String URI of the NFT metadata.

---

## Events

- `NftRequested(uint256 requestId, address requester)`: Emitted when a user requests an NFT.
- `CharacterTraitDetermined(uint256 characterId)`: Emitted when a character ID is determined based on quiz answers.
- `NftMinted(uint256 characterId, address minter)`: Emitted when an NFT is successfully minted.

---

## Soulbound Mechanism

The NFTs are soulbound, meaning they cannot be transferred after minting. This is enforced by overriding the `_beforeTokenTransfer` function to allow transfers **only** to or from the zero address (minting or burning). Any attempt to transfer an NFT will revert with the error:  
`"Err! This is not allowed"`

---
