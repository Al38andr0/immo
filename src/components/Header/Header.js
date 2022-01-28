import logo from '../../img/immo-logo.svg';
import './Header.scss'

const Header = () => (
  <header className="header">
    <img src={logo} alt="logo"/>
    <h1>Property search tool</h1>
  </header>
)

export default Header
