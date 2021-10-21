import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';


const mapStateToProps = ({offersList, activeCity}: State) => ({
  offersList: offersList.filter((offer) => offer.city.name === activeCity),
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function OffersCount(props: PropsFromRedux) {
  return (
    <b className="places__found">{props.offersList.length} places to stay in Amsterdam</b>
  );
}

export default connector(OffersCount);
