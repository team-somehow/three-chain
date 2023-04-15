import React from "react";
import { Map, Marker } from "react-map-gl";

function HomeMan() {
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
