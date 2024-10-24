async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  // Pass the deployer's address as the initialOwner argument
  const mockERC20 = await MockERC20.deploy(deployer.address);

  console.log("MockERC20 deployed to:", mockERC20);//0xe58cbe144dd5556c84874dec1b3f2d0d6ac45f1b
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });