const {  getAddress, parseEther } = require('ethers');
// Constants
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
async function main() {
  const [owner, addr1] = await ethers.getSigners();

  console.log('Get balance > ', await owner.getBalance())
  const router = await ethers.getContractAt('IUniswapV2Router02', '0x5FbDB2315678afecb367f032d93F642f64180aa3');

  await router.swapExactETHForTokens(
    0, // amountOutMin
    [MONITORED_PAIRS[0][0].address, MONITORED_PAIRS[0][1].address], // Path
    addr1.address, // Recipient
    Math.floor(Date.now() / 1000) + 60 * 20, // Deadline
    { value: parseEther('200') } // Send 100 ETH
  );
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });