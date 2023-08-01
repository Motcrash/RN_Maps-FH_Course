import React, { useEffect, useRef, useState } from 'react'

import MapView, { Polyline } from 'react-native-maps'

import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { FAB } from './FAB';

export const Map = () => {

    const [showPoliline, setShowPoliline] = useState(true)
    
    const { hasLocation, 
        initialPosition,
        getCurrentLocation, 
        followUser,
        userLocation,
        stopFollow,
        routes, } = useLocation();
        
    const mapViewRef = useRef<MapView>();
    const following = useRef(true);

    useEffect(() => {
        followUser();
        return () => {
            stopFollow
        }
    }, [])

    useEffect(() => {

        if( !following.current ) return;


        const location = userLocation;

        mapViewRef.current?.animateCamera({
            center: location
        });
    }, [ userLocation ])
    
    

    const centerPos = async() => {

        following.current = true;

        const location = await getCurrentLocation();

        mapViewRef.current?.animateCamera({
            center: location
        });
    }

    if (!hasLocation){
        <LoadingScreen />
    }
    
   return (
       <>
            <MapView
                ref={ ( el ) => mapViewRef.current = el!}
                style={{flex:1}}
        
                showsUserLocation
                showsMyLocationButton= { false }
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchMove={ () => following.current = false }
            >

                {
                    showPoliline && (
                        <Polyline
                            coordinates={ routes }
                            strokeColor='black'
                            strokeWidth={ 3 }
                        />
                    )
                }

            </MapView>

            <FAB
                iconName='locate-outline'
                onPress={ centerPos }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />

            <FAB
                iconName='brush-outline'
                onPress={ () => setShowPoliline( value => !value) }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20
                }}
            />
       </>
   )
}