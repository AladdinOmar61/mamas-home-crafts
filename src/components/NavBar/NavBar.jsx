import './NavBar.css'

function NavBar() {
    return(
        <>
        <div className='nav-bar'>
            {/* TODO: change these to routes later */}
            <p className='nav-item'>cart</p>
            <p className='nav-item'>seasons</p>
            <p className='nav-item'>profile</p>
        </div>
        </>
    )
}

export default NavBar