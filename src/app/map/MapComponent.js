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

                // Click event to capture and use coordinates
                map.on('click', (e) => {
                    const { lng, lat } = e.lngLat;
                    console.log(`Clicked location: Longitude: ${lng}, Latitude: ${lat}`);
                    addTemporaryMarker(map, lng, lat); // Adds a temporary marker
                });
            });
        }
    };

    useScript('https://api.mazemap.com/js/v2.0.114/mazemap.min.js', initializeMap);
    useCss('https://api.mazemap.com/js/v2.0.114/mazemap.min.css');

    return <div id="mapContainer" style={{ width: '250%', height: '600px' }}></div>;
};

// Function to add a temporary marker on the map
const addTemporaryMarker = (map, lng, lat) => {
    new Mazemap.MazeMarker({
        zLevel: 3,
        color: 'blue',
        shape: 'circle',
        size: 24
    })
    .setLngLat({ lng, lat })
    .addTo(map)
    .on('click', function() {
        this.remove(); // Allows removal of the marker on click
    });
};


// Assume this function is called within the useEffect after the map has loaded
const loadDesks = (map) => {
    const desks = [     //Lng = upwards, lat = sideways
        { id: 1, name: "Desk A1", lng: 5.331272663804953, lat: 60.38137101094881, status: 'available' },
        { id: 2, name: "Desk A2", lng: 5.331287132613028, lat: 60.381382968089156, status: 'booked' },
        { id: 3, name: "Desk A3", lng: 5.331290574167042, lat: 60.3813663671325, status: 'available' },
        { id: 4, name: "Desk A4", lng: 5.331302071910557, lat: 60.381379492970865, status: 'available' },
        { id: 5, name: "Desk A5", lng: 5.3313050431412705, lat: 60.38136238137167, status: 'available' },
        { id: 6, name: "Desk A6", lng: 5.331319274919906, lat: 60.381375628163, status: 'booked' },
        { id: 7, name: "Desk A7", lng: 5.331387824651671, lat: 60.38135734055564, status: 'booked' },
        { id: 8, name: "Desk A8", lng: 5.331369323340255, lat: 60.38136132631706, status: 'booked' },
        { id: 9, name: "Desk A9", lng: 5.331355328758008, lat: 60.38135042408635, status: 'available' },
        { id: 10, name: "Desk A10", lng: 5.331374778854752, lat: 60.381344914355, status: 'booked' },
        { id: 11, name: "Desk A11", lng: 5.3313655281995125, lat: 60.38133459826031, status: 'booked' }
    ];

    
    
    desks.forEach(desk => {
        let color = desk.status === 'available' ? 'green' : 'red'; // Set the outer color based on status
        const imageUrl = 'https://raw.githubusercontent.com/nmotamayor/svgDesk/main/desk3.png'; // URL of your custom image

        var marker = new Mazemap.MazeMarker({
            zLevel: 3,
            color: color, // This sets the outer circle color
            shape: 'circle',
            size: 44,
            innerCircle: true,
            innerCircleColor: '#FEFEFE', // Color of the inner circle (you can adjust this if needed)
            innerCircleScale: 0.5, // Size of the inner circle
            imgUrl: imageUrl, // Set the image URL here
            imgScale: 0.8 // Scale of the image inside the marker
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
