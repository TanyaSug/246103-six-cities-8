import PlaceCard from '../place-card/place-card';
import {Offer} from '../../index';
// import {useState} from 'react';

type OffersListProps = {
  offers: Offer[],
}
export function OffersList(props: OffersListProps): JSX.Element {
  const {offers} = props;
  // const {id} = offers;
  // const [activeCard, setActiveCard] = useState(true);
  return (
    <>
      {offers.map((offer) => <PlaceCard offer={offer} key={offer.id} />)}
    </>
  );
}
