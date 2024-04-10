'use client';
import React, { useState, useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

import getAddressCoordinates from '@/lib/getAddressCoordinates';

export default function EventMap({ address }) {
    const [latlng, setLatlng] = useState();

    useEffect(() => {
        const getCoordinates = async () => {
            const coordinates = await getAddressCoordinates(address);
            setLatlng(coordinates);
            return coordinates;
        };

        getCoordinates();
    }, []);

    const position = latlng
        ? { lat: latlng.latitude, lng: latlng.longitude }
        : null;

    const [open, setOpen] = useState(false);
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
            <div className='h-80'>
                {position ? (
                    <Map
                        mapId={process.env.NEXT_PUBLIC_MAP_ID}
                        defaultCenter={position}
                        defaultZoom={13}
                        streetViewControl={false}
                        mapTypeControl={false}
                        fullscreenControl={false}>
                        <AdvancedMarker
                            position={position}
                            onClick={() => {
                                setOpen(true);
                            }}>
                            <Pin
                                background={'#0c87b8'}
                                borderColor={'white'}
                                glyphColor={'white'}
                            />
                        </AdvancedMarker>
                        {open && (
                            <InfoWindow
                                position={position}
                                onCloseClick={() => setOpen(false)}>
                                <p>I'm in Hamburg</p>
                            </InfoWindow>
                        )}
                    </Map>
                ) : (
                    <div>Loading map...</div>
                )}
            </div>
        </APIProvider>
    );
}
