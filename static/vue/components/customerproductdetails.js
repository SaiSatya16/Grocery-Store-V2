const CustomerProductDetails = Vue.component("customerproductdetails", {
    template: `
      <div>
        <div class="container mt-5">
          <h1>Welcome {{name}} to the Grocery Store Dashboard</h1>
          <div class="input-group mt-3">
            <input type="text" class="form-control" v-model="searchQuery" placeholder="Search name, price, or MFG Date">
            <div class="input-group-append">
            <select v-model="sortingOptions" class="form-control" @change="sortProducts">
            <option value="default" selected>Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
          </div>
        </div>
        <div v-if="products.length === 0">
          <h2>No Products Found</h2>
        </div>
        <div v-else>
          <div class="container">
            <h2>Shop for {{ categoryname }} </h2>
            <div class="row mt-5">
              <div class="col-sm-4" v-for="product in filteredProducts" :key="product.id" v-if="product.display !== false">
                <div class="card">
                  <img :src="product.image" class="card-img-top img-fluid" :alt="product.name" style="width: 400px; height: 400px;" >
                  <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">At ₹{{ product.rate }} only </p>
                    <div class="card-text">
                      <small class="text-muted">MFG Date: {{ product.manufacture_date }}</small>
                      <div v-if="product.quantity === 0">
                        <button class="btn btn-danger" disabled>Out of Stock </button>
                        </div>
                      <div v-else>
                      <div class="input-group">
                        <input type="number" class="form-control" v-model="product.quantityToAdd" placeholder="Qty" min="1">
                        <div class="input-group-append">
                          <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Unit: {{ product.unit }} | Available: {{ product.quantity }}</small>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Expiry Date: {{ product.expiry_date }}</small>
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
        products: [],
        error: null,
        categoryid: this.$route.params.id,
        categoryname: null,
        userRole: localStorage.getItem('role'),
        searchQuery: '',
        token: localStorage.getItem('auth-token'),
        name : localStorage.getItem('username'),
        sortingOptions: 'default',
        error: null,
      };
    },
    computed: {
      filteredProducts() {
        const inputText = this.searchQuery.toLowerCase();
        return this.products.filter(product => {
          const productName = product.name.toLowerCase();
          const productPrice = product.rate.toString().toLowerCase();
          const productMD = product.manufacture_date.toLowerCase();
          return (
            productName.includes(inputText) ||
            productPrice.includes(inputText) ||
            productMD.includes(inputText)
          );
        });
      }
    },
    methods: {
        sortProducts() {
            if (this.sortingOptions === 'lowToHigh') {
                // Sort by price: Low to High
                this.products.sort((a, b) => a.rate - b.rate);
            } else if (this.sortingOptions === 'highToLow') {
                // Sort by price: High to Low
                this.products.sort((a, b) => b.rate - a.rate);
            } else {
                // Default: No sorting or reset to the original order
                // Fetch the products again (replace with the actual endpoint)
                this.getProducts();
            }
        },



      async getProducts() {
        try {
          const res = await fetch('/api/product/' + this.$route.params.id,
          {
            headers: {
              'content-type': 'application/json',
              'Authentication-Token': this.token,
              'Authentication-Role': this.userRole,

            },
          }
          
          );
          this.products = await res.json();
          this.products.forEach(product => {
            this.$set(product, 'quantityToAdd', null);
          });
        } catch (error) {
          this.error = error_message;
        }
      },
      async getcategoryname() {
        try {
          const res = await fetch('/api/categoryget/' + this.$route.params.id,

            {
                headers: {
                    'content-type': 'application/json',
                    'Authentication-Token': this.token,
                    'Authentication-Role': this.userRole,

                },
            }

          
          );
          const data = await res.json();
          this.categoryname = data.name;
        } catch (error) {
          this.error = error;
        }
      },
      async addToCart(product) {
        try {
          if (!product.quantityToAdd || isNaN(parseInt(product.quantityToAdd)) || parseInt(product.quantityToAdd) < 1) {
            throw new Error('Please enter a valid quantity.');
          }
          if (parseInt(product.quantityToAdd) > product.quantity) {
            throw new Error('Not enough stock available.');
          }
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'Authentication-Token': this.token,
                'Authentication-Role': this.userRole,
            },
            body: JSON.stringify({
              user_id: localStorage.getItem('id'),
              product_id: product.id,
              product_name: product.name,
              product_rate: product.rate,
              req_quantity: parseInt(product.quantityToAdd),
              product_unit: product.unit,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            alert('Added to cart successfully!');
          } else {
            const errorData = await res.json();
            throw new Error(errorData.error_message);
          }
        } catch (error) {
          console.error(error);
          alert(error.message || 'An error occurred while adding to cart.');
        }
      },

      
      
      
      
    },
    mounted() {
      document.title = "Product Details";
      this.getProducts();
      this.getcategoryname();
    }
  });
  
  export default CustomerProductDetails;
  