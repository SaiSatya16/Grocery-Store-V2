const AdminProductDetails = Vue.component('adminproductdetails',{
    template: `<div>
        <!-- Main Content -->
        <div class="container mt-4">
          <div class="row">
            <div class="col-lg-12 ">
              <!-- Welcome Message -->
              <div class="jumbotron">
                <h1 class="display-4">Welcome, {{userRole}}!</h1>
                <p>You can view products.</p>
              </div>
              <div class="alert alert-danger" role="alert" v-if="error">
                {{error}}
              </div>
              <div v-if="products.length == 0">
                <h2>No Products Found</h2>
              </div>
              <div v-else>
              <!-- List of Categories -->
              <h2>List of Products of {{categoryname}}  Category</h2>
              <div class="table-responsive">
                <table  class="table table-bordered" >
                  <thead>
                    <tr class="jumbotron" >
                      <th>Product Name</th>
                      <th>Unit</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Manufacture Date</th>
                      <th>Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr class="jumbotron" v-for="product in products" >
                      <td> {{product.name}}   </td>
                      <td> {{product.unit}}  </td>
                      <td> {{product.rate}} </td>
                      <td> {{product.quantity}}  </td>
                      <td> {{product.manufacture_date}}  </td>
                      <td> {{product.expiry_date}}  </td>
                      
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              </div>
              
            </div>
          </div>
        </div>



        </div>
      
    
        `,

        data() {
            return {
                products : [],
                error : null,
                categoryid : this.$route.params.id,
                categoryname : null,
                userRole: localStorage.getItem('role'),
                token: localStorage.getItem('auth-token'),
            };
        },

        methods: {
            async getProducts() {
                try {
                    const res = await fetch('/api/product/' + this.$route.params.id,
                        {
                            headers: {
                                'content-type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': 'Admin',

                            },
                        }
                     );
                    this.products = await res.json();
                    console.log(this.products);
                } catch (error) {
                    console.log(error);
                    this.error = error;
                }
            },
            async getcategoryname() {
                try {
                    const res = await fetch('/api/categoryget/' + this.$route.params.id
                        ,
                        {
                            headers: {
                                'content-type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': 'Admin',

                            },
                        }
                    );
                    const data = await res.json();
                    console.log(data);
                    this.categoryname = data.name;
                    console.log(this.categoryname);
                } catch (error) {
                    console.log(error);
                    this.error = error;
                }
            },
            
        },


    
        mounted : function(){
            document.title = "Product Details";
            console.log(this.$route.params.id);
            this.getProducts();
            this.getcategoryname();
        }


}) ;

export default AdminProductDetails;

