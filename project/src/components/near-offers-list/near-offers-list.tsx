import PlaceCard from '../place-card/place-card';
import {NEAR_OFFERS_COUNT} from '../../const';
import {Offer} from '../../types/types';

type NearOffersListProps = {
  nearBy: Offer[];
}

export function NearOffersList(props: NearOffersListProps): JSX.Element {
  const {nearBy} = props;
  return (
    <div className="near-places__list places__list">
      {nearBy
        .slice(0, NEAR_OFFERS_COUNT)
        .map((offer) => <PlaceCard  offer={offer} key={offer.id} />)}
    </div>
  );
}

