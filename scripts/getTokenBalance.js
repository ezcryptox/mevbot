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
const ERC20_ABI = [
  "function name() view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

async function getBalance(tokenAddress) {
  const hardhatAccounts = await provider.listAccounts();
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [balance, decimals] = await Promise.all([tokenContract.balanceOf(hardhatAccounts[0].address), tokenContract.decimals()]);
  console.log(`TOKEN BALANCE => `, formatUnits(balance, decimals));
}


getBalance(MONITORED_PAIRS[0][0].address).then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });