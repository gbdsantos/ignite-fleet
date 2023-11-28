import MapView, { LatLng, Marker, MapViewProps, PROVIDER_GOOGLE } from 'react-native-maps';

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
      <Marker
        coordinate={coordinates[0]}
      />
    </MapView>
  );
}
