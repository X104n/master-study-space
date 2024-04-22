import "./temp.css"
import React, { useState } from 'react';

export default function Home() {
    return (
        <>
            <div style={{display: 'flex'}}>
                <div style={{width: "200px", padding: '10px'}}>
                    {/* Content for column 1 */}
                    <br/><br/><br/><br/>
                    <button className={"map-button"}>Selmer (2. etasje)</button>
                    <button className={"map-button"}>Glassburet (3. etasje)</button>
                    <button className={"map-button"}>Algoritmer (3. etasje)</button>
                    <button className={"map-button"}>Jafu (4. etasje)</button>
                    <button className={"map-button"}>Optimering (4. etasje)</button>
                    <button className={"map-button"}>Maskinlæring (6. etasje)</button>
                </div>
                <div style={{padding: '10px'}}>
                    {/* Content for column 2 */}
                    <h1>Navn på lesesal</h1>
                        <iframe
                            src="https://use.mazemap.com/#v=1&campusid=340&zlevel=3&center=5.331323,60.381346&zoom=19&sharepoitype=poi&sharepoi=1000724604"
                            style={{width: '600px', height: '600px'}}>
                        </iframe>
                </div>
            </div>

        </>
    );
}
