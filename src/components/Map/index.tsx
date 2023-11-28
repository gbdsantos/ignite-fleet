import { useRef } from 'react';
import MapView, {
  LatLng,
  Marker,
  MapViewProps,
  PROVIDER_GOOGLE
} from 'react-native-maps';

import { IconBox } from '../IconBox';
import { Car, FlagCheckered } from 'phosphor-react-native';

type Props = MapViewProps & {
  coordinates: LatLng[];
}

export function Map({ coordinates, ...rest }: Props) {
  const mapRef = useRef<MapView>(null);
  const lastCoordinate = coordinates[coordinates.length - 1];

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arriaval'], {
        edgePadding: { bottom: 50, left: 50, right: 50, top: 50 }
      });
    }
  }

  return (
    <MapView
      onMapLoaded={onMapLoaded}
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      style={{ height: 200, width: '100%' }}
    >
      <Marker coordinate={coordinates[0]} identifier="departure" >
        <IconBox icon={Car} size="SMALL" />
      </Marker>

      {
        coordinates.length > 1 &&
        <Marker coordinate={lastCoordinate} identifier="arrival">
          <IconBox icon={FlagCheckered} size="SMALL" />
        </Marker>
      }
    </MapView>
  );
}
