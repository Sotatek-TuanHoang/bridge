import { PublicKey, SmartContract, State, UInt64 } from 'o1js';
declare const UnlockEvent_base: (new (value: {
    receiver: PublicKey;
    tokenAddress: PublicKey;
    amount: UInt64;
    id: UInt64;
}) => {
    receiver: PublicKey;
    tokenAddress: PublicKey;
    amount: UInt64;
    id: UInt64;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky.js").ProvablePure<{
    receiver: PublicKey;
    tokenAddress: PublicKey;
    amount: UInt64;
    id: UInt64;
}> & {
    toInput: (x: {
        receiver: PublicKey;
        tokenAddress: PublicKey;
        amount: UInt64;
        id: UInt64;
    }) => {
        fields?: import("o1js/dist/node/lib/field.js").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        receiver: PublicKey;
        tokenAddress: PublicKey;
        amount: UInt64;
        id: UInt64;
    }) => {
        receiver: string;
        tokenAddress: string;
        amount: string;
        id: string;
    };
    fromJSON: (x: {
        receiver: string;
        tokenAddress: string;
        amount: string;
        id: string;
    }) => {
        receiver: PublicKey;
        tokenAddress: PublicKey;
        amount: UInt64;
        id: UInt64;
    };
    empty: () => {
        receiver: PublicKey;
        tokenAddress: PublicKey;
        amount: UInt64;
        id: UInt64;
    };
};
declare class UnlockEvent extends UnlockEvent_base {
    constructor(receiver: PublicKey, tokenAddress: PublicKey, amount: UInt64, id: UInt64);
}
declare const LockEvent_base: (new (value: {
    tokenAddress: PublicKey;
    amount: UInt64;
}) => {
    tokenAddress: PublicKey;
    amount: UInt64;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky.js").ProvablePure<{
    tokenAddress: PublicKey;
    amount: UInt64;
}> & {
    toInput: (x: {
        tokenAddress: PublicKey;
        amount: UInt64;
    }) => {
        fields?: import("o1js/dist/node/lib/field.js").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        tokenAddress: PublicKey;
        amount: UInt64;
    }) => {
        tokenAddress: string;
        amount: string;
    };
    fromJSON: (x: {
        tokenAddress: string;
        amount: string;
    }) => {
        tokenAddress: PublicKey;
        amount: UInt64;
    };
    empty: () => {
        tokenAddress: PublicKey;
        amount: UInt64;
    };
};
declare class LockEvent extends LockEvent_base {
    constructor(tokenAddress: PublicKey, amount: UInt64);
}
export declare class Bridge extends SmartContract {
    minter: State<PublicKey>;
    events: {
        Unlock: typeof UnlockEvent;
        Lock: typeof LockEvent;
    };
    decrementBalance(amount: UInt64): void;
    setMinter(_minter: PublicKey): void;
    unlock(tokenAddress: PublicKey, amount: UInt64, receiver: PublicKey, id: UInt64): void;
}
export {};
