import {CITIES_LIST} from '../../const';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Action} from '../../types/action-types';
import {State} from '../../types/state';
import {toggleActiveCity} from '../../store/action';


const mapStateToProps = ({activeCity}: State) => ({
  activeCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onClick: (city: string) =>  dispatch(toggleActiveCity(city)),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function CitiesList(props: PropsFromRedux): JSX.Element {

  return (
    <ul className="locations__list tabs__list">
      {
        CITIES_LIST.map((city, index) => (
          <li className="locations__item" key={city} >
            <a onClick={() => props.onClick(city)} className={`locations__item-link tabs__item ${props.activeCity === city ? 'tabs__item--active' : ''}`}>
              <span>{city}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
}
export default connector(CitiesList);
