import PlaceCard from '../place-card/place-card';
import {Offer} from '../../index';
import {useState} from 'react';

type OffersListProps = {
  offers: Offer[],
}
export function OffersList(props: OffersListProps): JSX.Element {
  const {offers} = props;
  const [activeCardId, setActiveCardId] = useState<number | undefined>(undefined);
  // eslint-disable-next-line no-console
  console.log(activeCardId);
  return (
    <>
      {offers.map((offer) => <PlaceCard setActive={setActiveCardId} offer={offer} key={offer.id} />)}
    </>
  );
}
