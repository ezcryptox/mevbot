// scripts/deployMock.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MockUniswapRouter = await ethers.getContractFactory("IUniswapV2Router02");
  const mockRouter = await MockUniswapRouter.deploy();
  console.log("IUniswapV2Router02 deployed to:", mockRouter);//0x5FbDB2315678afecb367f032d93F642f64180aa3
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });