// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@thirdweb-dev/contracts/external-deps/openzeppelin/metatx/ERC2771ContextUpgradeable.sol";
import "@thirdweb-dev/contracts/extension/Multicall.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@thirdweb-dev/contracts/lib/CurrencyTransferLib.sol";
import "@thirdweb-dev/contracts/extension/upgradeable/Permissions.sol";
import "@thirdweb-dev/contracts/extension/upgradeable/ContractMetadata.sol";

contract Conecto is Permissions, ContractMetadata, ERC2771ContextUpgradeable, Multicall {
    using StringsUpgradeable for uint256;

    address public constant NATIVE_TOKEN = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    address public saleRecipient;

    // Struct to define website preferences for each creator
    struct WebsitePreference {
        string name;
        string description;
        string logo;
        uint8 textColor;
        uint8 secondaryColor;
        uint8 primaryColor;
        uint8 bgColor;
    }

    struct CreatorInfo {
        string handle;
        string subscriptionContract;
    }

    // Mapping to store creator details associated with their addresses
    mapping(address => CreatorInfo) public creators;

    mapping(string => WebsitePreference) public handleWebsitePreferences;

    // Mapping to track claimed handles per creator
    mapping(string => bool) public claimedHandles;

    // Event emitted when a creator claims an handle
    event HandleClaimed(address indexed creator, string handle);

    constructor(address _adminAddress, string memory _contractURI) {
        saleRecipient = _adminAddress;
        _setupRole(DEFAULT_ADMIN_ROLE, _adminAddress);
        _setupContractURI(_contractURI);
    }

    function claimHandle(string memory handle) public payable {
        require(bytes(handle).length > 0, "Handle cannot be empty");
        require(bytes(creators[_msgSender()].handle).length == 0, "Creator has already a subscription contract");

        string memory _lowerName = validateAndLowerHandle(handle);

        require(!_isHandleClaimed(_lowerName), "Handle already claimed");

        CurrencyTransferLib.transferCurrency(NATIVE_TOKEN, _msgSender(), saleRecipient, 0.01 ether);

        claimedHandles[_lowerName] = true;

        creators[_msgSender()].handle = handle;

        emit HandleClaimed(_msgSender(), handle);
    }

    function setSubscriptionContract(address creatorAddress, string memory subscriptionContract) public onlyRole(DEFAULT_ADMIN_ROLE){
        creators[creatorAddress].subscriptionContract = subscriptionContract;
    }

    function getSubscriptionContract(address creatorAddress) public view returns (string memory) {
        return creators[creatorAddress].subscriptionContract;
    }

    function setWebsitePreferences(address creatorAddress, WebsitePreference memory _websitePreference) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(bytes(creators[creatorAddress].handle).length > 0, "Creator hasn't redeemed an handle yet");
        handleWebsitePreferences[creators[_msgSender()].handle] = _websitePreference;
    }

    function getWebsitePreferencesByHandle(string memory handle) public view returns (WebsitePreference memory)
    {
        return handleWebsitePreferences[handle];
    }

    // Function to check if an handle has been claimed already
    function _isHandleClaimed(string memory handle) internal view returns (bool) {
        return claimedHandles[handle];
    }

    /// @dev Checks whether contract metadata can be set in the given execution context.
    function _canSetContractURI() internal view override returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function validateAndLowerHandle(
        string memory _handle
    ) internal pure returns (string memory) {
        bytes memory handle = abi.encodePacked(_handle);
        uint256 len = handle.length;
        require(len != 0, "handle must be at least one character");
        require(len < 26, "handle can't be greater than 25 characters");
        uint256 char = uint256(uint8(handle[0]));
        require(char != 32, "First char of the handle can't be a space");
        char = uint256(uint8(handle[len - 1]));
        require(char != 32, "Last char of the handle can't be a space");
        for (uint256 i = 0; i < len; i++) {
            char = uint256(uint8(handle[i]));
            require(
                char > 31 && char < 127,
                "Invalid character in the handle."
            );
            require(char != 34, 'handle cannot contain the " character');
            if (char < 91 && char > 64) {
                handle[i] = bytes1(uint8(char + 32));
            }
        }
        return string(handle);
    }

    function _msgSender()
        internal
        view
        override(ERC2771ContextUpgradeable, Multicall, Permissions)
        returns (address sender)
    {
        return ERC2771ContextUpgradeable._msgSender();
    }

    function _msgData()
        internal
        view
        override(Permissions, ERC2771ContextUpgradeable)
        returns (bytes calldata)
    {
        return ERC2771ContextUpgradeable._msgData();
    }
}
