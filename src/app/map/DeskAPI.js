// map/DeskAPI.js
export const updateDeskStatus = (deskId, newStatus, map) => {
    fetch(`/api/desks/${deskId}/update`, {
        method: 'POST',
        body: JSON.stringify({ status: newStatus }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Assuming you have a way to access the marker instance, update its status
        console.log(`Status updated for desk ${deskId} to ${newStatus}`);
    });
};
