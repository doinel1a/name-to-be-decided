import {
    prepareEvent,
    prepareContractCall,
    readContract,
    type BaseTransactionOptions,
    type AbiParameterToPrimitiveType,
  } from "thirdweb";
  
  /**
  * Contract events
  */
  
  
  
  /**
   * Creates an event object for the ContractURIUpdated event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { contractURIUpdatedEvent } from "TODO";
   *
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  contractURIUpdatedEvent()
   * ],
   * });
   * ```
   */
  export function contractURIUpdatedEvent() {
    return prepareEvent({
      signature: "event ContractURIUpdated(string prevURI, string newURI)",
    });
  };
    
  
  /**
   * Represents the filters for the "HandleClaimed" event.
   */
  export type HandleClaimedEventFilters = Partial<{
    creator: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"creator","type":"address"}>
  }>;
  
  /**
   * Creates an event object for the HandleClaimed event.
   * @param filters - Optional filters to apply to the event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { handleClaimedEvent } from "TODO";
   *
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  handleClaimedEvent({
   *  creator: ...,
   * })
   * ],
   * });
   * ```
   */
  export function handleClaimedEvent(filters: HandleClaimedEventFilters = {}) {
    return prepareEvent({
      signature: "event HandleClaimed(address indexed creator, string handle)",
      filters,
    });
  };
    
  
  
  
  /**
   * Creates an event object for the Initialized event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { initializedEvent } from "TODO";
   *
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  initializedEvent()
   * ],
   * });
   * ```
   */
  export function initializedEvent() {
    return prepareEvent({
      signature: "event Initialized(uint8 version)",
    });
  };
    
  
  /**
   * Represents the filters for the "RoleAdminChanged" event.
   */
  export type RoleAdminChangedEventFilters = Partial<{
    role: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"}>
  previousAdminRole: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"}>
  newAdminRole: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}>
  }>;
  
  /**
   * Creates an event object for the RoleAdminChanged event.
   * @param filters - Optional filters to apply to the event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { roleAdminChangedEvent } from "TODO";
   *
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  roleAdminChangedEvent({
   *  role: ...,
   *  previousAdminRole: ...,
   *  newAdminRole: ...,
   * })
   * ],
   * });
   * ```
   */
  export function roleAdminChangedEvent(filters: RoleAdminChangedEventFilters = {}) {
    return prepareEvent({
      signature: "event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)",
      filters,
    });
  };
    
  
  /**
   * Represents the filters for the "RoleGranted" event.
   */
  export type RoleGrantedEventFilters = Partial<{
    role: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"account","type":"address"}>
  sender: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"sender","type":"address"}>
  }>;
  
  /**
   * Creates an event object for the RoleGranted event.
   * @param filters - Optional filters to apply to the event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { roleGrantedEvent } from "TODO";
   *
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  roleGrantedEvent({
   *  role: ...,
   *  account: ...,
   *  sender: ...,
   * })
   * ],
   * });
   * ```
   */
  export function roleGrantedEvent(filters: RoleGrantedEventFilters = {}) {
    return prepareEvent({
      signature: "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)",
      filters,
    });
  };
    
  
  /**
   * Represents the filters for the "RoleRevoked" event.
   */
  export type RoleRevokedEventFilters = Partial<{
    role: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"account","type":"address"}>
  sender: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"sender","type":"address"}>
  }>;
  
  /**
   * Creates an event object for the RoleRevoked event.
   * @param filters - Optional filters to apply to the event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { roleRevokedEvent } from "TODO";
   *
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  roleRevokedEvent({
   *  role: ...,
   *  account: ...,
   *  sender: ...,
   * })
   * ],
   * });
   * ```
   */
  export function roleRevokedEvent(filters: RoleRevokedEventFilters = {}) {
    return prepareEvent({
      signature: "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)",
      filters,
    });
  };
    
  
  /**
  * Contract read functions
  */
  
  
  
  /**
   * Calls the "DEFAULT_ADMIN_ROLE" function on the contract.
   * @param options - The options for the DEFAULT_ADMIN_ROLE function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { DEFAULT_ADMIN_ROLE } from "TODO";
   *
   * const result = await DEFAULT_ADMIN_ROLE();
   *
   * ```
   */
  export async function DEFAULT_ADMIN_ROLE(
    options: BaseTransactionOptions
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0xa217fddf",
    [],
    [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ]
  ],
      params: []
    });
  };
  
  
  
  
  /**
   * Calls the "NATIVE_TOKEN" function on the contract.
   * @param options - The options for the NATIVE_TOKEN function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { NATIVE_TOKEN } from "TODO";
   *
   * const result = await NATIVE_TOKEN();
   *
   * ```
   */
  export async function NATIVE_TOKEN(
    options: BaseTransactionOptions
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x31f7d964",
    [],
    [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ]
  ],
      params: []
    });
  };
  
  
  /**
   * Represents the parameters for the "claimedHandles" function.
   */
  export type ClaimedHandlesParams = {
    arg_0: AbiParameterToPrimitiveType<{"internalType":"string","name":"","type":"string"}>
  };
  
  /**
   * Calls the "claimedHandles" function on the contract.
   * @param options - The options for the claimedHandles function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { claimedHandles } from "TODO";
   *
   * const result = await claimedHandles({
   *  arg_0: ...,
   * });
   *
   * ```
   */
  export async function claimedHandles(
    options: BaseTransactionOptions<ClaimedHandlesParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x63248630",
    [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  ],
      params: [options.arg_0]
    });
  };
  
  
  
  
  /**
   * Calls the "contractURI" function on the contract.
   * @param options - The options for the contractURI function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { contractURI } from "TODO";
   *
   * const result = await contractURI();
   *
   * ```
   */
  export async function contractURI(
    options: BaseTransactionOptions
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0xe8a3d485",
    [],
    [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ]
  ],
      params: []
    });
  };
  
  
  /**
   * Represents the parameters for the "creators" function.
   */
  export type CreatorsParams = {
    arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
  };
  
  /**
   * Calls the "creators" function on the contract.
   * @param options - The options for the creators function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { creators } from "TODO";
   *
   * const result = await creators({
   *  arg_0: ...,
   * });
   *
   * ```
   */
  export async function creators(
    options: BaseTransactionOptions<CreatorsParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x933166e1",
    [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    [
      {
        "internalType": "string",
        "name": "handle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "subscriptionContract",
        "type": "string"
      }
    ]
  ],
      params: [options.arg_0]
    });
  };
  
  
  /**
   * Represents the parameters for the "getRoleAdmin" function.
   */
  export type GetRoleAdminParams = {
    role: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"role","type":"bytes32"}>
  };
  
  /**
   * Calls the "getRoleAdmin" function on the contract.
   * @param options - The options for the getRoleAdmin function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { getRoleAdmin } from "TODO";
   *
   * const result = await getRoleAdmin({
   *  role: ...,
   * });
   *
   * ```
   */
  export async function getRoleAdmin(
    options: BaseTransactionOptions<GetRoleAdminParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x248a9ca3",
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ]
  ],
      params: [options.role]
    });
  };
  
  
  /**
   * Represents the parameters for the "getSubscriptionContract" function.
   */
  export type GetSubscriptionContractParams = {
    creatorAddress: AbiParameterToPrimitiveType<{"internalType":"address","name":"creatorAddress","type":"address"}>
  };
  
  /**
   * Calls the "getSubscriptionContract" function on the contract.
   * @param options - The options for the getSubscriptionContract function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { getSubscriptionContract } from "TODO";
   *
   * const result = await getSubscriptionContract({
   *  creatorAddress: ...,
   * });
   *
   * ```
   */
  export async function getSubscriptionContract(
    options: BaseTransactionOptions<GetSubscriptionContractParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x7a8e0fcf",
    [
      {
        "internalType": "address",
        "name": "creatorAddress",
        "type": "address"
      }
    ],
    [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ]
  ],
      params: [options.creatorAddress]
    });
  };
  
  
  /**
   * Represents the parameters for the "getWebsitePreferencesByHandle" function.
   */
  export type GetWebsitePreferencesByHandleParams = {
    handle: AbiParameterToPrimitiveType<{"internalType":"string","name":"handle","type":"string"}>
  };
  
  /**
   * Calls the "getWebsitePreferencesByHandle" function on the contract.
   * @param options - The options for the getWebsitePreferencesByHandle function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { getWebsitePreferencesByHandle } from "TODO";
   *
   * const result = await getWebsitePreferencesByHandle({
   *  handle: ...,
   * });
   *
   * ```
   */
  export async function getWebsitePreferencesByHandle(
    options: BaseTransactionOptions<GetWebsitePreferencesByHandleParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x0c2298ee",
    [
      {
        "internalType": "string",
        "name": "handle",
        "type": "string"
      }
    ],
    [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "logo",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "textColor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "secondaryColor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "primaryColor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "bgColor",
            "type": "uint8"
          }
        ],
        "internalType": "struct Conecto.WebsitePreference",
        "name": "",
        "type": "tuple"
      }
    ]
  ],
      params: [options.handle]
    });
  };
  
  
  /**
   * Represents the parameters for the "handleWebsitePreferences" function.
   */
  export type HandleWebsitePreferencesParams = {
    arg_0: AbiParameterToPrimitiveType<{"internalType":"string","name":"","type":"string"}>
  };
  
  /**
   * Calls the "handleWebsitePreferences" function on the contract.
   * @param options - The options for the handleWebsitePreferences function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { handleWebsitePreferences } from "TODO";
   *
   * const result = await handleWebsitePreferences({
   *  arg_0: ...,
   * });
   *
   * ```
   */
  export async function handleWebsitePreferences(
    options: BaseTransactionOptions<HandleWebsitePreferencesParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0xcce504fe",
    [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "logo",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "textColor",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "secondaryColor",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "primaryColor",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "bgColor",
        "type": "uint8"
      }
    ]
  ],
      params: [options.arg_0]
    });
  };
  
  
  /**
   * Represents the parameters for the "hasRole" function.
   */
  export type HasRoleParams = {
    role: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"internalType":"address","name":"account","type":"address"}>
  };
  
  /**
   * Calls the "hasRole" function on the contract.
   * @param options - The options for the hasRole function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { hasRole } from "TODO";
   *
   * const result = await hasRole({
   *  role: ...,
   *  account: ...,
   * });
   *
   * ```
   */
  export async function hasRole(
    options: BaseTransactionOptions<HasRoleParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x91d14854",
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  ],
      params: [options.role, options.account]
    });
  };
  
  
  /**
   * Represents the parameters for the "hasRoleWithSwitch" function.
   */
  export type HasRoleWithSwitchParams = {
    role: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"internalType":"address","name":"account","type":"address"}>
  };
  
  /**
   * Calls the "hasRoleWithSwitch" function on the contract.
   * @param options - The options for the hasRoleWithSwitch function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { hasRoleWithSwitch } from "TODO";
   *
   * const result = await hasRoleWithSwitch({
   *  role: ...,
   *  account: ...,
   * });
   *
   * ```
   */
  export async function hasRoleWithSwitch(
    options: BaseTransactionOptions<HasRoleWithSwitchParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0xa32fa5b3",
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  ],
      params: [options.role, options.account]
    });
  };
  
  
  /**
   * Represents the parameters for the "isTrustedForwarder" function.
   */
  export type IsTrustedForwarderParams = {
    forwarder: AbiParameterToPrimitiveType<{"internalType":"address","name":"forwarder","type":"address"}>
  };
  
  /**
   * Calls the "isTrustedForwarder" function on the contract.
   * @param options - The options for the isTrustedForwarder function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { isTrustedForwarder } from "TODO";
   *
   * const result = await isTrustedForwarder({
   *  forwarder: ...,
   * });
   *
   * ```
   */
  export async function isTrustedForwarder(
    options: BaseTransactionOptions<IsTrustedForwarderParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x572b6c05",
    [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  ],
      params: [options.forwarder]
    });
  };
  
  
  
  
  /**
   * Calls the "saleRecipient" function on the contract.
   * @param options - The options for the saleRecipient function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { saleRecipient } from "TODO";
   *
   * const result = await saleRecipient();
   *
   * ```
   */
  export async function saleRecipient(
    options: BaseTransactionOptions
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x5b019b76",
    [],
    [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ]
  ],
      params: []
    });
  };
  
  
  /**
  * Contract write functions
  */
  
  /**
   * Represents the parameters for the "claimHandle" function.
   */
  export type ClaimHandleParams = {
    handle: AbiParameterToPrimitiveType<{"internalType":"string","name":"handle","type":"string"}>
  };
  
  /**
   * Calls the "claimHandle" function on the contract.
   * @param options - The options for the "claimHandle" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { claimHandle } from "TODO";
   *
   * const transaction = claimHandle({
   *  handle: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function claimHandle(
    options: BaseTransactionOptions<ClaimHandleParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0xe0edbc34",
    [
      {
        "internalType": "string",
        "name": "handle",
        "type": "string"
      }
    ],
    []
  ],
      params: [options.handle]
    });
  };
  
  
  /**
   * Represents the parameters for the "grantRole" function.
   */
  export type GrantRoleParams = {
    role: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"internalType":"address","name":"account","type":"address"}>
  };
  
  /**
   * Calls the "grantRole" function on the contract.
   * @param options - The options for the "grantRole" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { grantRole } from "TODO";
   *
   * const transaction = grantRole({
   *  role: ...,
   *  account: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function grantRole(
    options: BaseTransactionOptions<GrantRoleParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0x2f2ff15d",
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    []
  ],
      params: [options.role, options.account]
    });
  };
  
  
  /**
   * Represents the parameters for the "multicall" function.
   */
  export type MulticallParams = {
    data: AbiParameterToPrimitiveType<{"internalType":"bytes[]","name":"data","type":"bytes[]"}>
  };
  
  /**
   * Calls the "multicall" function on the contract.
   * @param options - The options for the "multicall" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { multicall } from "TODO";
   *
   * const transaction = multicall({
   *  data: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function multicall(
    options: BaseTransactionOptions<MulticallParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0xac9650d8",
    [
      {
        "internalType": "bytes[]",
        "name": "data",
        "type": "bytes[]"
      }
    ],
    [
      {
        "internalType": "bytes[]",
        "name": "results",
        "type": "bytes[]"
      }
    ]
  ],
      params: [options.data]
    });
  };
  
  
  /**
   * Represents the parameters for the "renounceRole" function.
   */
  export type RenounceRoleParams = {
    role: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"internalType":"address","name":"account","type":"address"}>
  };
  
  /**
   * Calls the "renounceRole" function on the contract.
   * @param options - The options for the "renounceRole" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { renounceRole } from "TODO";
   *
   * const transaction = renounceRole({
   *  role: ...,
   *  account: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function renounceRole(
    options: BaseTransactionOptions<RenounceRoleParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0x36568abe",
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    []
  ],
      params: [options.role, options.account]
    });
  };
  
  
  /**
   * Represents the parameters for the "revokeRole" function.
   */
  export type RevokeRoleParams = {
    role: AbiParameterToPrimitiveType<{"internalType":"bytes32","name":"role","type":"bytes32"}>
  account: AbiParameterToPrimitiveType<{"internalType":"address","name":"account","type":"address"}>
  };
  
  /**
   * Calls the "revokeRole" function on the contract.
   * @param options - The options for the "revokeRole" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { revokeRole } from "TODO";
   *
   * const transaction = revokeRole({
   *  role: ...,
   *  account: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function revokeRole(
    options: BaseTransactionOptions<RevokeRoleParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0xd547741f",
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    []
  ],
      params: [options.role, options.account]
    });
  };
  
  
  /**
   * Represents the parameters for the "setContractURI" function.
   */
  export type SetContractURIParams = {
    uri: AbiParameterToPrimitiveType<{"internalType":"string","name":"_uri","type":"string"}>
  };
  
  /**
   * Calls the "setContractURI" function on the contract.
   * @param options - The options for the "setContractURI" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { setContractURI } from "TODO";
   *
   * const transaction = setContractURI({
   *  uri: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function setContractURI(
    options: BaseTransactionOptions<SetContractURIParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0x938e3d7b",
    [
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    []
  ],
      params: [options.uri]
    });
  };
  
  
  /**
   * Represents the parameters for the "setSubscriptionContract" function.
   */
  export type SetSubscriptionContractParams = {
    creatorAddress: AbiParameterToPrimitiveType<{"internalType":"address","name":"creatorAddress","type":"address"}>
  subscriptionContract: AbiParameterToPrimitiveType<{"internalType":"string","name":"subscriptionContract","type":"string"}>
  };
  
  /**
   * Calls the "setSubscriptionContract" function on the contract.
   * @param options - The options for the "setSubscriptionContract" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { setSubscriptionContract } from "TODO";
   *
   * const transaction = setSubscriptionContract({
   *  creatorAddress: ...,
   *  subscriptionContract: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function setSubscriptionContract(
    options: BaseTransactionOptions<SetSubscriptionContractParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0xbe00aab6",
    [
      {
        "internalType": "address",
        "name": "creatorAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "subscriptionContract",
        "type": "string"
      }
    ],
    []
  ],
      params: [options.creatorAddress, options.subscriptionContract]
    });
  };
  
  
  /**
   * Represents the parameters for the "setWebsitePreferences" function.
   */
  export type SetWebsitePreferencesParams =
   {
    creatorAddress: AbiParameterToPrimitiveType<{"internalType":"address","name":"creatorAddress","type":"address"}>
  websitePreference: AbiParameterToPrimitiveType<{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"logo","type":"string"},{"internalType":"uint8","name":"textColor","type":"uint8"},{"internalType":"uint8","name":"secondaryColor","type":"uint8"},{"internalType":"uint8","name":"primaryColor","type":"uint8"},{"internalType":"uint8","name":"bgColor","type":"uint8"}],"internalType":"struct Conecto.WebsitePreference","name":"_websitePreference","type":"tuple"}>
  };
  
  /**
   * Calls the "setWebsitePreferences" function on the contract.
   * @param options - The options for the "setWebsitePreferences" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { setWebsitePreferences } from "TODO";
   *
   * const transaction = setWebsitePreferences({
   *  creatorAddress: ...,
   *  websitePreference: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function setWebsitePreferences(
    options: BaseTransactionOptions<SetWebsitePreferencesParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0xb33b7293",
    [
      {
        "internalType": "address",
        "name": "creatorAddress",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "logo",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "textColor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "secondaryColor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "primaryColor",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "bgColor",
            "type": "uint8"
          }
        ],
        "internalType": "struct Conecto.WebsitePreference",
        "name": "_websitePreference",
        "type": "tuple"
      }
    ],
    []
  ],
      params: [options.creatorAddress, options.websitePreference]
    });
  };
  
  
  