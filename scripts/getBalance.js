const { ethers, toBigInt, parseUnits, parseEther, formatEther, MaxUint256, Contract, Wallet, ZeroAddress, getAddress, formatUnits } = require('ethers');
const hre = require("hardhat");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const MONITORED_PAIRS = [[{
  coin: 'ETH', // WETH
  address: getAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
}, {
  coin: 'AAVE',
  address: getAddress('0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9')
}
], [{
  coin: 'ETH',
  address: getAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
}, {
  coin: 'DAI',
  address: getAddress('0x6B175474E89094C44Da98b954EedeAC495271d0F')
}]];


const DEX_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactETHForTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      }
    ],
    "name": "getAmountsOut",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapExactTokensForETH",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function getPriceFromDEX(routerAddress, tokenIn, tokenOut) {

  
  
  const router = new ethers.Contract(routerAddress, DEX_ABI, provider);
  console.log(`${routerAddress} :::> Getting Amounts for ${parseEther('1')}, => ${tokenIn} : ${tokenOut}`,)
  const amounts = await router.getAmountsOut(parseEther('1'), [tokenIn, tokenOut]);
  console.log(`Amounts => ${amounts}`, parseFloat(formatEther(amounts[1])))
}


getPriceFromDEX('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',MONITORED_PAIRS[0][1].address, MONITORED_PAIRS[0][0].address).then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });