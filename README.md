```md
# MEVBot - Configuration and Usage

This is a README file for configuring and running the MEVBot to detect and execute various trading strategies like arbitrage, front-running, back-running, and sandwiching. The bot is built using the `ethers.js` library and interacts with decentralized exchanges (DEXs) such as Uniswap and Sushiswap to exploit trading opportunities.

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
- `SLIPPAGE_TOLERANCE`: Tolerance for slippage in trades.
- `ARBITRAGE_THRESHOLDS`: Profit thresholds for arbitrage, defined as JSON for each coin.
- `WEBHOOK_URL`: An optional webhook URL for sending alerts on profitable trades.
- `MAX_BUY_PERCENTAGE`: The maximum percentage of the wallet balance to use in a trade (default: 50%).
- `BASE_BUY_PERCENTAGE`: The base percentage of the wallet balance to use in normal arbitrage trades (default: 10%).
- `HIGH_PROFIT_THRESHOLD`: The minimum profit threshold for "high profit" opportunities in ETH (default: 0.5 ETH).
- `PROFIT_MULTIPLIER`: A multiplier applied to `BASE_BUY_PERCENTAGE` for high-profit scenarios (default: 1.5x).


## Adding More Coins to Monitor

By default, the bot monitors Ethereum (ETH) and Bitcoin (BTC). You can add more coins to the `MONITORED_COINS` array in `bot.js`:

```javascript
const MONITORED_COINS = ['ETH', 'BTC', 'DAI', 'USDT'];
```

Make sure to add the respective contract addresses in the DEX configurations within the `DEXs` object:

```javascript
assets: {
  ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  BTC: '0xYourBTCContractAddress',
  DAI: '0xYourDAIContractAddress',
  USDT: '0xYourUSDTContractAddress'
}
```

## Adding More DEXs

You can expand the bot to monitor more decentralized exchanges by adding new entries to the `DEXs` object in `bot.js`. Each DEX requires its factory address, router address, and the trading pairs:

```javascript
const DEXs = {
  UNISWAP: {
    name: 'Uniswap',
    factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    assets: {
      ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      BTC: '0xYourBTCContractAddress'
    },
    tradingFeePercentage: 0.3
  },
  SUSHISWAP: {
    name: 'Sushiswap',
    factoryAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    routerAddress: '0xd9e1CE17f2641f24aE83637ab66a2cca9C378B9F',
    assets: {
      ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      BTC: '0xYourBTCContractAddress'
    },
    tradingFeePercentage: 0.3
  }
};
```

To add another DEX, simply follow the same pattern and ensure to provide the correct contract addresses and assets.

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
