import {AppBackend} from './appBackend.js';

export class TableUsers {

    constructor() {
        this.page = 0;
        this.pageSize = 10;
        this.search = '';
        this.appBackend = new AppBackend();

        document.addEventListener('click', (e) => {
            if (e.target.matches('.delete_button')) {
                const userId = e.target.dataset.id;
                this.deleteUser(userId);
            }
        });

        document.getElementById("count_users").addEventListener("change", (event) => {
            this.pageSize = event.target.value;
            this.render();
        });


        document.getElementById("users_search").addEventListener("keyup", (event) => {
            // 13 - 'enter' key
            if (event.which === 13) {
                this.search = event.target.value;
                this.render();
            }
        });

        [...document.getElementsByClassName('button_previous')].forEach(
            btn => {
                btn.onclick = this.prevPage.bind(this);
            });
        [...document.getElementsByClassName('button_next')].forEach(
            btn => {
                btn.onclick = this.nextPage.bind(this);
            });
    }


    deleteUser(userId) {
        this.appBackend.delete(userId)
            .then(_ => {
                this.render();
            });
    }


    prevPage() {
        this.page--;
        this.render();
    }

    nextPage() {
        this.page++;
        this.render();
    }

    async getUsers() {
        let usersResponse = await this.appBackend.get({
            page: this.page,
            limit: this.pageSize,
            search: this.search
        });

        return usersResponse;
    }

    async render() {
        const usersResponse = await this.getUsers();
        const users = usersResponse.users;
        document.getElementById('table_base').innerHTML = `
         <table class="table table-dark table_size">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Data</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
  <tr>
  <form id="form">
  <td><input class="id" type="number"></td>
  <td><input class="name" type="text"></td>
  <td><input class="data" type="number"></td>
  <td><input class='email' type="email"></td>
  <td><button class="btn btn-success" id="add_button" >Add</button></td>
  </form> 
</tr>
    ${this.getUsersMarkup(users)}
    
  </tbody>
</table> `;

        const toCount = (this.page + 1) * this.pageSize;
        const isLastPage = usersResponse.total_count < toCount;

        document.getElementById("paging-info").innerText = `Showing ${this.page * this.pageSize + 1} to ${(isLastPage ? usersResponse.total_count : toCount)} of ${usersResponse.total_count} entries`;

        document.getElementById('add_button').addEventListener('click', (add) => {
            var user = {
                name: document.querySelector('.name').value,
                email: document.querySelector('.email').value,
            };
            this.appBackend.create(user)
                .then(async (response) => {
                    this.render();
                });
        });

        document.querySelectorAll("button.update_button").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const tr = event.target.closest("tr");

                const user = {
                    id: event.target.dataset.id,
                    name: tr.querySelector("input[name='name']").value,
                    email: tr.querySelector("input[name='email']").value
                };

                if (!user.name) {
                    alert('Name is required');
                    return;
                }

                this.appBackend.update(user)
                    .then(x => alert('Updated'));
            });
        });
    }

    getUsersMarkup(users) {
        return users.map((user) => {
            return `<tr>
  
                <td> ${user.id} </td>
                <td> <input name="name" value="${user.name}" ></td>
                <td> ${user.createdAt} </td>
                <td> <input name="email" value="${user.email}" ></td>
                <td>
                <button class="update_button btn btn-success" data-id="${user.id}">Update</button>
                <button class="delete_button btn btn-danger" data-id="${user.id}">Delete</button>
                </td>
                </tr>
            `
        }).join('')
    }
}