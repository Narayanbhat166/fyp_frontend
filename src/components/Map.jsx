import React, { useState, memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import LinearGradient from './LinearGradient.jsx';


const INDIA_TOPO_JSON = require('./output.json');

const PROJECTION_CONFIG = {
    scale: 300,
    center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

const AQI_BRACKET = (aqi) => {
    const res = {}
    if (aqi >= 0 && aqi <= 50) {
        res.color = '#00B050'
        res.hint = 'Good'
    }
    else if (aqi > 50 && aqi <= 100) {
        res.color = '#92D050'
        res.hint = 'Satisfactory'
    }
    else if (aqi > 100 && aqi <= 200) {
        res.color = '#FFFF00'
        res.hint = 'Moderate'
    }
    else if (aqi > 201 && aqi <= 300) {
        res.color = '#FF9900'
        res.hint = 'Poor'
    }
    else if (aqi > 301 && aqi <= 400) {
        res.color = '#FF0000'
        res.hint = 'Very Poor'
    }
    else if (aqi > 401) {
        res.color = '#C00000'
        res.hint = 'Severe'
    }
    else {
        res.color = '#000000'
        res.hint = 'Data not available'
    }
    return res
}

// Red Variants
const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
];

const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
    return parseInt(Math.random() * 100);
};

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
    return [];
};

function Map(props) {
    let mapping = {}

    props.data.map((ele) => {
        mapping[ele.city] = ele.data.AQI
    })

    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData());

    const gradientData = {
        fromColor: '#146356',
        toColor: '#614124',
        min: 0,
        max: 500
    };

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        const aqi = mapping[geo.properties.distname];

        return () => {
            setTooltipContent(`${geo.properties.distname}: ${AQI_BRACKET(aqi).hint}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };

    const onChangeButtonClick = () => {
        setData(getHeatMapData());
    };

    let selectedBucket = props.selectedBucket;
    console.log(selectedBucket)

    return (
        <div className="full-width-height container">

            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={190}
                height={180}
                data-tip=""
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            // console.log(geo);
                            const aqi = geo.properties.aqi;
                            const current = data.find(s => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={AQI_BRACKET(mapping[geo.properties.distname]).color}
                                    style={geographyStyle}
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                    onClick={() => props.onCityClick(geo)}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <div className="center">
            </div>
        </div>
    );
}

export default memo(Map);