import logo from '/logo.png'
function Header() {
 return(
    <header className='header'>
    <img src={logo} alt="nothin" className='logo' />
    <h1 className='title'>Chef Borma</h1>
    </header>
 )
}

export default Header