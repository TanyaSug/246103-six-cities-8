import React, {useState} from 'react';
import {changeSorting} from '../../store/action';
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import {SortingTypes} from '../../const';
import {State} from '../../types/state';

const mapStateToProps = ({activeSorting}: State) => ({
  activeSorting,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function Sorting(props: PropsFromRedux): JSX.Element {
  const {activeSorting} = props;
  const dispatch = useDispatch();
  const [openedSorting, setOpenedSorting] = useState(false);

  const handleSortingClick = () => {
    setOpenedSorting((prevState) => !prevState);
  };

  const handleSortingChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    dispatch(changeSorting(evt.currentTarget.innerText));
    setOpenedSorting(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}  onClick={handleSortingClick}>
        {activeSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {openedSorting &&
      <ul className="places__options places__options--custom places__options--opened" data-testid="places-options">
        {Object.values(SortingTypes).map((sortingType) => (
          <li className= "places__option places__option--active"
            key={sortingType}
            tabIndex={0}
            onClick={handleSortingChange}
          >{sortingType}
          </li>
        ))}
      </ul>}
    </form>
  );
}
export default connector(Sorting);
