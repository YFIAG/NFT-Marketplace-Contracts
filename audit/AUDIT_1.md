# A. YFIAG Launchpad
-   A.1: Possible absence of NFT with RootId : Fixed ✅
-   A.2: Centralization of setWinners(): Acknownedged 
-   A.3: Admin can withdraw all stake tokens: Fixed ✅
-   A.4: Unsafe to rely on isContract(): Fixed (using onlyEOA modifier) ✅
-   A.5: handle error when staking to non existent pool: Fixed (Add launchpadNotFound(launchpadId)  modifier) ✅
-   A.6: Redundant code block: Fixed ✅
-   A.7: Missing Zero Address Check : Fixed ✅
-   A.8: Redundant Statements: Fixed ✅
-   A.9: modifier launchpadNotFound checks <= instead of only < sign : Fixed ✅
-   A.10: Unnecessary use of nonReentrant modifier: Fixed ✅
-   A.11: Unnecessary use of storage keyword: Fixed ✅
# B. Contract - YFIAGNftMarketplace
-   B.1: Part A- User’s Ether can get stuck in the contract: Fixed ✅
-   B.2: Part B- Malicious admin can withdraw all stuck ether: Fixed ✅
-   B.3: Non-owner can burn any NFT: Fixed ( Only rootToken can be burned by launchpad) ✅
-   B.4: Part A- Denial of Service via setDefaultAmountEarn(): Fixed ✅
-   B.5: Part B- Potential Denial of Service via setPool(): Fixed (Transfer all fund of old pool to new pool) ✅
-   B.6: Uninitialized YFIAGPool and _launchpad : Acknownedged
-   B.7: For loop over Dynamic array : Fixed (Clamping Max_fragment between 0 - 5000) ✅
-   B.8: Missing Zero Address Check: Fixed ✅
-   B.9: Misleading name/execution of burnByLaunchPad() : Fixed ✅
-   B.10: Misleading name/execution of burnByLaunchPad() : Fixed ✅
-   B.11: Transaction Order Dependence in setPriceAndSell() and buy() : Fixed ✅
-   B.12: Missing events for Critical functions : Fixed ✅
# C. Contract - ERC721 (Modified)
-   C.1: Misleading name of isRootToken() and isFragments() : Fixed ✅
-   C.2: Usage of ERC721Enumerable pattern is costly: Acknownedged
-   C.3: Missing zero address check in setAdmin(): Fixed ✅
# D. Contract - YFIAGNftPool
-   D.1: Admin can withdraw all funds and Deny subowner fees: Fixed ✅
-   D.2 : Use of transferFrom instead of transfer: Fixed ✅
-   D.3: Missing Zero Address Check: Fixed ✅
-   D.4: Redundant Function : Fixed ✅
-   D.6: Unnecessary use of nonReentrant modifier: Fixed ✅
# E. Contract - YFIAGNftBridgeTreasury : Removed

# F. Common issues
-   F.1: Private key visible: Acknownedged
-   F.2: Renounce Ownership : Acknownedged
-   F.3: Poor Test coverage : Acknownedged
-   F.4: Unlocked pragma ( pragma solidity ^0.8.0 ): Fixed ✅



