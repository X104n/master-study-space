import React, { useEffect, useRef } from 'react';
import useScript from '../hooks/useScript';
import useCss from '../hooks/useCss';

const MapComponent = ({ room, showDesks }) => {
    const mapRef = useRef(null); // Holds the map instance
    const deskMarkers = useRef([]); // Holds references to desk markers for easy removal

    useScript('https://api.mazemap.com/js/v2.0.114/mazemap.min.js');
    useCss('https://api.mazemap.com/js/v2.0.114/mazemap.min.css');

    // Function to handle map click and add markers
    const handleMapClick = (map, lng, lat) => {
        const marker = new Mazemap.MazeMarker({
            zLevel: map.zLevel,
            color: 'blue',
            shape: 'circle',
            size: 24
        })
        .setLngLat({ lng, lat })
        .addTo(map);

        marker.on('click', () => {
            marker.remove(); // Allows removal of the marker on click
        });

        console.log(`Marker added at Longitude: ${lng}, Latitude: ${lat}`);
    };

    // Modify useEffect that initializes the map
    useEffect(() => {
        if (window.Mazemap && !mapRef.current) {
            mapRef.current = new Mazemap.Map({
                container: 'mapContainer',
                campuses: 340,
                center: { lng: room.lng, lat: room.lat },
                zoom: room.zoom,
                zLevel: room.zLevel
            });

            mapRef.current.on('load', () => {
                console.log("MazeMap loaded successfully");
                if (showDesks) {
                    loadDesks(mapRef.current, room);
                }
                
                // Add click listener to the map
                mapRef.current.on('click', (e) => {
                    handleMapClick(mapRef.current, e.lngLat.lng, e.lngLat.lat);
                });
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.jumpTo({
                center: { lng: room.lng, lat: room.lat },
                zoom: room.zoom,
                zLevel: room.zLevel
            });

            if (showDesks) {
                loadDesks(mapRef.current, room);
            } else {
                removeDesks();
            }
        }
    }, [room, showDesks]);

    function loadDesks(map, room) {
        removeDesks(); // First clear any existing desks
        room.desks.forEach(desk => {
            const marker = new Mazemap.MazeMarker({
                zLevel: room.zLevel,
                color: desk.status === 'available' ? 'green' : 'red',
                shape: 'marker',
                size: 44,
                innerCircle: true,
                innerCircleColor: '#FEFEFE',
                innerCircleScale: 0.5,
                imgUrl: desk.imageUrl,
                imgScale: 0.8
            }).setLngLat({ lng: desk.lng, lat: desk.lat }).addTo(map);

            marker.on('click', () => {
                console.log(`Desk ${desk.name} clicked`);
                new Mazemap.Popup({ closeOnClick: true, offset: [0, -27] })
                    .setHTML(`<strong style="color: black; font-size: 14px;">${desk.name}</strong> Status: <span style="color: ${desk.status === 'available' ? 'green' : 'red'};">${desk.status}</span>`)
                    .setLngLat({ lng: desk.lng, lat: desk.lat })
                    .addTo(map);
            });
            deskMarkers.current.push(marker);
        });
    }

    function removeDesks() {
        deskMarkers.current.forEach(marker => marker.remove());
        deskMarkers.current = [];
    }

    return <div id="mapContainer" style={{ width: '250%', height: '600px' }}></div>;
};

export default MapComponent;
