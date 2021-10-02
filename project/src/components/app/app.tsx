import MainScreen from '../main/main-screen';
function App(): JSX.Element {
  const offers = [
    {
      id: 1,
      src: 'img/apartment-02.jpg',
      price: 132,
      name: 'Canal View Prinsengracht',
      type: 'Apartment',
    },
  ];
  return <MainScreen offers={offers} />;
}

export default App;
