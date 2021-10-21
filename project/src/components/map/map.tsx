import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {City, Point} from '../../types/types';
import {Icon, Marker} from 'leaflet';
import {ICON_ANCHOR, ICON_SIZE, URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  city: City;
  points: Point[]
  // selectedPoint: Point | undefined;
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

export function Map(props: MapProps) {
  const {city, points} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(defaultIcon)
          //   selectedPoint
          //     ? activeIcon
          //     : defaultIcon,
          // )
          .addTo(map);
      });
    }
  }, [map, points]);


  return <div style={{height: '100%', width: '100%'}} ref={mapRef} />;
}
