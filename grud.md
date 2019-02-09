# CRUD App

## Requirements:

- [ ]  Getting data (basic implementation)
    - [ ]  Implement server endpoint (/users)
    - [ ]  Render frontend table
- [ ]  Create an user
    - [ ]  Implement server endpoint (/users)
    - [ ]  Create UI to enter user details and allow submit it
- [ ]  Update an user
    - [ ]  Implement server endpoint (/users/:id)
    - [ ]  Create UI to modify user details an submit it
- [ ]  Delete an user
    - [ ]  Implement server endpoint (/users/:id)
    - [ ]  Create a button to delete user

---

- [ ]  Advanced getting
    - [ ]  Pagination (server and UI) - `limit` and `page` params
    - [ ]  Search (server and UI) - `search` param
    - [ ]  Sorting (server and UI) - `sortBy` and `order` param
- [ ]  Support local and production env

## Notes:

- every data modification should re-render(refresh) all users in the table
- How to create users with unique id - [https://github.com/typicode/lowdb#how-to-use-id-based-resources](https://github.com/typicode/lowdb#how-to-use-id-based-resources)
- How to implement sorting, search, pagination on the server - [https://github.com/typicode/lowdb#reading-from-existing-json-file](https://github.com/typicode/lowdb#reading-from-existing-json-file)

    Lowdb is using `lodash` under the hood - [https://lodash.com/docs/4.17.11](https://lodash.com/docs/4.17.11)

    So you can use any method from lodash on your `db.get('users')` collection.

- My result of this app - [https://github.com/rudnitskih/MateAcademy/tree/master/crud-app](https://github.com/rudnitskih/MateAcademy/tree/master/crud-app)