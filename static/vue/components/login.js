const Login =Vue.component('login', {
    template: `<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Login Form</h2>
        <div class="alert alert-danger" v-if="error">
          {{ error }}
        </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" class="form-control" id="username" name="username" placeholder="Enter email"
            v-model="cred.email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter password"
            v-model="cred.password">
          </div>
          <button type="submit" class="btn btn-primary" @click='login'>Login</button>
          <p class="mt-3">Don't have an account? <router-link to="/Registration">Register as customer here</router-link></p>
          <p class="mt-3">Don't have an account? <router-link to="/Manager_Registration">Register as Manager here</router-link></p>
        
      </div>

      <div>

      <h2> About the project</h2>
      <h5>This project is a sophisticated multi-user grocery store web application that seamlessly integrates Vue.js for the frontend and Flask for the backend. Bootstrap ensures an intuitive, user-friendly interface, allowing for dynamic category and product management. The application also features a robust authentication system with role-based access control, allowing for three different user role types: admin, manager, and customer. Admins can manage categories and approve manager requests. Managers can manage products within approved categories. Customers can shop and place orders.</h5>
      <h2>Usage</h2>

<h5>Login as an admin to manage categories and approve manager requests. Login as a manager to manage products within approved categories. Login as a customer to shop and place orders.</h5>

<h4>Admin Credentials:</h4>
<ul>
    <li><strong>Email:</strong> admin@gmail.com</li>
    <li><strong>Password:</strong> admin</li>
</ul>

<h4>Manager Credentials:</h4>
<ul>
    <li><strong>Email:</strong> manager@gmail.com</li>
    <li><strong>Password:</strong> manager</li>
</ul>

<h4>Customer Credentials:</h4>
<ul>
    <li><strong>Email:</strong> customer@gmail.com</li>
    <li><strong>Password:</strong> customer</li>
</ul>

<h5>You can also create your own account and login.</h5>
<h5>You can register as a manager and wait for admin approval.</h5>
<h5>You can register as a customer and start shopping.</h5>

<div>
<h2> Source Code</h2>
<h5>Source code for this project is available on GitHub.</h5>
<a href="https://github.com/SaiSatya16/Grocery-Store-V2"> Click here to view the source code</a>

<h5> Note: I also implemented backround jobs such as downloading product details, sending daily remainders to customers, sending monthely reports to managers as emails. But I have not included them in deployment. If you want to see them, please visit the source code on GitHub and follow the steps to run project locally.</h5>

</div>





      </div>


    </div>
    
  </div>`,
  data() {
    return {
      cred: {
        email: null,
        password: null,
      },
      error: null,
    }
  },
    methods: {
        async login() {
          const res = await fetch('/user-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.cred),
          });
          if(res.ok){
            const data = await res.json();
            console.log(data);
            localStorage.setItem('auth-token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);
            this.$router.push('/');
        }
        else{
            const data = await res.json();
            console.log(data);
            this.error = data.message;

        }
        }
    },


    mounted : function(){
        document.title = "Login";
    }
});

export default Login;