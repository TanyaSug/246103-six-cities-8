import { Link } from 'react-router-dom';
import {AltText} from '../../const';

export function Logo(): JSX.Element {
  return (
    <Link className="header__logo-link header__logo-link--active" to={'/'}>
      <img className="header__logo" src="../../../img/logo.svg" alt={AltText.CITIES_LOGO} width="81" height="41"/>
    </Link>
  );
}
