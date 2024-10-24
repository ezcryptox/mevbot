const {parseEther, formatEther, MaxUint256, Contract, Wallet, ZeroAddress, getAddress, formatUnits } = require('ethers');
const hre = require("hardhat");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const { abi: IERC20_ABI } = require('@openzeppelin/contracts/build/contracts/IERC20.json');

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

async function topup(tokenAddress) {
  const [deployer, recipient] = await hre.ethers.getSigners(); 
  
  const token = new ethers.Contract(tokenAddress, IERC20_ABI, deployer);
  await token.transfer(recipient.address, parseEther("1000"));
}

topup(MONITORED_PAIRS[0][1].address).then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });