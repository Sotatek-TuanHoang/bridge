import type { Bool } from 'snarkyjs';
import type { AdminAction } from '../token/adminable.js';
interface Admin {
    canAdmin: (action: AdminAction) => Bool;
}
export default Admin;
