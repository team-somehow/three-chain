import React, { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import CurvedLine from "../../components/utils/MapLine";
import { multiLineString } from "@turf/turf";

function HomeLog() {
    const coordinates = [];

    coordinates.push([
        [75.2227995, 19.8702388],
        [76.7575381, 17.3391522],
    ]);
    coordinates.push([
        [72.898441, 19.100343],
        [76.7575381, 17.3391522],
    ]);
    const [features, setFeatures] = useState(multiLineString(coordinates));

    useEffect(() => {
        // setFeatures();
    }, []);

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
                <CurvedLine
                    data={features}
                    curveStyles={curveStyles}
                    id={"3112"}
                />

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
                    latitude={19.8702388}
                    longitude={75.2227995}
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
                    latitude={19.9662361}
                    longitude={79.1931393}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/map/pin1.png"}
                        width={30}
                        alt="da"
                    />
                </Marker>

                {/* warehouse */}
                <Marker
                    latitude={17.3391522}
                    longitude={76.7575381}
                    style={markerStyle}
                    onClick={() => {}}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/map/manu.png"}
                        width={30}
                        alt="da"
                    />
                </Marker>
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

// styles for curved line
export const curveStyles = {
    "line-width": 2,
    "line-color": "#000000",
};

export default HomeLog;
