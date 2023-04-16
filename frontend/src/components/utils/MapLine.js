import React from "react";
import { Layer, Source } from "react-map-gl";

const CurvedLine = ({ data, id, curveStyles }) => {
    return (
        <>
            <Source type="geojson" data={data}>
                <Layer id={id} source="route" type="line" paint={curveStyles} />
            </Source>
        </>
    );
};

export default CurvedLine;
