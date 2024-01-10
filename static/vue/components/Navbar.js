const Navbar = Vue.component('Navbar', {
  template: `<nav class="navbar navbar-expand-lg navbar-light bg-danger">
  <a class="navbar-brand" href="/" > Grocery Store V2 </a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active d-lg-block" v-if="['Admin', 'Manager', 'Customer'].includes(role)"><router-link to="/">Home</router-link></a>
      <a class="nav-item nav-link d-lg-block" v-if="['Admin', 'Manager', 'Customer'].includes(role)"><router-link to="/about">About Us</router-link></a>
      <a class="nav-item nav-link d-lg-block" v-if="['Admin'].includes(role)"><router-link to="/users">Users</router-link></a>
      <a class="nav-item nav-link d-lg-block" v-if="['Customer'].includes(role)"> <router-link  to="/your_account">Your Account</router-link></a>
      <a class="nav-item nav-link d-lg-block" v-if="['Customer'].includes(role)"> <router-link  to="/cart">Your Cart</router-link></a>
        <button class="nav-link" @click='logout'>Logout</button>
      </a>
    </div>
  </div>
</nav>

`,
  data() {
    return {
      role: localStorage.getItem('role'),
      is_login: localStorage.getItem('auth-token'),
      id : localStorage.getItem('id'),
      inactivityTimeout: 5 * 60 * 1000, // 30 minutes in milliseconds
      inactivityTimer: null,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      this.$router.push({ path: '/login' });
    },
    handleUserActivity() {
      // Update the last activity timestamp
      localStorage.setItem('lastActivityTimestamp', Date.now().toString());
    },
    checkInactivity() {
      const lastActivityTimestamp = localStorage.getItem('lastActivityTimestamp');
      const currentTime = Date.now();

      if (lastActivityTimestamp && currentTime - lastActivityTimestamp > this.inactivityTimeout) {
        // User has been inactive for too long, clear local storage
        this.clearLocalStorage();
      }
    },
    clearLocalStorage() {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('role');
      this.$router.push({ path: '/login' });
    },
    startInactivityTimer() {
      this.inactivityTimer = setInterval(() => {
        this.checkInactivity();
      }, 60000); // Check every minute (adjust as needed)
    },
    stopInactivityTimer() {
      clearInterval(this.inactivityTimer);
    },
  },
  mounted() {
    // Set up event listeners to track user activity
    document.addEventListener('mousemove', this.handleUserActivity);
    document.addEventListener('keydown', this.handleUserActivity);
    document.title = "Navbar";

    // Start the inactivity timer
    this.startInactivityTimer();
  },
  beforeDestroy() {
    // Clean up event listeners and the inactivity timer
    document.removeEventListener('mousemove', this.handleUserActivity);
    document.removeEventListener('keydown', this.handleUserActivity);
    this.stopInactivityTimer();
  },
});

export default Navbar;
