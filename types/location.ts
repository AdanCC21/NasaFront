/**
 * Tipos relacionados con ubicación y mapas
 */

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData extends LocationCoordinates {
  name?: string;
  address?: string;
}

export interface MapRegion extends LocationCoordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface LocationSelectionResult {
  coordinates: LocationCoordinates;
  name: string;
  address: string;
}

export interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
  reverseGeocode: (coordinates: LocationCoordinates) => Promise<LocationSelectionResult>;
}

export interface MapSelectorProps {
  initialRegion?: MapRegion;
  onLocationSelect: (location: LocationSelectionResult) => void;
  showCurrentLocationButton?: boolean;
  markerTitle?: string;
  markerDescription?: string;
  style?: object;
}
