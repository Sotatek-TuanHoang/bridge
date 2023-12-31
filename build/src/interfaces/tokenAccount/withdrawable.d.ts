import type { AccountUpdate, UInt64 } from 'snarkyjs';
interface Withdrawable {
    withdraw: (amount: UInt64) => AccountUpdate;
}
export default Withdrawable;
