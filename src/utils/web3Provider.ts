import Web3 from 'web3';
import ProductsContract from '../contracts/Products.json';

// Create a new instance of Web3
const web3 = new Web3(window.ethereum);

const contractABI = ProductsContract.abi;
const contractAddress = ProductsContract.networks[5777].address;

const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };