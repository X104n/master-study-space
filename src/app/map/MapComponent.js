// map/MapComponent.js
import React, { useEffect } from 'react';
import useScript from '../hooks/useScript';
import useCss from '../hooks/useCss';

const MapComponent = () => {
    const initializeMap = () => {
        if (window.Mazemap) {
            const map = new Mazemap.Map({
                container: 'mapContainer',
                campuses: 340,
                center: { lng: 5.331329, lat: 60.381363 },
                zoom: 21.5,
                zLevel: 3
            });

            map.on('load', () => {
                console.log("MazeMap loaded successfully without view token");
                loadDesks(map);
            });
        }
    };

    useScript('https://api.mazemap.com/js/v2.0.114/mazemap.min.js', initializeMap);
    useCss('https://api.mazemap.com/js/v2.0.114/mazemap.min.css');

    return <div id="mapContainer" style={{ width: '250%', height: '600px' }}></div>;
};

// Assume this function is called within the useEffect after the map has loaded
const loadDesks = (map) => {
    const desks = [     //Lng = upwards, lat = sideways
        { id: 1, name: "Desk A1", lng: 5.33129, lat: 60.381363, status: 'available' },
        { id: 2, name: "Desk A2", lng: 5.331329 - 0.0000, lat: 60.381363 - 0.00001, status: 'booked' },
        { id: 3, name: "Desk A3", lat: 60.381520, lng: 5.331410, status: 'available' },
        { id: 4, name: "Desk A4", lat: 60.381530, lng: 5.331415, status: 'available' },
        { id: 5, name: "Desk A5", lat: 60.381540, lng: 5.331420, status: 'available' },
        { id: 6, name: "Desk A6", lat: 60.381550, lng: 5.331425, status: 'booked' },
        { id: 7, name: "Desk A7", lat: 60.381560, lng: 5.331430, status: 'booked' },
        { id: 8, name: "Desk A8", lat: 60.381570, lng: 5.331435, status: 'booked' },
        { id: 9, name: "Desk A9", lat: 60.381580, lng: 5.331440, status: 'available' },
        { id: 10, name: "Desk A10", lat: 60.381590, lng: 5.331445, status: 'booked' },
        { id: 11, name: "Desk A11", lat: 60.381600, lng: 5.331450, status: 'booked' }
    ];

    
    desks.forEach(desk => {
        var marker = new Mazemap.MazeMarker({
            zLevel: desk.zLevel,
            color: desk.status === 'available' ? 'green' : 'red', // Custom color based on availability
            shape: 'circle',
            size: 24
        }).setLngLat({lng: desk.lng, lat: desk.lat})
          .addTo(map);

        marker.on('click', () => {
            console.log(`Desk ${desk.name} clicked`);
            var popup = new Mazemap.Popup({closeOnClick: true, offset: [0, -27]})
                .setHTML(`<strong style="color: black; font-size: 14px;">${desk.name}</strong> Status: <span style="color: ${desk.status === 'available' ? 'green' : 'red'};">${desk.status}</span>`)
                .setLngLat({lng: desk.lng, lat: desk.lat})
                .addTo(map);
        });
    });
};
export default MapComponent;
