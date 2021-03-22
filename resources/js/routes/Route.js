//auth
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Logout from '../components/auth/Logout'

//customer
import CustomerIndex from '../components/customer/CustomerIndex'

const routes = {
    mode: 'history',
    hashbang: false,
    routes: [
        {path: '/login', component: Login },
        {path: '/register', component: Register },
        {path: '/logout', component: Logout },
        {path: '/customer', component: CustomerIndex, name: 'customer' },
    ]
}

export default routes