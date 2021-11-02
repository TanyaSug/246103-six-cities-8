import PlaceCard from '../place-card/place-card';
// import {useState} from 'react';
// import {Offer} from '../../types/types';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

// type OffersListProps = {
//   offers: Offer[],
// }

const mapStateToProps = ({offersList, activeCity}: State) => ({
  offersList: offersList.filter((offer) => offer.city.name === activeCity),
  // hoveredOfferId: hoveredOfferId,
});
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

export function NearOffersList(props: PropsFromRedux): JSX.Element {
  const {offersList} = props;
  // const [activeCardId, setActiveCardId] = useState<number | undefined>(undefined);
  // eslint-disable-next-line no-console
  // console.log(activeCardId);
  return (
    <>
      {offersList
        .slice(0, 3)
        .map((offer) => <PlaceCard  offer={offer} key={offer.id} />)}
    </>
  );
}
