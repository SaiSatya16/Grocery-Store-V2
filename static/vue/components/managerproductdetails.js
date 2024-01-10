const ManagerProductDetails = Vue.component('managerproductdetails',{
    template: `<div>
        <!-- Main Content -->
        <div class="container mt-4">
          <div class="row">
            <div class="col-lg-12 ">
              <!-- Welcome Message -->
              <div class="jumbotron">
                <h1 class="display-4">Welcome, {{userRole}}!</h1>
                <p>You can Add, delete, edit products.</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">
                Add Product
                </button>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr class="jumbotron" v-for="product in products" >
                      <td> {{product.name}} <img :src="product.image" alt="Product Image" style="max-width: 50px; max-height: 50px;" />   </td>
                      <td> {{product.unit}}  </td>
                      <td> {{product.rate}} </td>
                      <td> {{product.quantity}}  </td>
                      <td> {{product.manufacture_date}}  </td>
                      <td> {{product.expiry_date}}  </td>
                      <td>
                      <button type="button" class="card-link" @click="deleteProduct(product.id)">
                      Delete
                      </button>
                      <button type="button" class="card-link" data-bs-toggle="modal" :data-bs-target="'#productModal' + product.id">
                      Edit
                      </button>
                      </td>
                      
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              </div>
              
            </div>
          </div>
        </div>

        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
               <div class="modal-content">
                  <div class="modal-header">
                     <h5 class="modal-title" id="productModal">Product Form</h5>
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                     <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="form-group">
                        <label for="name">Name:</label>
                        <input v-model="productname" type="text" class="form-control" id="productname" name="productname" required>
                     </div>
                     <div class="form-group">
                        <label for="unit">Unit:</label>
                        <select v-model="unit" class="form-control" id="unit" name="unit">
                           <option value="Rs/kg">Rs/kg</option>
                           <option value="Rs/Litre">Rs/Litre</option>
                           <option value="Rs/dozen">Rs/Dozen</option>
                           <option value="Rs/gram">Rs/Gram</option>
                           <option value="Rs/Item">Rs/Item</option>
                        </select>
                     </div>
                     <div class="form-group">
                        <label for="rate">Rate/unit:</label>
                        <input v-model="rate" type="number" class="form-control" id="rate" name="rate" required>
                     </div>
                     <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input v-model="quantity" type="number" class="form-control" id="quantity" name="quantity" required>
                     </div>
                     <div class="form-group">
                        <label for="manufacture_date">Manufacture Date:</label>
                        <input v-model="manufacture_date" type="date" class="form-control" id="manufacture_date" name="manufacture_date"
                           required>
                     </div>
                     <div class="form-group">
                        <label for="expiry_date">Expiry Date:</label>
                        <input v-model="expiry_date" type="date" class="form-control" id="expiry_date" name="expiry_date" required>
                     </div>
                     <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" @click="addproduct(categoryid)" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>


        <div v-for = "product in products">
         <div class="modal fade" :id="'productModal' + product.id " tabindex="-1" role="dialog" aria-labelledby="'productModalLabel' + product.id"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
               <div class="modal-content">
                  <div class="modal-header">
                     <h5 class="modal-title" :id="'productModal'+ product.id">Product Edit Form</h5>
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                     <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="form-group">
                        <label for="name">Name:</label>
                        <input v-model="product.name" type="text" class="form-control" id="productname" name="productname"  required>
                     </div>
                     <div class="form-group">
                        <label for="unit">Unit:</label>
                        <select v-model="product.unit" class="form-control" id="unit" name="unit"  >
                           <option value="Rs/kg">Rs/kg</option>
                           <option value="Rs/Litre">Rs/Litre</option>
                           <option value="Rs/dozen">Rs/Dozen</option>
                           <option value="Rs/gram">Rs/Gram</option>
                           <option value="Rs/Item">Rs/Item</option>
                        </select>
                     </div>
                     <div class="form-group">
                        <label for="rate">Rate/unit:</label>
                        <input v-model="product.rate" type="number" class="form-control" id="rate" name="rate"  required>
                     </div>
                     <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input v-model="product.quantity" type="number" class="form-control" id="quantity" name="quantity"  required>
                     </div>
                     <div class="form-group">
                        <label for="manufacture_date">Manufacture Date:</label>
                        <input v-model="product.manufacture_date" type="date" class="form-control" id="manufacture_date" name="manufacture_date" 
                           required>
                     </div>
                     <div class="form-group">
                        <label for="expiry_date">Expiry Date:</label>
                        <input v-model="product.expiry_date" type="date" class="form-control" id="expiry_date" name="expiry_date" 
                        required>
                     </div>
                     <div class="form-group">
                        <label for="productImage">Upload Product Image</label>
                        <input  type="file" @change="handleImageUpload(product, $event)">
                     </div>
                     <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" @click="editProduct(product)" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
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
                products : [],
                categoryname : null,
                productname: null,
                unit: null,
                rate: null,
                quantity: null,
                manufacture_date: null,
                expiry_date: null,
                error : null,
                categoryid : this.$route.params.id,
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
                            'Authentication-Role': this.userRole,
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
                            'Authentication-Role': this.userRole,
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


            async deleteProduct(id) {
              //are you sure?
              const do_delete = confirm("Are you sure you want to delete this category?");
              if (!do_delete) {
                  return; //do nothing if cancel
              }   
                try {
                    const res = await fetch('/api/product/' + id, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'Authentication-Token': this.token,
                            'Authentication-Role': this.userRole,
                        },
                    });
                    if (res.ok) {
                        this.getProducts();
                    }
                } catch (error) {
                    console.log(error);
                    this.error = error;
                }
            },

            async addproduct(id) {
                try {
                    const res = await fetch('/api/product/' + id, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication-Token': this.token,
                            'Authentication-Role': this.userRole,
                        },
                        body: JSON.stringify({
                            name: this.productname,
                            unit: this.unit,
                            rate: this.rate,
                            quantity: this.quantity,
                            manufacture_date: this.manufacture_date,
                            expiry_date: this.expiry_date,
                        }),
                    });
                    if (res.ok) {
                        this.getProducts();
                    }
                } catch (error) {
                    console.log(error);
                    this.error = error;
                }
            },
          
          async editProduct(product) {
            this.productname = product.name;
            this.unit = product.unit;
            this.rate = product.rate;
            this.quantity = product.quantity;
            this.manufacture_date = product.manufacture_date;
            this.expiry_date = product.expiry_date;
            try {
                const res = await fetch('/api/product/' + product.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                        'Authentication-Role': this.userRole,
                    },
                    body: JSON.stringify({
                        name: this.productname,
                        unit: this.unit,
                        rate: this.rate,
                        quantity: this.quantity,
                        manufacture_date: this.manufacture_date,
                        expiry_date: this.expiry_date,
                        category_id : this.categoryid,
                    }),
                });
                if (res.ok) {
                    this.getProducts();
                }
            } catch (error) {
                console.log(error);
                this.error = error;
            }
          },

          async handleImageUpload(product, event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
        
            try {
              const res = await fetch(`/api/product/${product.id}/upload-image`, {
                method: 'POST',
                headers: {
                  'Authentication-Token': this.token,
                  'Authentication-Role': this.userRole,
                },
                body: formData,
              });
        
              if (res.ok) {
                const data = await res.json();
                console.log(data); // Handle success response
                this.getProducts();
              } else {
                const data = await res.json();
                console.error(data);
                this.error = data.error; // Handle error response
              }
            } catch (error) {
              console.error(error); // Handle fetch error
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

export default ManagerProductDetails;

