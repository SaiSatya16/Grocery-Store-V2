// Assuming you already have Vue imported and set up

const ManagerRegistration = Vue.component('registration', {
    template: `<div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center">Manager Registration Form</h2>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" class="form-control" id="username" name="username" placeholder="Enter username"
              v-model="user.username">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" class="form-control" id="email" name="email" placeholder="Enter email"
              v-model="user.email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
              v-model="user.password">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
              placeholder="Confirm password" v-model="user.confirmPassword">
          </div>
          <button type="submit" class="btn btn-primary" @click="register">Register</button>
          <p class="mt-3">Already have an account? <router-link to="/login">Login here</router-link></p>
        </div>
      </div>
    </div>`,
    data() {
      return {
        user: {
          username: null,
          email: null,
          password: null,
          confirmPassword: null,
        },
        error: null,
      };
    },
    methods: {
      async register() {
        if (this.user.password !== this.user.confirmPassword) {
          this.error = "Passwords do not match.";
          return;
        }
  
        const res = await fetch('/manager-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          }),
        });
  
        if (res.ok) {
          this.$router.push('/login');

        } else {
          const data = await res.json();
          this.error = data.message;

        }
      },
    },
    mounted: function () {
      document.title = 'Registration';
    },
  });
  
  export default ManagerRegistration;
  