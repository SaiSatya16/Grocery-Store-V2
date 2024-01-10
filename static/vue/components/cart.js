const Cart = Vue.component("cart", {
    template:  `<div>
    <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <!-- Welcome Message -->
        <div class="jumbotron">
          <h1 class="display-4">Welcome, {{username}}!</h1>
        </div>
        <div class="alert alert-danger" role="alert" v-if="error">
        {{error}}
        </div>
        <!--List of Categories -->
        <div v-if="products.length == 0">
            <h2>No Products Found</h2>
            </div>
        <div v-else>
        




        <h2>List of Products in your Cart</h2>
        <div class="table-responsive">
          <table  class="table table-bordered table-lg" >
            <thead>
              <tr class="jumbotron">
                <th>Product Name</th>
                <th>Price</th>
                <th> Req Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            
              <tr class="jumbotron" v-for= "product in products" >
                <td> {{product.product_name}} </td>
                <td> {{product.product_rate}} {{product.product_unit}} </td>
                <td> {{product.req_quantity}} </td>
                <td> ₹{{product.product_rate*product.req_quantity}} </td>
                
                <td>
                <button class="btn btn-primary" @click="deleteProduct(product.id)">Delete</button>
              </td>
              
                
              </tr>
              
            </tbody>
          </table>
        </div>
        <div class="text-right mt-3" v-if="products.length > 0">
  <h4 style="font-size: 2.5rem;">Grand Total: ₹{{ grandTotal }}</h4> 
  <button class="btn btn-primary" @click="() => proceedToBuy(userid)">Proceed to Buy</button>
</div>

        
      </div>
    </div>
  </div>
  </div>
     </div>`,

    data() {
      return {
        products: [],
        username : localStorage.getItem('username'),
        token: localStorage.getItem('auth-token'),
        error: null,
        userid : localStorage.getItem('id'),
        userRole: localStorage.getItem('role'),
      };
    }
    ,
    methods: {
      async getProducts() {
        try {
          const res = await fetch('/api/cart/'+ this.userid  , {
            headers: {
                'content-type': 'application/json',
                'Authentication-Token': this.token,
                'Authentication-Role': this.userRole,

            },
          });
          if (res.ok) {
            const data = await res.json();
            this.products = data;
          } else {
            const errorData = await res.json();
            console.error(errorData);
          }
        } catch (error) {
          console.error(error);
        }
      },

        async deleteProduct(id) {
            //are you sure?
            if (!confirm('Are you sure you want to delete this product from cart?')) {
            return;
            }
            try {
                const res = await fetch('/api/cart/' + id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authentication-Token': this.token,
                    'Authentication-Role': this.userRole,
                },
                });
                if (res.ok) {
                this.getProducts();
                } else {
                const errorData = await res.json();
                console.error(errorData);
                }
            } catch (error) {
                console.error(error);
            }
            },
            async proceedToBuy(id) {
                try {
                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const year = currentDate.getFullYear();
            
                    const formattedDate = `${year}-${month}-${day}`;
                    
            
                    const res = await fetch('/Buy/' + id, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'Authentication-Token': this.token,
                            'Authentication-Role': this.userRole,
                        },
                        body: JSON.stringify({
                            date: formattedDate,
                        }),
                    });
            
                    if (res.ok) {
                        alert('Order Placed Successfully');
                        this.$router.push('/ordersuccess');
                        return res.json();
                    } else {
                        throw new Error('Something went wrong');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            
            



    },

    computed: {
        grandTotal() {
          return this.products.reduce(
            (total, product) => total + product.product_rate * product.req_quantity,
            0
          );
        },
      },

    mounted: function () {
      document.title = "Cart";
      this.getProducts();
    },


  
  });
  
  export default Cart;