// map/DeskInteraction.js
import { updateDeskStatus } from './DeskAPI';

const loadDesks = (map) => {
    // Example desks data could be fetched from an API
    const desks = [
        { id: 1, name: "Desk A1", lat: 60.381500, lng: 5.331400, status: 'available' },
        { id: 2, name: "Desk A2", lat: 60.381510, lng: 5.331405, status: 'booked' }
    ];

    desks.forEach(desk => {
        const marker = new Mazemap.MazeMarker({
            color: desk.status === 'available' ? 'green' : 'red',
            size: 34,
            zLevel: 1,
            imgUrl: desk.status === 'available' ? '/path_to_available_icon' : '/path_to_booked_icon'
        }).setLngLat({lng: desk.lng, lat: desk.lat})
          .addTo(map)
          .on('click', () => handleDeskClick(desk, map));
    });
};

const handleDeskClick = (desk, map) => {
    console.log(`Desk ${desk.name} clicked.`);
    // You can expand this to open a modal or trigger a booking flow
};

export default loadDesks;
