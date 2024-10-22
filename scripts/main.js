const hre = require("hardhat");

async function main() {
  await hre.network.provider.send("evm_setIntervalMining", [3000]); // Mine every 3 seconds
  console.log("Mining interval set to 3 seconds");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
