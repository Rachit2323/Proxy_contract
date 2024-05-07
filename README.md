

## Installation

To install the required Node.js modules, use the following command:`npm i` or `npm i --force`


## Testing

To run unit tests, use: `npx hardhat test`


## Deployment

To deploy the script (on Sepolia), use:, use: `npx hardhat --network sepolia  run scripts/deploy.js `


## Frontend

To start the frontend, use: `npm run dev`


### Note
In hardhat.config.js please add you wallet(metamask) private key , if running locally else live version is running fine.
If you encounter errors in the frontend (locally), make sure to use Ether version of `"ethers": "^5.6.8"`, specifically less than `6.0.0`.

