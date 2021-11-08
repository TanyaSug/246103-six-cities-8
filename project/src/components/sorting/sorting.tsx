import {useState} from 'react';
import {changeSorting} from '../../store/action';
import {useDispatch} from 'react-redux';
import {SortingTypes} from '../../const';

export function Sorting(): JSX.Element {
  const dispatch = useDispatch();
  const [openedSorting, setOpenedSorting] = useState(false);
  const handleSortingClick = () => {
    setOpenedSorting((prevState) => !prevState);
  };

  const handleSortingChange = (evt: any) => {
    dispatch(changeSorting(evt.target.innerText));
    setOpenedSorting(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}  onClick={handleSortingClick}>
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      {openedSorting &&
      <ul className="places__options places__options--custom places__options--opened" data-testid="places-options">
        {Object.values(SortingTypes).map((sortingType, id) => (
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
