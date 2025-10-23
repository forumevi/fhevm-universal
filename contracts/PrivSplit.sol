// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * PrivSplit — Mock version
 * 
 * This contract collects encrypted (FHE) contributions for different groups.
 * Each participant submits an encrypted share, and all shares are stored
 * under a given group ID. In the future, real FHEVM integration will enable
 * true encrypted arithmetic and comparisons directly on-chain.
 */
contract PrivSplit {
    struct EncryptedShare {
        bytes blob;
    }

    // Mapping of groupId → list of encrypted shares
    mapping(bytes32 groupId => EncryptedShare[]) private _shares;

    // Emitted when a user submits an encrypted share
    event ShareSubmitted(bytes32 indexed groupId, address indexed account, bytes blob);

    /**
     * A user submits their encrypted contribution.
     * @param groupId - Unique identifier for the group
     * @param encryptedAmount - The encrypted value (mocked as bytes for now)
     */
    function submitShare(bytes32 groupId, bytes calldata encryptedAmount) external {
        _shares[groupId].push(EncryptedShare({ blob: encryptedAmount }));
        emit ShareSubmitted(groupId, msg.sender, encryptedAmount);
    }

    /**
     * Returns all encrypted shares for a given group.
     * @param groupId - Group identifier
     */
    function getShares(bytes32 groupId) external view returns (EncryptedShare[] memory) {
        return _shares[groupId];
    }

    /**
     * (Mock) Returns a concatenated summary of all encrypted shares in the group.
     * In the real FHEVM integration, this function will perform fully homomorphic
     * aggregation or comparison directly over the encrypted data.
     */
    function encryptedSummary(bytes32 groupId) external view returns (bytes memory) {
        bytes memory out;
        EncryptedShare[] memory arr = _shares[groupId];
        for (uint256 i = 0; i < arr.length; i++) {
            out = bytes.concat(out, arr[i].blob);
        }
        return out;
    }
}
