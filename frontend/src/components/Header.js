import {useState} from "react";
import {NavLink} from "react-router-dom";

function Header({email, onSignOut}) {

  // Малое скрываемое меню присутствует в малом варианте разметки только в случае наличия email
  const hasMenu = !!email;
  // Нам нужно хранить состояние открытия / закрытия малого меню (прие его наличии)
  const [isSmallMenuOpened, setIsSmallMenuOpened] = useState(false);
  const menuButtonAriaLabel = isSmallMenuOpened ? 'Закрыть меню' : 'Открыть меню';
  const menuButtonClassName = `header__menu-button ${isSmallMenuOpened ? 'header__menu-button_active' : ''}`;

  // Мы имеем декартово произведение сосстояний <болшой экран / малый экран> x <малое меню открыто / малое меню закрыто>
  const menuClassName = `menu ${isSmallMenuOpened ? 'menu_active' : ''}`;

  const onMenuToggle = () => {
    setIsSmallMenuOpened((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className='header__container'>
        <div className="header__logo"/>
        {
          hasMenu ? (
            <button className={menuButtonClassName} type='button' aria-label={menuButtonAriaLabel}
                    onClick={onMenuToggle}/>
          ) : (
            <nav className='header__nav-container'>
              <NavLink to='/sign-in'
                       className={({isActive}) => `header__nav-link ${isActive ? 'header__nav-link_active' : ''}`}>Войти</NavLink>
              <NavLink to='/sign-up'
                       className={({isActive}) => `header__nav-link ${isActive ? 'header__nav-link_active' : ''}`}>Регистрация</NavLink>
            </nav>
          )
        }
      </div>
      {
        hasMenu
          ? (
            <div className={menuClassName}>
              <p className='menu__text'>{email}</p>
              <button className='menu__button' onClick={onSignOut}>Выйти</button>
            </div>
          )
          : null}
    </header>
  );
}

export default Header;
