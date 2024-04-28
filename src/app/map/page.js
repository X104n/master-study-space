"use client"
import React, { useState } from 'react';
import "./temp.css";
import MapComponent from './MapComponent';


const rooms = [
    {
        id: 'selmer',
        name: 'Selmer (2. etasje)',
        lng: 5.330665,
        lat: 60.381471,
        zLevel: 2,
        zoom: 21.5,
        desks: [
            { "id": 3, "name": "Desk A1", "lng": 5.330641044402228, "lat": 60.38147679598757, "status": "available" },
            { "id": 2, "name": "Desk A2", "lng": 5.330649116011756, "lat": 60.381483162375645, "status": "booked" },
            { "id": 4, "name": "Desk A3", "lng": 5.330657999953871, "lat": 60.38149014367019, "status": "available" },
            { "id": 5, "name": "Desk A4", "lng": 5.3306677008078225, "lat": 60.381497545523075, "status": "available" },
            { "id": 6, "name": "Desk A5", "lng": 5.330667969825441, "lat": 60.381469969363735, "status": "booked" },
            { "id": 7, "name": "Desk A6", "lng": 5.330675349455106, "lat": 60.381476932167146, "status": "booked" },
            { "id": 8, "name": "Desk A7", "lng": 5.330683903117034, "lat": 60.3814848896547, "status": "booked" },
            { "id": 1, "name": "Desk A8", "lng": 5.330692308972544, "lat": 60.38149234974597, "status": "available" }
        ]
        
    },
    {
        id: 'glassburet',
        name: 'Glassburet (3. etasje)',
        lng: 5.331329,
        lat: 60.381363,
        zLevel: 3,
        zoom: 21.5,
        desks: [
            { id: 1, name: "Desk A1", lng: 5.331272663804953, lat: 60.38137101094881, status: "available" },
            { id: 2, name: "Desk A2", lng: 5.331287132613028, lat: 60.381382968089156, status: "booked" },
            { id: 3, name: "Desk A3", lng: 5.331290574167042, lat: 60.3813663671325, status: "available" },
            { id: 4, name: "Desk A4", lng: 5.331302071910557, lat: 60.381379492970865, status: "available" },
            { id: 5, name: "Desk A5", lng: 5.3313050431412705, lat: 60.38136238137167, status: "available" },
            { id: 6, name: "Desk A6", lng: 5.331319274919906, lat: 60.381375628163, status: "booked" },
            { id: 7, name: "Desk A7", lng: 5.331387824651671, lat: 60.38135734055564, status: "booked" },
            { id: 8, name: "Desk A8", lng: 5.331369323340255, lat: 60.38136132631706, status: "booked" },
            { id: 9, name: "Desk A9", lng: 5.331355328758008, lat: 60.38135042408635, status: "available" },
            { id: 10, name: "Desk A10", lng: 5.331374778854752, lat: 60.381344914355, status: "booked" },
            { id: 11, name: "Desk A11", lng: 5.3313655281995125, lat: 60.38133459826031, status: "booked" }
        ]
    },
    {   id: 'algoritmer', 
        name: 'Algoritmer (3. etasje)', 
        lng: 5.331309, 
        lat: 60.381257, 
        zLevel: 3, 
        zoom: 21.5,
        desks: [ 
        { id: 1, name: "Desk A1", lng: 5.331292197110059, lat: 60.38129713838666, status: 'available' },
        { id: 2, name: "Desk A2", lng: 5.3313313964430336, lat: 60.381286881923245, status: 'booked' },
        { id: 3, name: "Desk A3", lng: 5.331371364390321, lat: 60.381277891687546, status: 'available' },
        { id: 4, name: "Desk A4", lng: 5.331350868007291, lat: 60.381261683931996, status: 'available' },
        { id: 5, name: "Desk A5", lng: 5.331337052754577, lat: 60.38124968591876, status: 'available' },
        { id: 6, name: "Desk A6", lng: 5.331317837392987, lat: 60.3812325917861, status: 'booked' },
        { id: 7, name: "Desk A7", lng: 5.331313401941145, lat: 60.38127239092489, status: 'booked' },
        { id: 8, name: "Desk A8", lng: 5.33129572381074, lat: 60.38125972861425, status: 'booked' }, //DONE hasta aqui
        { id: 9, name: "Desk A9", lng: 5.331274837479555, lat: 60.381282801796175, status: "available" },
        { id: 10, name: "Desk A10", lng: 5.331259540344263, lat: 60.38126803024613, status: "booked" },
        { id: 11, name: "Desk A11", lng: 5.331275482656963, lat: 60.38124411120799, status: "booked" },
        { id: 12, name: "Desk A12", lng: 5.331239475552337, lat: 60.381253532440724, status: "available" },
      //  { id: 13, name: "Desk A10", lng: 5.331374778854752, lat: 60.381344914355, status: "booked" }
        

        ]
    },
    {   id: 'jafu',
        name: 'Jafu (4. etasje)',
        lng: 5.330720,
        lat: 60.381403,
        zLevel: 4,
        zoom: 21.5,
        desks: [
            { id: 1, name: "Desk A1", lng: 5.3307543103656485, lat: 60.38138219693977, status: "available" },
            { id: 2, name: "Desk A2", lng: 5.3307763664885215, lat: 60.38140110279028, status: "booked" },
            { id: 3, name: "Desk A3", lng: 5.33074948558874, lat: 60.38140927828999, status: "available" },
            { id: 4, name: "Desk A4", lng: 5.330727774092168, lat: 60.381391394382064, status: "available" }, //dsad
            { id: 5, name: "Desk A5", lng: 5.330700203938591, lat: 60.38139991052978, status: "available" },
            { id: 6, name: "Desk A6", lng: 5.33072157080764, lat: 60.38141694281882, status: "booked" },//dsad
            { id: 7, name: "Desk A7", lng: 5.330675867405375, lat: 60.38138859898271, status: "booked" },
            { id: 8, name: "Desk A8", lng: 5.330660525158407, lat: 60.381435022485505, status: "booked" },
            { id: 9, name: "Desk A9", lng: 5.33068901790233, lat: 60.38142573779018, status: "available" }

        ]
    },
    
    {   id: 'optimering', 
        name: 'Optimering (4. etasje)',
        lng: 5.331439,
        lat: 60.381221,
        zLevel: 4,
        zoom: 21.5,
        desks: [
           { id: 1, name: "Desk A1", lng: 5.331440453092597, lat: 60.38124283634187, status: 'available' },
           { id: 2, name: "Desk A2", lng: 5.331422877124879, lat: 60.38122818849581, status: 'booked' },
           { id: 3, name: "Desk A3", lng: 5.331404267271125, lat: 60.38121405161456, status: 'available' },
           { id: 4, name: "Desk A4", lng: 5.331475260417847, lat: 60.381231594972235, status: 'available' },
           { id: 5, name: "Desk A5", lng: 5.331459062952007, lat: 60.38121882068353, status: 'available' },
           

        ]
    },
    {   id: 'maskinlaering',
        name: 'Maskinlæring (6. etasje)',
        lng: 5.330693,
        lat: 60.381404,
        zLevel: 6,
        zoom: 21.5,
        desks: [
           { id: 1, name: "Desk A1", lng: 5.330691493474973, lat: 60.38136628148442, status: 'available' },
           { id: 2, name: "Desk A2", lng: 5.330716278361422, lat: 60.38136968406815, status: 'booked' },
           { id: 3, name: "Desk A3", lng: 5.330736588199471, lat: 60.38137274639294, status: 'available' },
           { id: 4, name: "Desk A4", lng: 5.330682199142046, lat: 60.38137904117076, status: 'available' },
           { id: 5, name: "Desk A5", lng: 5.3307056070902945, lat: 60.381383124269234, status: 'available' },
           { id: 1, name: "Desk A6", lng: 5.330728326570636, lat: 60.38138635672212, status: 'available' }, //DONE
           { id: 2, name: "Desk A7", lng: 5.330673937513211, lat: 60.38139231123924, status: 'booked' },
           { id: 3, name: "Desk A8", lng: 5.330697689696564, lat: 60.38139588394898, status: 'available' },
           { id: 4, name: "Desk A9", lng: 5.330719376472786, lat: 60.38139826575525, status: 'available' },
           { id: 5, name: "Desk A10", lng: 5.330664298946317, lat: 60.38140592156023, status: 'available' },
           { id: 1, name: "Desk A11", lng: 5.330687706894537, lat: 60.38140915401058, status: 'available' },
           { id: 2, name: "Desk A12", lng: 5.330711459077918, lat: 60.38141272671848, status: 'booked' },
           { id: 3, name: "Desk A13", lng: 5.330656037317453, lat: 60.38141902148885, status: 'available' },
           { id: 4, name: "Desk A14", lng: 5.3306804779687695, lat: 60.3814222539379, status: 'available' },
           { id: 5, name: "Desk A15", lng: 5.330701820511024, lat: 60.381425486386604, status: 'available' },


        ]
    },
	


];


export default function Home() {
    const [currentRoom, setCurrentRoom] = useState(rooms[0]);
    const [showDesks, setShowDesks] = useState(false);

    return (
        <div style={{ display: 'flex' }}>
            <div className="nav-panel">
                {rooms.map(room => (
                    <button
                        key={room.id}
                        className={`map-button ${currentRoom.id === room.id ? "active" : ""}`}
                        onClick={() => setCurrentRoom(room)}
                    >
                        {room.name}
                    </button>
                ))}
                <hr />
                <button
                    className={`map-button ${showDesks ? "active" : ""}`}
                    onClick={() => setShowDesks(!showDesks)}
                >
                    {showDesks ? 'Hide Desks' : 'Show Desks'}
                </button>
            </div>
            <div style={{ padding: '10px'}}>
                <h1>Lokasjon for Mastersalene</h1>
                <MapComponent room={currentRoom} showDesks={showDesks} />
            </div>
        </div>
    );
}