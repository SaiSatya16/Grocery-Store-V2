const Managerhome = Vue.component("managerhome", {
  template: `
  <div class="container mt-4">
   <div class="row">
      <div class="col-lg-8 offset-lg-2">
         <!-- Welcome Message -->
         <div class="jumbotron">
            <h1 class="display-4">Welcome, {{userRole}}!</h1>
            <p>You can Add, delete, edit Products and add categories by admin approval.</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add Category
            </button>
            <button type="button" @click="downloadResource" class="btn btn-primary" data-bs-dismiss="modal" >Download Product Details</button><span v-if = 'isWaiting' >Downloading....</span>
         </div>
         <div class="alert alert-danger" v-if="error">
            {{ error }}
         </div>
         <div v-if="categories.length == 0">
            <h2>No Categories Found</h2>
        </div>
        <div v-else>
         <!-- List of Categories -->
         <h2>List of Categories</h2>
         <div class="table-responsive">
            <table class="table table-bordered">
               <thead>
                  <tr class="table-header">
                     <th>Category Name</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="category in categories">
                     <td>
                     <h3>{{ category.name }}</h3>
                     <img :src="category.image" alt="Category Image" style="max-width: 50px; max-height: 50px;" />
                     </td>
                     <td>
                        <button type="button" v-if="category.active" class="card-link" @click="viewproducts(category.id)">
                        View Products
                        </button>
                        <button type="button" v-if="category.active" class="card-link" :data-bs-target="'#productModal' + category.id" data-bs-toggle="modal">
                        Add Product
                        </button>
                        <button type="button" v-if="category.active" class="card-link" :data-bs-target="'#editModal' + category.id" data-bs-toggle="modal">
                        Edit 
                        </button>
                        <p v-if="!category.active"> Admin need to activate the category to proceed further... </p>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
        </div>
      <div v-for="category in categories" :key="category.id">
         <div class="modal fade" :id="'editModal' + category.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'editModalLabel' + category.id" aria-hidden="true">
            <div class="modal-dialog">
               <div class="modal-content">
                  <div class="modal-header">
                     <h1 class="modal-title fs-5" :id="'editModal' + category.id">Edit Category</h1>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                     <div class="my-3">
                        <label for="title">Enter Category Name</label>
                        <input v-model="category.name" type="text" id="Categoryname" class="form-control" :placeholder= "category.name">
                     </div>
                  </div>
                  <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" @click="editcategory(category)" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div v-for="category in categories">
         <div class="modal fade" :id="'productModal'+ category.id" tabindex="-1" role="dialog" aria-labelledby="'productModalLabel'+ category.id"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
               <div class="modal-content">
                  <div class="modal-header">
                     <h5 class="modal-title" :id="'productModal'+ category.id">Product Form</h5>
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
                        <button type="button" @click="addproduct(category.id)" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  <div class="my-3">
                     <label for="Categoryname">Enter Category Name</label>
                     <input v-model="Categoryname" type="text" id="Categoryname" class="form-control" placeholder="Categoryname">
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" @click="addcategory" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
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
        Categoryname: null,
        productname: null,
        unit: null,
        rate: null,
        quantity: null,
        manufacture_date: null,
        expiry_date: null,
        error: null,
        token: localStorage.getItem('auth-token'),
        userRole: localStorage.getItem('role'),
         isWaiting: false,
        };
    },
    methods: {
        async addcategory() {
        const res = await fetch("/api/category", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authentication-Token": this.token,
            "Authentication-Role": this.userRole,
            },
            body: JSON.stringify({
            name: this.Categoryname,
            active: false,
            }),
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            fetch("/api/category", {
               headers: {
                "content-type": "application/json",
                "Authentication-Token": this.token,
                "Authentication-Role": this.userRole,
            },
            })
            .then((res) => res.json())
            .then((data) => {
                this.categories = data;
            });
        } else {
            const data = await res.json();
            console.log(data);
            this.error = data.error_message;

        }
        },
    
        async editcategory(category) {
            this.categoryname = category.name;
            const res = await fetch("/api/category/" + category.id, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "Authentication-Token": this.token,
            "Authentication-Role": this.userRole,
            },
            body: JSON.stringify({
            name: this.categoryname,
            active: false,
            }),
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            fetch("/api/category", {
               headers: {
                "content-type": "application/json",
                "Authentication-Token": this.token,
                "Authentication-Role": this.userRole,
            },
            })
            .then((res) => res.json())
            .then((data) => {
                this.categories = data;
            });
        } else {
            const data = await res.json();
            console.log(data);
            this.error = data.error_message;

        }
        },
        async addproduct(id) {
        const res = await fetch("/api/product/" + id, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authentication-Token": this.token,
            "Authentication-Role": this.userRole,
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
            const data = await res.json();
            console.log(data);
        } else {
            const data = await res.json();
            console.log(data);
            this.error = data.error_message;

        }
        },
        viewproducts(id) {
        this.$router.push("/products/" + id);
        },

        async downloadResource() {
         this.isWaiting = true
         const res = await fetch('/download_csv',{
           headers:{
             "Content-Type" : "application/json" ,
             'Authentication-Token': this.token,
             'Authentication-Role':this.role_name,
           }
         })
         const data = await res.json()
         if (res.ok) {
           const taskId = data['task-id']
           const intv = setInterval(async () => {
             const csv_res = await fetch(`/get-csv/${taskId}`)
             if (csv_res.ok) {
               this.isWaiting = false
               clearInterval(intv)
               window.location.href = `/get-csv/${taskId}`
             }
           }, 1000)
         }
       },



    },
    mounted: function () {
        document.title = "Admin Home";
        fetch("/api/category", {
         headers: {
            "content-type": "application/json",
            "Authentication-Token": this.token,
            "Authentication-Role": this.userRole,
        },
        } )
        .then((res) => res.json())
        .then((data) => {
            this.categories = data;
        });
    },


});

export default Managerhome;
