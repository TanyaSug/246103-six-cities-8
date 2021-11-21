import {Logo} from '../logo/logo';
import UserBox from '../user-box/user-box';

export function Header (): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <UserBox />
        </div>
      </div>
    </header>
  );
}
