const Adminhome = Vue.component("adminhome", {
    template:  `<div class="container mt-4">
    <div class="row">
       <div class="col-lg-8 offset-lg-2">
          <!-- Welcome Message -->
          <div class="jumbotron">
             <h1 class="display-4">Welcome, {{userRole}}!</h1>
             <p>You can Add, delete, edit categories.</p>
             <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
             Add Category
             </button>
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
                      <th>Action</th>
                      <th>Status</th>
                   </tr>
                </thead>
                <tbody>
                   <tr v-for="category in categories">
                      <td>
                         <h3>{{ category.name }}</h3>
                         <img :src="category.image" alt="Category Image" style="max-width: 50px; max-height: 50px;" />
                      </td>
                      <td>
                         <button v-if="category.active" class="btn btn-sm btn-outline-primary" type="button" @click="viewproducts(category.id)">
                         View Products
                         </button>
                         <button v-if="category.active" type="button" class="btn btn-sm btn-outline-secondary" :data-bs-target="'#editModal' + category.id" data-bs-toggle="modal">
                         Edit 
                         </button>
                         <button v-if="category.active" type="button" class="btn btn-sm btn-outline-danger" @click="deletecategory(category.id)">
                         Delete
                         </button>
                         <button v-if="!category.active " class="btn btn-sm btn-outline-primary" @click="approve(category.id)">
                        Activate
                        </button>
                        <button v-if="category.active " class="btn btn-sm btn-outline-danger" @click="disapprove(category.id)">
                        Deactivate
                        </button>
                      </td>
                      <td>
                    <button v-if="category.active" class="btn btn-primary" disabled>
                    Activated
                    </button>
                    <button v-if="!category.active" class="btn btn-danger" disabled>
                    Deactivated
                    </button>
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
                      <div class="my-3">
                     <label for="categoryImage">Upload Category Image</label>
                     <input  type="file" @change="handleImageUpload(category, $event)">
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
       <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Category</h1>
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
</div>`,
data() {
    return {
    categories: [],
    Categoryname: null,
    error: null,
    userRole: localStorage.getItem('role'),
    token: localStorage.getItem('auth-token'),
    };
},
methods: {

   async getcategory() {
      try {
         const res = await fetch('/api/category', {
            headers: {
               'Authentication-Token': this.token,
               'Authentication-Role': this.userRole,
            },
         }
         
         );
         if (res.ok) {
             const data = await res.json();
             this.categories = data;
          }
            else {
               const errorData = await res.json();
               console.error(errorData);
            }
         } catch (error) {
            console.error(error);
         }
      },



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
        active: true,
        }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        this.getcategory();
    } else {
        const data = await res.json();
        console.log(data);
        this.error = data.error_message;

    }
    },

    async deletecategory(id) {
    //are you sure?
    const do_delete = confirm("Are you sure you want to delete this category?");
    if (do_delete) {
      const res = await fetch("/api/category/" + id, {
          method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "Authentication-Token": this.token,
            "Authentication-Role": this.userRole,
            },
      });
      if (res.ok) {
          const data = await res.json();
          console.log(data);
          this.getcategory();
      } else {
          const data = await res.json();
          console.log(data);
          this.error = data.error_message;

      }
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
        active: true,
        }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
         this.getcategory();
    } else {
        const data = await res.json();
        console.log(data);
        this.error = data.error_message;

    }
    },
    
    viewproducts(id) {
    this.$router.push("/products/" + id);
    },

    async approve(id) {
        const res = await fetch(`/activate/category/${id}`, {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',

          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.getcategory();
        }
      },
      async disapprove(id) {
        const res = await fetch(`/deactivate/category/${id}`, {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
            
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
            this.getcategory();
        }
      },
 

      async handleImageUpload(category, event) {
         const file = event.target.files[0];
         const formData = new FormData();
         formData.append('image', file);
     
         try {
           const res = await fetch(`/api/category/${category.id}/upload-image`, {
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
               this.getcategory();
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
mounted: function () {
    document.title = "Admin Home";
      this.getcategory();
},


});



export default Adminhome;