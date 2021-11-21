import {CITIES_LIST} from '../../const';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Action} from '../../types/action-types';
import {State} from '../../types/state';
import {toggleActiveCity} from '../../store/action';
import {A} from '../helper-co/anchor/anchor';

const mapStateToProps = ({activeCity}: State) => ({
  activeCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onClick: (city: string) =>  dispatch(toggleActiveCity(city)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function CitiesList(props: PropsFromRedux): JSX.Element {
  const {onClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {
        CITIES_LIST.map((city) => (
          <li className="locations__item" key={city} >
            <A onClick={() => onClick(city)} className={`locations__item-link tabs__item ${props.activeCity === city ? 'tabs__item--active' : ''}`}>
              <span>{city}</span>
            </A>
          </li>
        ))
      }
    </ul>
  );
}
export default connector(CitiesList);
