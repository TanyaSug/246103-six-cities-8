import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {Icon, latLng, Marker} from 'leaflet';
import {ICON_ANCHOR, ICON_SIZE, URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from '../../const';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Offer} from '../../types/types';

type MapProps = {
  offersList: Offer[],
  offerLocation?: Offer['location']| undefined,
}
const mapStateToProps = ({activeCity, activeCardId}: State) => ({
  activeCity,
  activeCardId,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

const deleteMarkers = (markers: Marker[]) => {
  markers.forEach((marker) => marker.remove());
};

const defaultIcon =  new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
});

const activeIcon =  new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const makeMarker = (map:Exclude<ReturnType<typeof useMap>,null>, location:Offer['location'], icon:typeof defaultIcon)=>{

  const marker = new Marker({
    lat: location.latitude,
    lng: location.longitude,
  });

  marker
    .setIcon(icon)
    .addTo(map);
  return marker;

};

function Map(props: ConnectedComponentProps) {
  const {offersList, activeCity, activeCardId, offerLocation} = props;
  const filteredOfferList = offersList.filter((offer) => offer.city.name === activeCity);
  const city = filteredOfferList.find((offer) => offer.city.name === activeCity)?.city;
  const mapRef = useRef(null);
  const markersRef = useRef<Marker[] | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (markersRef.current !== null) {
      deleteMarkers(markersRef.current);
      markersRef.current = null;
    }
    if (map && city) {
      map.panTo(latLng(city.location.latitude, city.location.longitude));
      const markers =  filteredOfferList
        .map((offer) => makeMarker(map,offer.location, defaultIcon));
      if(typeof offerLocation !== 'undefined'){
        markers.push(makeMarker(map,offerLocation,activeIcon));
      }
    }

    return () => {
      markersRef.current && deleteMarkers(markersRef.current);
    };
  }, [map, activeCity, activeCardId, filteredOfferList, city, offerLocation]);


  return <div style={{height: '100%', width: '100%'}} ref={mapRef} />;
}

export default connector(Map);
