pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Products {
    uint public productsCount = 0;

    struct Product {
        uint id;
        string uniqueId;
        string name;
        string sku;
        address owner;
        string image;
        string createdAt;
        bool purchased;
        string purchasedBy;
    }

    mapping(uint => Product) public products;

    event ProductCreated(
        uint id,
        string uniqueId,
        string name,
        string sku,
        address owner,
        string image,
        string createdAt,
        bool purchased,
        string purchasedBy
    );

    event ProductPurchased(
        uint id,
        string uniqueId,
        string name,
        string sku,
        address owner,
        string image,
        string createdAt,
        bool purchased,
        string purchasedBy
    );

    function createProduct(
        string memory _uniqueId,
        string memory _name,
        string memory _sku,
        string memory _image,
        string memory _createdAt
    ) public {
        require(bytes(_uniqueId).length > 0, "Unique ID is required");
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_sku).length > 0, "SKU is required");
        require(bytes(_image).length > 0, "Image is required");
        require(bytes(_createdAt).length > 0, "Created At is required");

        productsCount++;
        products[productsCount] = Product(
            productsCount,
            _uniqueId,
            _name,
            _sku,
            msg.sender,
            _image,
            _createdAt,
            false,
            ""
        );
        emit ProductCreated(
            productsCount,
            _uniqueId,
            _name,
            _sku,
            msg.sender,
            _image,
            _createdAt,
            false,
            ""
        );
    }

    function purchaseProduct(uint _id, string memory _purchasedBy) public {
        Product memory _product = products[_id];
        require(
            _product.id > 0 && _product.id <= productsCount,
            "Product does not exist"
        );
        require(!_product.purchased, "Product is already purchased");

        require(bytes(_purchasedBy).length > 0, "Purchased By is required");

        _product.purchased = true;
        _product.purchasedBy = _purchasedBy;
        products[_id] = _product;

        emit ProductPurchased(
            _id,
            _product.uniqueId,
            _product.name,
            _product.sku,
            _product.owner,
            _product.image,
            _product.createdAt,
            true,
            _purchasedBy
        );
    }

    function getProductsCount() public view returns (uint) {
        return productsCount;
    }

    function getProductsCountByOwner(
        address _owner
    ) public view returns (uint) {
        uint counter = 0;
        for (uint i = 1; i <= productsCount; i++) {
            if (products[i].owner == _owner) {
                counter++;
            }
        }
        return counter;
    }

    function getProduct(
        uint _id
    )
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            string memory,
            bool,
            string memory
        )
    {
        Product memory _product = products[_id];
        return (
            _product.id,
            _product.uniqueId,
            _product.name,
            _product.sku,
            _product.owner,
            _product.image,
            _product.createdAt,
            _product.purchased,
            _product.purchasedBy
        );
    }

    function getAllProductsByOwner(
        address _owner
    ) public view returns (string[] memory) {
        // Return an array of product Unique IDs
        string[] memory productIds = new string[](
            getProductsCountByOwner(_owner)
        );
        uint counter = 0;
        for (uint i = 1; i <= productsCount; i++) {
            if (products[i].owner == _owner) {
                productIds[counter] = products[i].uniqueId;
                counter++;
            }
        }
        return productIds;
    }

    function getAllProducts() public view returns (string[] memory) {
        string[] memory productIds = new string[](productsCount);
        for (uint i = 1; i <= productsCount; i++) {
            productIds[i - 1] = products[i].uniqueId;
        }
        return productIds;
    }

    // Get Product by Unique ID
    function getProductByUniqueId(
        string memory _uniqueId
    )
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            string memory,
            bool,
            string memory
        )
    {
        for (uint i = 1; i <= productsCount; i++) {
            if (
                keccak256(abi.encodePacked(products[i].uniqueId)) ==
                keccak256(abi.encodePacked(_uniqueId))
            ) {
                return getProduct(i);
            }
        }
        return (0, "", "", "", address(0), "", "", false, "");
    }
}
