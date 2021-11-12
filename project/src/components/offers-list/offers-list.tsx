import PlaceCard from '../place-card/place-card';
// import {useState} from 'react';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {sortPlaces} from '../../utils';

const mapStateToProps = ({offersList, activeCity, activeSorting}: State) => ({
  offersList: sortPlaces(offersList
    .filter((offer) => offer.city.name === activeCity), activeSorting),
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function OffersList(props: PropsFromRedux): JSX.Element {
  const {offersList} = props;
  // const [activeCardId, setActiveCardId] = useState<number | undefined>(undefined);
  // eslint-disable-next-line no-console
  // console.log(activeCardId);
  return (
    <>
      {offersList.map((offer) => <PlaceCard isMainScreen offer={offer} key={offer.id} />)}
    </>
  );
}

export default connector(OffersList);
