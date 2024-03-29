import type { AccountUpdate, UInt64 } from 'o1js';
interface Depositable {
    deposit: (amount: UInt64) => AccountUpdate;
}
export default Depositable;
