const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("cal3");
  const contract = await Contract.deploy();

  await contract.deployed();

  saveFrontendFiles();

  console.log("cal3 deployed to:", contract.address);
}

function saveFrontendFiles() {
  const fs = require("fs");

  const abiDir = __dirname + "/../frontend/src/abis";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const artifact = artifacts.readArtifactSync("cal3");

  fs.writeFileSync(
    abiDir + "/cal3.json",
    JSON.stringify(artifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
