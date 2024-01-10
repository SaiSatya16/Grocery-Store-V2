const YourAccount = Vue.component("youraccount", {
    template:  `<div>
    <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <!-- Welcome Message -->
        <div class="jumbotron">
          <h1 class="display-4">Welcome, {{username}}!</h1>
        </div>
        <!--List of Categories -->
        <h2>List of Products Bought by you</h2>
        <div class="table-responsive">
          <table  class="table table-bordered table-lg" >
            <thead>
              <tr class="jumbotron">
                <th> Date</th>
                <th>Product Name</th>
                <th>Price</th>
                <th> Req Quantity</th>
                <th>Total Price</th>
                
              </tr>
            </thead>
            <tbody>
            
              <tr class="jumbotron" v-for= "product in products" >
                <td> {{product.date}} </td>
                <td> {{product.product_name}} </td>
                <td> {{product.product_rate}} {{product.product_unit}} </td>
                <td> {{product.req_quantity}} </td>
                <td> ₹{{product.product_rate*product.req_quantity}} </td>
              
                
              </tr>
              
            </tbody>
          </table>
        </div>
        <div class="text-right mt-3">
        <h4 style="font-size: 2.5rem;">Grand Total: ₹{{ grandTotal }}</h4> 
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
          const res = await fetch('/api/bought/'+ this.userid
           , {
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
      document.title = "Your Account";
      this.getProducts();
    },


  
  });
  
  export default YourAccount;