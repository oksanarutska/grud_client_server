import {AppBackend} from './appBackend.js';
import {TableUsers} from './table_users.js';

(async function () {
    const backend = new AppBackend();
    const users = await backend.get({page:1, limit:10});

    console.log(users);
    const newTableUser = new TableUsers(users);
    const newUser = await newTableUser.render();
})();