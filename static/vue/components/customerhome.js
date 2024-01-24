const Customerhome = Vue.component("customerhome", {
    template: `
      <div>
        <div class="container mt-5">
          <h1>Welcome {{name}} to the Grocery Store Dashboard</h1>
          <div class="input-group mt-3">
            <input class="form-control" type="text" v-model="searchQuery" @input="searchCategory" placeholder="Search Category">
          </div>
        </div>
        <div v-if="categories.length === 0">
          <h2>No Categories Found</h2>
        </div>
        <div v-else>
          <div class="container">
            <h2>Shop By Category</h2>
            <div class="row mt-5">
              <div class="col-sm-3" v-for="category in filteredCategories" :key="category.id">
              <div v-if= "category.active === true"> 
                <div class="card">
                  <img :src="category.image"  class="card-img-top" :alt="category.name"  style="width: 300px; height: 300px;">
                  <div class="card-body">
                    <h5 class="card-title">{{ category.name }}</h5>
                    <p class="card-text">Exciting Offers on {{ category.name }}</p>
                    <button type="button" class="btn btn-primary" @click="viewproducts(category.id)">
                         View {{ category.name }}
                         </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        categories: [],
        searchQuery: '',
        name : localStorage.getItem('username'),
        userRole: localStorage.getItem('role'),
        token: localStorage.getItem('auth-token'),

      };
    },
    computed: {
      filteredCategories() {
        const inputText = this.searchQuery.toLowerCase();
        return this.categories.filter(category => category.name.toLowerCase().includes(inputText));
      }
    },
    methods: {
      async getCategories() {
        try {
          const res = await fetch('/api/category',
          {
            headers: {
                "content-type": "application/json",
                "Authentication-Token": this.token,
                "Authentication-Role": this.userRole,
            }
          },

          );
          if (res.ok) {
            const data = await res.json();
            this.categories = data;
          } else {
            const errorData = await res.json();
            console.error(errorData);
          }
        } catch (error) {
          console.error(error);
        }
      },
      searchCategory() {
        // This method is not needed in this version because the filteredCategories computed property handles the filtering
      },
        viewproducts(id) {
            this.$router.push('/products/' + id);
        }


    },
    mounted() {
      document.title = 'Customer Home';
      this.getCategories();
    }
  });
  
  
  export default Customerhome;


  