const OrderSuccess = Vue.component('ordersuccess', {
    template: `<div>
    <div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="thank-you">Thank You!</div>
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Your order has been successfully placed!</h2>
                    <h5 class="card-text">We are excited to fulfill your order.</h5>
                    <h5 class="card-text">Click on My Orders to check your orders.</h5>
                    <button class="btn btn-primary" @click = myaccount  >My Account</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Celebratory confetti -->
<div class="confetti" style="top: 0; left: 10%;"></div>
<div class="confetti" style="top: 0; left: 25%;"></div>
<div class="confetti" style="top: 0; left: 40%;"></div>
<div class="confetti" style="top: 0; left: 55%;"></div>
<div class="confetti" style="top: 0; left: 70%;"></div>
<div class="confetti" style="top: 0; left: 85%;"></div>
</div>`,
    data() {
        return {
            token: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role'),
            userId : localStorage.getItem('id'),
        }
    }
    ,
    methods: {
        myaccount() {
            this.$router.push('/your_account');
        }
    },





        mounted : function(){
        document.title = "Order Success";
    }
});

export default OrderSuccess;