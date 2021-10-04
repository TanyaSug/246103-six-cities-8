import MainScreen from '../main/main-screen';
import {Data} from '../../index';

type AppProps = Data;

function App(props: AppProps): JSX.Element {

  return <MainScreen offers={props.offers} />;
}

export default App;
