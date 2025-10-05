/**
 * Exportaciones principales para el sistema de mapas
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con mapas
 * para facilitar las importaciones en otros archivos del proyecto.
 */

// Componentes
export { default as MapSelector } from '../MapSelector';
export { default as LocationPreview } from '../LocationPreview';

// Hooks
export { useLocation } from '../../hooks/useLocation';

// Tipos
export type {
  LocationCoordinates,
  LocationData,
  MapRegion,
  LocationSelectionResult,
  UseLocationReturn,
  MapSelectorProps,
} from '../../types/location';
