import React, { useState } from "react";
import { Map, Marker, Popup as MapBoxPopup } from "react-map-gl";

function HomeMan() {
    const [manuHover, setManuHover] = useState(false);
    const [pin1, setPin1] = useState(false);

    return (
        <div>
            <Map
                initialViewState={mapInitialViewState}
                style={mapContainerStyles}
                mapStyle="mapbox://styles/mbmph/clghxs0u2006401pkcfls6cog"
                mapboxAccessToken={
                    "pk.eyJ1IjoibWJtcGgiLCJhIjoiY2tya2F0OTJvMGk1YjJwbGZ1bDJ1eGU0dCJ9.fLJp01SsIpdhGmWdBzaSnQ"
                }
                renderWorldCopies={false}
                onClick={() => {}}
            >
                {/* pin */}
                <Marker
                    latitude={19.100343}
                    longitude={72.898441}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/map/pin1.png"}
                        width={30}
                        alt="da"
                    />
                </Marker>

                {/* pin */}
                <Marker
                    latitude={15.3173}
                    longitude={75.7139}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/map/pin2.png"}
                        width={30}
                        alt="da"
                    />
                </Marker>

                {/* pin */}
                <Marker
                    latitude={19.8702388}
                    longitude={75.2227995}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/map/pin2.png"}
                        width={30}
                        alt="da"
                    />
                </Marker>

                {/* pin */}
                <Marker
                    latitude={19.9662361}
                    longitude={79.1931393}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <div
                        onMouseEnter={() => {
                            setPin1(true);
                        }}
                        onMouseLeave={() => {
                            setPin1(false);
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/map/pin3.png"}
                            width={30}
                            alt="da"
                        />
                    </div>
                </Marker>
                {pin1 && (
                    <MapBoxPopup
                        anchor="top"
                        closeOnClick={false}
                        latitude={19.9662361}
                        longitude={79.1931393}
                    >
                        <div>Warehouse ID: 0xabe370...</div>
                    </MapBoxPopup>
                )}

                {/* warehouse */}
                <Marker
                    latitude={17.3391522}
                    longitude={76.7575381}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <div
                        onMouseEnter={() => {
                            setManuHover(true);
                        }}
                        onMouseLeave={() => {
                            setManuHover(false);
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/map/manu.png"}
                            width={30}
                            alt="da"
                        />
                    </div>
                </Marker>
                {manuHover && (
                    <MapBoxPopup
                        anchor="top"
                        closeOnClick={false}
                        latitude={17.3391522}
                        longitude={76.7575381}
                    >
                        <div>Manufacturer ID: 0x9ef7A9f...</div>
                    </MapBoxPopup>
                )}
            </Map>
        </div>
    );
}

// initial state on the map
const mapInitialViewState = {
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 5,
};

export const mapContainerStyles = {
    height: "100vh",
    width: "100vw",
};

const markerStyle = {
    cursor: "pointer",
};

export default HomeMan;
