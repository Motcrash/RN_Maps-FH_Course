import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState, useRef } from 'react';
import { Location } from '../interfaces/mapInterfaces';


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);

    const [routes, setRoutes] = useState<Location[]>([])

    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0
    })

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    })

    const watchId = useRef<number>();

    const isMounted = useRef(true);

    useEffect(() => {
      isMounted.current;
    
      return () => {
        isMounted.current = false;
      }
    }, [])
    

    useEffect(() => {

        getCurrentLocation()
            .then( location  => {

                if ( !isMounted.current ) return;

                setInitialPosition( location );
                setUserLocation( location );
                setRoutes(routes => [ ...routes, location ]);
                setHasLocation(true);
            })

    }, [])

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise(( resolve, reject) => {
            Geolocation.getCurrentPosition( 
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({ err }), { enableHighAccuracy: true }
                
            );
        })
    }

    const followUser = () => {
        watchId.current = Geolocation.watchPosition(

            
            ({ coords }) => {

                if ( !isMounted.current ) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }

                setUserLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                })

                setRoutes( routes => [ ...routes, location ]);
            },
            ( err ) => console.log( err ), { enableHighAccuracy: true, distanceFilter: 10}
        )
    }

    const stopFollow = () => {

        if( watchId.current ){
            Geolocation.clearWatch( watchId.current );
        }
    }

   return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    userLocation,
    stopFollow,
    routes
   }
}