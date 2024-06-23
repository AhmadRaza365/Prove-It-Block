// eslint-disable-next-line no-undef
const Products = artifacts.require("Products");

module.exports = function (deployer) {
  deployer.deploy(Products);
};
