/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@goongmaps/goong-geocoder-react' {
    import { ComponentType, Ref } from 'react';
    import { ViewportProps } from '@goongmaps/goong-map-react';
  
    interface GeocoderProps {
      mapRef: Ref<any>;
      onViewportChange: (viewport: ViewportProps) => void;
      goongApiAccessToken: string;
    }
  
    const Geocoder: ComponentType<GeocoderProps>;
  
    export default Geocoder;
  }
  