export default function NavBar(props) {
  return (
    <nav className="navbar">
      <p className="navbar__user-email">{props.userEmail}</p>
      <button onClick={props.handleNavBarClose} className="navbar__button">Выйти</button>
    </nav>
  )
}