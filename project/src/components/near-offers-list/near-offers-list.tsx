import PlaceCard from '../place-card/place-card';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';


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
        .slice(0, 3)
        .map((offer) => <PlaceCard  offer={offer} key={offer.id} />)}
    </>
  );
}

export default connector(NearOffersList);
