"use client";
import React, { useEffect, useState } from 'react';
import "./temp.css";
import MapComponent from './MapComponent';
import fetchRooms from "@/app/components/desks";

export default function Home() {
    const [rooms, setRooms] = useState([]); // To store fetched rooms
    const [currentRoom, setCurrentRoom] = useState(null); // To manage the currently selected room
    const [showDesks, setShowDesks] = useState(false);

    // Fetch rooms when component mounts
    useEffect(() => {
        fetchRooms().then(fetchedRooms => {
            const roomArray = Object.values(fetchedRooms); // Assuming the fetched data is an object and needs to be converted to an array
            setRooms(roomArray);
            if (roomArray.length > 0) {
                setCurrentRoom(roomArray[0]); // Set the first room as the default room
            }
        });
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: "200px", padding: '10px' }}>
                {rooms.map(room => (
                    <button key={room.id} className="map-button" onClick={() => setCurrentRoom(room)}>
                        {room.name}
                    </button>
                ))}
                <hr />
                <button onClick={() => setShowDesks(!showDesks)}>
                    {showDesks ? 'Hide Desks' : 'Show Desks'}
                </button>
            </div>
            <div style={{ padding: '10px' }}>
                <h1>Lokasjon for Mastersalene</h1>
                {currentRoom && <MapComponent room={currentRoom} showDesks={showDesks} />}
            </div>
        </div>
    );
}
