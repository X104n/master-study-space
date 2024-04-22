"use client"
import React, { useState } from 'react';
import "./temp.css";

export default function Home() {
    // Initial state for the iframe URL, with a timestamp to prevent caching
    const [iframeSrc, setIframeSrc] = useState(`https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331323,60.381346&zoom=19&sharepoitype=poi&sharepoi=1000724604&t=${new Date().getTime()}`);

    // Function to change the iframe URL and append a timestamp
    const handleButtonClick = (newSrc) => {
        const uniqueSrc = `${newSrc}&t=${new Date().getTime()}`;
        console.log("Updating iframe src to:", uniqueSrc); // Debug log to check the URL update
        setIframeSrc(uniqueSrc);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: "200px", padding: '10px' }}>
                    {/* Buttons to select the iframe source */}
                    <button className={"map-button"} onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=2&center=5.330665,60.381471&zoom=18&sharepoitype=poi&sharepoi=1000719877")}>Selmer (2. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331329,60.381363&zoom=18&sharepoitype=poi&sharepoi=1000724604")}>Glassburet (3. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331309,60.381257&zoom=19.6&sharepoitype=poi&sharepoi=1000724687")}>Algoritmer (3. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=4&center=5.330720,60.381403&zoom=18&sharepoitype=poi&sharepoi=1000724846")}>Jafu (4. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=4&center=5.331439,60.381221&zoom=18&sharepoitype=poi&sharepoi=1000724845")}>Optimering (4. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick("https://use.mazemap.com/#v=1&campusid=340&zlevel=6&center=5.330693,60.381404&zoom=18&sharepoitype=poi&sharepoi=1000720236")}>Maskinlæring (6. etasje)</button>
                </div>
                <div style={{ padding: '10px' }}>
                    {/* Content for column 2 */}
                    <h1>Lokasjon for Mastersalene</h1>
                    <iframe
                         key={iframeSrc} // Changing the key forces React to remount the iframe
                         src={iframeSrc}
                         style={{ width: '800px', height: '400px' }}
                         onLoad={() => console.log("Iframe loaded with src:", iframeSrc)}
                    >
                    </iframe>
                </div>
            </div>
        </>
    );
}
