import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import Map from '../map/map';

const mapStateToProps = ({offersList}: State) => ({
  offersList,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function MainScreenMap(props: PropsFromRedux) {
  const {offersList} = props;

  return (
    <Map offersList={offersList} />
  );
}

export default connector(MainScreenMap);
