import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {Icon, latLng, Marker} from 'leaflet';
import {ICON_ANCHOR, ICON_SIZE, URL_MARKER_DEFAULT} from '../../const';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

// type MapProps = {
//   city: City;
//   // points: Point[]
//   // selectedPoint: Point | undefined;
// };

const mapStateToProps = ({offersList, activeCity}: State) => ({
  offersList: offersList.filter((offer) => offer.city.name === activeCity),
  activeCity: activeCity,
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

// const activeIcon =  new Icon({
//   iconUrl: URL_MARKER_ACTIVE,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

function Map(props: PropsFromRedux) {
  const {offersList, activeCity} = props;
  const city = offersList.find((offer) => offer.city.name === activeCity)?.city;
  const mapRef = useRef(null);
  // eslint-disable-next-line
  console.log(mapRef);
  const markersRef = useRef<Marker[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (markersRef.current !== null) {
      deleteMarkers(markersRef.current);
      markersRef.current = null;
    }
    if (map && city) {
      map.panTo(latLng(city.location.latitude, city.location.longitude));
      markersRef.current =  offersList
        .map((offer) => offer.location)
        .map((offer) => {
          const marker = new Marker({
            lat: offer.latitude,
            lng: offer.longitude,
          });

          marker
            .setIcon(defaultIcon)
          //   selectedPoint
          //     ? activeIcon
          //     : defaultIcon,
          // )
            .addTo(map);
          return marker;

        });
    }
    return () => {
      markersRef.current && deleteMarkers(markersRef.current);
    };
  }, [map, activeCity]);


  return <div style={{height: '100%', width: '100%'}} ref={mapRef} />;
}

export default connector(Map);
