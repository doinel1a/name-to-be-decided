// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// import "hardhat/console.sol";

contract Creators {
    // Mapping to store creator details associated with their addresses
    mapping(address => string) public creators;

    // Struct to define website preferences for each creator
    struct WebsitePreference {
        string name;
        string description;
        string primaryColor;  
        string textColor;     
        string secondaryColor; 
        string bgColor;      
        string logo;
    }

    // Mapping to store website preferences for each creator address
    mapping(address => WebsitePreference) public websitePreferences;

    // Mapping to track claimed slags per creator
    mapping(address => bool) public claimedSlags;

    // Event emitted when a creator claims a slag
    event SlagClaimed(address indexed creator, string slag);

    // Function to check if a slag has been claimed by a creator
    function isSlagClaimed(address creator) public view returns (bool) {
        return claimedSlags[creator];
    }

    function claimSlag(string memory slag) public {
        require(!isSlagClaimed(msg.sender), "Slag already claimed");

        claimedSlags[msg.sender] = true;

        emit SlagClaimed(msg.sender, slag);
    }

    function setWebsitePreferences(
        string memory name,
        string memory description,
        string memory primaryColor,
        string memory textColor,
        string memory secondaryColor,
        string memory bgColor,
        string memory logo
    ) public {
        websitePreferences[msg.sender] = WebsitePreference({
            name: name,
            description: description,
            primaryColor: primaryColor,
            textColor: textColor,
            secondaryColor: secondaryColor,
            bgColor: bgColor,
            logo: logo
        });
    }

    function getWebsitePreferences() public view returns (WebsitePreference memory) {
        return websitePreferences[msg.sender];
    }
}