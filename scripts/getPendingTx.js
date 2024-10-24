
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
async function main() {
  const addressToCheck = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  const pendingCount = await provider.getTransactionCount(addressToCheck, "pending");
  console.log(`Pending transaction count for ${addressToCheck}:`, pendingCount);

  const pendingBlock1 = await provider.getBlock('pending');
  if (!pendingBlock1 || !pendingBlock1.transactions.length) {
    console.log('No pending transactions 1 ', pendingBlock1?.transactions);
  }

  const pendingBlock = await provider.send('eth_getBlockByNumber', ['pending', false]);

  if (!pendingBlock || !pendingBlock.transactions.length) {
    console.log('No pending transactions ', pendingBlock.transactions);
    return;
  }

   console.log('PENDING Blocks', pendingBlock.transactions)
}

main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });