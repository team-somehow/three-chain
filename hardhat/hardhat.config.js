require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const { ALCHEMY_URL, MATIC_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/" + ALCHEMY_URL,
      accounts: [`0x${MATIC_PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
};
