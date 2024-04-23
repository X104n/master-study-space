"use client"
import React, { useState } from 'react';
import "./temp.css"; // Make sure all styles are included here

export default function Home() {
    const initialSrc = {
        iframe: "https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331323,60.381346&zoom=19&sharepoitype=poi&sharepoi=1000724604",
        images: [
            "path_to_default_image1.jpg",
            "path_to_default_image2.jpg",
            "path_to_default_image3.jpg",
            "path_to_default_image4.jpg"
        ]
    };

    // State to handle both iframe and images
    const [src, setSrc] = useState(initialSrc);

    // Function to change both iframe and image sources
    const handleButtonClick = (iframeNewSrc, imagePaths) => {
        const newIframeSrc = `${iframeNewSrc}&t=${new Date().getTime()}`;
        console.log("Updating iframe src to:", newIframeSrc); // Debug log to check the URL update
        setSrc({
            iframe: newIframeSrc,
            images: imagePaths
        });
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: "200px", padding: '10px' }}>
                    {/* Buttons to select the iframe and image sources */}
                    <button className={"map-button"} onClick={() => handleButtonClick(
                        "https://use.mazemap.com/#v=1&campusid=340&zlevel=2&center=5.330665,60.381471&zoom=18&sharepoitype=poi&sharepoi=1000719877",
                        ["path_to_image1_set1.jpg", "path_to_image2_set1.jpg", "path_to_image3_set1.jpg", "path_to_image4_set1.jpg"]
                    )}>Selmer (2. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick(
                        "https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331329,60.381363&zoom=18&sharepoitype=poi&sharepoi=1000724604",
                        ["path_to_image1_set2.jpg", "path_to_image2_set2.jpg", "path_to_image3_set2.jpg", "path_to_image4_set2.jpg"]
                    )}>Glassburet (3. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick(
                        "https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331309,60.381257&zoom=19.6&sharepoitype=poi&sharepoi=1000724687",
                        ["path_to_image1_set3.jpg", "path_to_image2_set3.jpg", "path_to_image3_set3.jpg", "path_to_image4_set3.jpg"]
                    )}>Algoritmer (3. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick(
                        "https://use.mazemap.com/#v=1&campusid=340&zlevel=4&center=5.330720,60.381403&zoom=18&sharepoitype=poi&sharepoi=1000724846",
                        ["path_to_image1_set4.jpg", "path_to_image2_set4.jpg", "path_to_image3_set4.jpg", "path_to_image4_set4.jpg"]
                    )}>Jafu (4. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick(
                        "https://use.mazemap.com/#v=1&campusid=340&zlevel=4&center=5.331439,60.381221&zoom=18&sharepoitype=poi&sharepoi=1000724845",
                        ["path_to_image1_set5.jpg", "path_to_image2_set5.jpg", "path_to_image3_set5.jpg", "path_to_image4_set5.jpg"]
                    )}>Optimering (4. etasje)</button>
                    <button className={"map-button"} onClick={() => handleButtonClick(
                        "https://use.mazemap.com/#v=1&campusid=340&zlevel=6&center=5.330693,60.381404&zoom=18&sharepoitype=poi&sharepoi=1000720236",
                        ["path_to_image1_set6.jpg", "path_to_image2_set6.jpg", "path_to_image3_set6.jpg", "path_to_image4_set6.jpg"]
                    )}>Maskinlæring (6. etasje)</button>
                </div>
                <div style={{ padding: '10px' }}>
                    <h1>Lokasjon for Mastersalene</h1>
                    <iframe
                        key={src.iframe}
                        src={src.iframe}
                        style={{ width: '800px', height: '400px' }}
                        onLoad={() => console.log("Iframe loaded with src:", src.iframe)}
                    ></iframe>
                </div>
            </div>
            <div className="grid-container">
                {src.images.map((imgSrc, index) => (
                    <div className="grid-item" key={index}>
                        <img src={imgSrc} alt={`Image ${index + 1}`}/>
                    </div>
                ))}
            </div>
        </>
    );
}