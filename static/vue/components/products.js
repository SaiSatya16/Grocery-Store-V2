import ManagerProductDetails from "./managerproductdetails.js";
import AdminProductDetails from "./adminproductdetails.js";
import CustomerProductDetails from "./customerproductdetails.js";


const Products =Vue.component('products', {
    template: `<div>
                <div v-if="userRole == 'Admin'">
                    <AdminProductDetails></AdminProductDetails>
                </div>
                <div v-if ="userRole == 'Manager'" >
                    <ManagerProductDetails></ManagerProductDetails>
                </div>
                <div v-if ="userRole == 'Customer'" >
                    <CustomerProductDetails></CustomerProductDetails>
                </div>
                
            </div>`,
                data() {
                    return {
                        userRole: localStorage.getItem('role'),
                    }

                },
                components: {
                    ManagerProductDetails,
                    AdminProductDetails,
                    CustomerProductDetails,
                },
                mounted : function(){
                    document.title = "Products";
    }
});



export default Products;