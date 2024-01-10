const Users = Vue.component("users", {
    template: `
      <div class="table-container">
      <div class="alert alert-danger" v-if="error">
      {{ error }}
      </div>
        <h1>List of Users</h1>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button v-if="!user.active && user.username !== 'admin'" class="btn btn-primary" @click="approve(user.id)">
                  Approve
                </button>
                <button v-if="user.active && user.username !== 'admin'" class="btn btn-danger" @click="disapprove(user.id)">
                  Disapprove
                </button>
                <button v-if="user.username === 'admin'" class="btn btn-warning" disabled>
                  Superuser
                </button>
              </td>
              <td>
                <button v-if="user.active" class="btn btn-primary" disabled>
                  Approved
                </button>
                <button v-if="!user.active" class="btn btn-danger" disabled>
                  Not Approved
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    data() {
      return {
        allUsers: [],
        token: localStorage.getItem('auth-token'),
        error: null,
      };
    },
    methods: {
      async getallUsers() {
        const res = await fetch('/users', {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
          },
        });
        const data = await res.json().catch((e) => {});
        if (res.ok) {
          console.log(data);
          this.allUsers = data;
        } else {
          this.error = res.statusText;
        }
      },
      async approve(userId) {
        const res = await fetch(`/activate/manager/${userId}`, {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.getallUsers();
        }
      },
      async disapprove(userId) {
        const res = await fetch(`/deactivate/manager/${userId}`, {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.getallUsers();
        }
      },
    },
    async mounted() {
      document.title = "Users";
      this.getallUsers();
    },
  });
  
  export default Users;
  