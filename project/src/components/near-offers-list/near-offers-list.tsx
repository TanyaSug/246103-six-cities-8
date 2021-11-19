import PlaceCard from '../place-card/place-card';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {NEAR_OFFERS_COUNT} from '../../const';

const mapStateToProps = ({offersList, activeCity}: State) => ({
  offersList: offersList.filter((offer) => offer.city.name === activeCity),
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function NearOffersList(props: PropsFromRedux): JSX.Element {
  const {offersList} = props;
  return (
    <>
      {offersList
        .slice(0, NEAR_OFFERS_COUNT)
        .map((offer) => <PlaceCard  offer={offer} key={offer.id} />)}
    </>
  );
}

export default connector(NearOffersList);
