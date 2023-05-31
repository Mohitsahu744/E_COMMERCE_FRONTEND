import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate()
    function logout() {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div className='nav-bar'>
            <img style={{float:'left',height:"50px", width:"50px", borderRadius:"50px", marginLeft:'40px',border:'solid 2px brown',marginTop:'30px'}} 
            alt='logo' src="https://thumbs.dreamstime.com/b/lets-shopping-logo-design-template-cart-icon-designs-134743663.jpg"/> 
            {auth ?
                <ul className='nav-ul'>
                    <li> <Link className='link' to="/"> Products </Link></li>
                    <li> <Link className='link' to="/add">Add Products </Link></li>
                    <Link className='link' to="/update/:id"></Link>
                    {/* <li> <Link className='link' to="/profile"></Link></li> */}
                    
                    <Link onClick={() => { logout() }} style={{float:"right"}} className='link' to="/signup">Logout </Link> 
                     <Link style={{textDecoration:"none",color:"red",float:'left', fontWeight:"600", fontSize:"18px",textAlign:'-webkit-center',marginLeft:'10px'}}>
                        {JSON.parse(auth).name} </Link>

                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link className='link' to="/signup">Sign up </Link></li>
                    <li> <Link className='link' to="/login">login </Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav;