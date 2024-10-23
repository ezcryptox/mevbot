```md
# MEVBot - Configuration and Usage

This is a README file for configuring and running the MEVBot to detect and execute various trading strategies like arbitrage, front-running, back-running, and sandwiching. The bot is built using the `ethers.js` library and interacts with decentralized exchanges (DEXs) such as Uniswap and Sushiswap to exploit trading opportunities.

## Features

- **Arbitrage**: Finds price discrepancies between DEXs and executes profitable trades.
- **Front-Running**: Exploits opportunities where a large trade is about to be executed, allowing the bot to trade ahead of it.
- **Back-Running**: Waits for large trades to move the market and then capitalizes on the price correction.
- **Sandwich Attack**: Executes trades both before and after a large trade, manipulating the price.

---

## Prerequisites

Before setting up and running the bot, ensure you have the following:

- Node.js (v14 or later)
- NPM or Yarn for dependency management
- A MongoDB database for trade logging
- An Ethereum wallet and private key
- An Infura project ID or another Ethereum provider
- A VPS (AWS, DigitalOcean, etc.) for deployment

## Installation

1. Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up a `.env` file in the root directory with the following variables:
    ```bash
    INFURA_PROJECT_ID=<Your_Infura_Project_ID>
    WALLET_PK=<Your_Wallet_Private_Key>
    MONGODB_URI=<Your_MongoDB_URI>
    GAS_LIMIT=200000  # Optional: Adjust gas limit
    MAX_FEE_PER_GAS=100  # Optional: Max fee per gas in gwei
    MAX_PRIORITY_FEE_PER_GAS=2  # Optional: Max priority fee per gas in gwei
    WEBHOOK_URL=<Optional_Alert_Webhook_URL>  # For sending alerts via a webhook

    MAX_BUY_PERCENTAGE=50  # Max percentage of wallet balance to use in arbitrage (default 50%)
    BASE_BUY_PERCENTAGE=10  # Base percentage of wallet balance to use in arbitrage (default 10%)
    HIGH_PROFIT_THRESHOLD=0.5  # High profit threshold in ETH (default 0.5 ETH)
    PROFIT_MULTIPLIER=1.5  # Multiplier for high-profit scenarios (default 1.5x)
    ```

## Usage

To run the bot:

1. Start the bot:
    ```bash
    node index.js
    ```

The bot will start monitoring the predefined coins and DEXs for trading opportunities. It will automatically execute arbitrage, front-running, back-running, and sandwich attacks when profitable.

### Environment Variables

The bot relies on several environment variables for configuration. Below is an explanation of the most important ones:

- `INFURA_PROJECT_ID`: Your Infura project ID to connect to the Ethereum mainnet.
- `WALLET_PK`: Your Ethereum wallet private key, used to sign transactions.
- `MONGODB_URI`: URI for MongoDB where trade history will be stored.
- `GAS_LIMIT`: The gas limit to be used in transactions (default: `200000`).
- `MAX_FEE_PER_GAS`: The maximum gas fee in gwei (default: `100`).
- `MAX_PRIORITY_FEE_PER_GAS`: The maximum priority fee in gwei (default: `2`).
- `WEBHOOK_URL`: An optional webhook URL for sending alerts on profitable trades.
- `MAX_BUY_PERCENTAGE`: The maximum percentage of the wallet balance to use in a trade (default: 50%).
- `BASE_BUY_PERCENTAGE`: The base percentage of the wallet balance to use in normal arbitrage trades (default: 10%).
- `HIGH_PROFIT_THRESHOLD`: The minimum profit threshold for "high profit" opportunities in ETH (default: 0.5 ETH).
- `PROFIT_MULTIPLIER`: A multiplier applied to `BASE_BUY_PERCENTAGE` for high-profit scenarios (default: 1.5x).


### Adding More Monitored Pairs

To add new token pairs for monitoring, modify the `MONITORED_PAIRS` array in `bot.js`:

```javascript
const MONITORED_PAIRS = [
  [
    {
      coin: 'ETH',
      address: getAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
    },
    {
      coin: 'DAI',
      address: getAddress('0x6B175474E89094C44Da98b954EedeAC495271d0F')
    }
  ],
  [
    {
      coin: 'ETH',
      address: getAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
    },
    {
      coin: 'AAVE',
      address: getAddress('0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9')
    }
  ],
  // Add more pairs here
];
```
Each pair is an array of two objects that represent the tokens involved. Add more pairs as needed.

### Adding More DEXs

To support additional DEXs, add a new entry to the `DEXs` object in `bot.js`:

```javascript
const DEXs = {
  UNISWAP: {
    name: 'Uniswap',
    factoryAddress: getAddress('0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'),
    routerAddress: getAddress('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'),
    tradingFeePercentage: 0.3
  },
  SUSHISWAP: {
    name: 'Sushiswap',
    factoryAddress: getAddress('0xC0AEe478e3658e2610c5F7A4A2E1777Ce9e4f2Ac'),
    routerAddress: getAddress('0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f'),
    tradingFeePercentage: 0.3
  },
  // Add more DEXs here
};
```

Add more DEXs by providing their factory address, router address, and trading fee percentage.

---




## Testing Locally with Hardhat
To manually manipulate the blockchain state and trigger events such as arbitrage opportunities or front-running scenarios while using Hardhat, follow these steps:

### 1. **Set up Hardhat Forking**

Ensure that your Hardhat is set to fork from the Ethereum mainnet. This has already been set up in `hardhat.config.js`:

```javascript
networks: {
  hardhat: {
    forking: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
  },
},
```

This configuration ensures that you have access to real blockchain data in your local Hardhat network.

### 2. **Run Hardhat Locally**

First, you need to run a local instance of the Hardhat network with forking enabled. Run the following command to start the node:

```bash
npx hardhat node
```

This will fork the Ethereum mainnet locally and simulate a network environment where you can manipulate blockchain data.

### 3. **Access the Hardhat Console**

Once your Hardhat node is running, you can open the console to interact with the local blockchain:

```bash
npx hardhat console --network hardhat
```

This gives you direct access to the blockchain via JavaScript commands.

### 4. **Manipulate Blockchain State**

You can now manipulate the blockchain to simulate different scenarios. Here are a few common examples:

#### A. **Simulating Arbitrage Opportunity**

To simulate an arbitrage opportunity, you can manipulate token prices on different DEXs. Use the Hardhat console to interact with smart contracts, such as setting reserves in liquidity pools.

Example:

- Use Uniswap’s `getReserves()` to fetch the current reserves for a pair and modify them.
  
```javascript
const pair = await ethers.getContractAt('IUniswapV2Pair', '<pair_address>');
const reserves = await pair.getReserves();
console.log('Current reserves:', reserves);

// Manually adjust reserves to create an arbitrage opportunity
await pair.sync({ reserve0: newReserve0, reserve1: newReserve1 });
```

This creates an artificial price discrepancy between two exchanges, which the bot should detect and attempt to exploit.

#### B. **Simulating Large Pending Transactions for Front-Running**

You can simulate a pending large transaction to test front-running. Send a large transaction from one account and use the bot to front-run it.

1. In the console, send a large token swap transaction:

```javascript
const [owner, addr1] = await ethers.getSigners();
const router = await ethers.getContractAt('IUniswapV2Router02', '<router_address>');

await router.swapExactETHForTokens(
  0, // amountOutMin
  ['<WETH_address>', '<TOKEN_address>'], // Path
  addr1.address, // Recipient
  Math.floor(Date.now() / 1000) + 60 * 20, // Deadline
  { value: ethers.utils.parseEther('100') } // Send 100 ETH
);
```

This transaction should trigger the bot's front-running mechanism.

#### C. **Manipulating Balances**

You can modify the account balances to simulate scenarios with larger or smaller holdings:

```javascript
// Give an account more ETH
await network.provider.send("hardhat_setBalance", [
  "0x<address>",
  "0x1000000000000000000" // 1 ETH
]);

// Or for ERC20 tokens:
const token = await ethers.getContractAt('IERC20', '<token_address>');
await token.transfer("0x<address>", ethers.utils.parseEther("1000"));
```

#### D. **Modifying Gas Prices**

You can manipulate gas prices to simulate higher or lower network congestion:

```javascript
await network.provider.send("hardhat_setNextBlockBaseFeePerGas", [
  "0x5000000000" // 21 Gwei base fee
]);
```

### 5. **Testing the Bot**

Once you've set up the desired conditions, you can start the bot in test mode:

```bash
NODE_ENV=test node bot.js
```

The bot should detect these scenarios and execute the corresponding strategies (arbitrage, front-running, etc.).

---





## Deploying on a Low-Latency VPS

To deploy the bot on a low-latency VPS such as AWS or DigitalOcean, follow these steps:

### AWS EC2 Deployment

1. **Launch an EC2 instance**:
    - Choose an instance type (t3.medium or higher recommended for performance).
    - Use the Ubuntu 20.04 LTS AMI for simplicity.

2. **SSH into your instance**:
    ```bash
    ssh -i "your-key.pem" ubuntu@your-ec2-instance-public-ip
    ```

3. **Install Node.js**:
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```

4. **Clone your repository**:
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

5. **Set up environment variables**:
    Create a `.env` file with the variables as described in the "Installation" section.

6. **Install dependencies**:
    ```bash
    npm install
    ```

7. **Run the bot**:
    ```bash
    node index.js
    ```

### DigitalOcean Droplet Deployment

1. **Create a Droplet**:
    - Choose a droplet with 2GB RAM or more.
    - Use Ubuntu 20.04 for simplicity.

2. **SSH into your droplet**:
    ```bash
    ssh root@your-droplet-ip
    ```

3. **Install Node.js and Git**:
    ```bash
    sudo apt update
    sudo apt install nodejs npm git
    ```

4. **Follow steps 4-7 from the AWS EC2 Deployment guide** to clone your repo, set up the environment, and run the bot.

## Logging

The bot logs all trades and errors to a `combined.log` file. Errors are also logged separately in `error.log`. Logging behavior can be customized in the `winston` configuration inside `bot.js`.

## Troubleshooting

- **MongoDB connection issues**: Ensure your `MONGODB_URI` is correct and accessible from your VPS.
- **High gas fees**: Adjust `MAX_FEE_PER_GAS` and `MAX_PRIORITY_FEE_PER_GAS` in your `.env` file to avoid excessively high gas costs.
- **Performance issues**: Consider upgrading your VPS to a higher-tier instance for faster performance.

## Disclaimer

This bot is for educational purposes only. Use it at your own risk.
