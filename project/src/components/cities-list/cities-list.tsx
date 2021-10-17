import {CITIES_LIST} from '../../const';

export function CitiesList(): JSX.Element {

  return (
    <ul className="locations__list tabs__list">
      {
        CITIES_LIST.map((city, index) => (
          <li className="locations__item" key={city} >
            <a className="locations__item-link tabs__item">
              <span>{city}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}
