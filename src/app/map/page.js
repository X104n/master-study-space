"use client"
import React, { useState } from 'react';
import "./temp.css";
import MapComponent from './MapComponent';


export default function Home() {
    const [iframeSrc, setIframeSrc] = useState("https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331323,60.381346&zoom=19&sharepoitype=poi&sharepoi=1000724604");
    const [showMazeMap, setShowMazeMap] = useState(false);  // Toggle to show MazeMap

    const handleButtonClick = (newSrc) => {
        const uniqueSrc = `${newSrc}&t=${new Date().getTime()}`;
        setIframeSrc(uniqueSrc);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: "200px", padding: '10px' }}>
                    {/* Buttons to select the iframe source */}
                    { /* Additional buttons could be added here for toggling between views */}
                    <button onClick={() => setShowMazeMap(!showMazeMap)}>
                        {showMazeMap ? "Show Iframe View" : "Show MazeMap View"}
                    </button>
                    <hr />
                    <button onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=2&center=5.330665,60.381471&zoom=18&sharepoitype=poi&sharepoi=1000719877")}>Selmer (2. etasje)</button>
                    {/* Additional buttons for other floors */}
                </div>
                <div style={{ padding: '10px' }}>
                    {/* Content for column 2 */}
                    <h1>Lokasjon for Mastersalene</h1>
                    {showMazeMap ? (
                        <MapComponent />
                    ) : (
                        <iframe
                            key={iframeSrc}
                            src={iframeSrc}
                            style={{ width: '800px', height: '400px' }}
                            onLoad={() => console.log("Iframe loaded with src:", iframeSrc)}
                        />
                    )}
                </div>
            </div>
        </>
    );
}