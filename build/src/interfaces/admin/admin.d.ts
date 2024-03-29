import type { Bool } from 'o1js';
import type { AdminAction } from '../token/adminable';
interface Admin {
    canAdmin: (action: AdminAction) => Bool;
}
export default Admin;
