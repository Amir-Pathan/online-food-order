import CreateAccount from "./createAccount"
import Home from "./home"
import CategoryItem from "./categoryItem"
import Checkout from "./checkout"
import Address from "./address"
import Orders from "./orders"
import Wishlist from "./wishlist"

const router = [
    {
        path:'/',
        component:<Home/>
    },
    {
        path:'/createAccount',
        component:<CreateAccount/>
    },
    {
        path:'/category/:id',
        component:<CategoryItem/>
    },
    {
        path:'/checkout',
        component:<Checkout/>
    },
    {
        path:'/address',
        component:<Address/>
    },
    {
        path:'/orders',
        component:<Orders/>
    },
    {
         path:'/wishlist',
         component:<Wishlist/>  
    }
]

export default router