import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {Icon, latLng, Marker} from 'leaflet';
import {ICON_ANCHOR, ICON_SIZE, URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from '../../const';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';


const mapStateToProps = ({offersList, activeCity, activeCardId}: State) => ({
  offersList: offersList.filter((offer) => offer.city.name === activeCity),
  activeCity,
  activeCardId,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

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

function Map(props: PropsFromRedux) {
  const {offersList, activeCity, activeCardId} = props;
  const city = offersList.find((offer) => offer.city.name === activeCity)?.city;
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
      markersRef.current =  offersList
        .map((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          });

          marker
            .setIcon(offer.id === activeCardId ? activeIcon : defaultIcon)
            .addTo(map);
          return marker;

        });
    }
    return () => {
      markersRef.current && deleteMarkers(markersRef.current);
    };
  }, [map, activeCity, activeCardId, offersList, city]);


  return <div style={{height: '100%', width: '100%'}} ref={mapRef} />;
}

export default connector(Map);
