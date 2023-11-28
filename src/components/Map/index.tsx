import MapView, { LatLng, Marker, MapViewProps, PROVIDER_GOOGLE } from 'react-native-maps';

import { IconBox } from '../IconBox';
import { Car } from 'phosphor-react-native';

type Props = MapViewProps & {
  coordinates: LatLng[];
}

export function Map({ coordinates, ...rest }: Props) {
  const lastCoordinate = coordinates[coordinates.length - 1];

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      style={{ height: 200, width: '100%' }}
    >
      <Marker coordinate={coordinates[0]}>
        <IconBox icon={Car} size="SMALL" />
      </Marker>
    </MapView>
  );
}
