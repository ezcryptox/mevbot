const { formatUnits, parseUnits, getAddress } = require('ethers');
const hre = require("hardhat");
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
async function main() {
  const [deployer] = await ethers.getSigners();

  const tokenAddress = getAddress('0xe58cbe144dd5556c84874dec1b3f2d0d6ac45f1b');

  // ABI for the mint function and balanceOf function
  const ERC20_ABI = [
    "function mint(address to, uint256 amount) public",
    "function balanceOf(address owner) view returns (uint256)"
  ];

  const mockToken = new ethers.Contract(tokenAddress, ERC20_ABI, deployer);

  const amountToMint = parseUnits("1000", 18);

  const tx = await mockToken.mint(deployer.address, amountToMint);
  await tx.wait();

  console.log(`Minted 1000 tokens to ${deployer.address}`);

  const newBalance = await mockToken.balanceOf(deployer);
  console.log("Deployer's new balance:", formatUnits(newBalance, 18));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
