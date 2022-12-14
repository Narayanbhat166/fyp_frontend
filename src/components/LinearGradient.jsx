import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = props => {
    const { data } = props;
    const boxStyle = {
        width: 180,
        margin: 'auto'
    };
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
        height: 20
    };
    return (
        <div>
            <div style={boxStyle} className="display-flex">
                <span >Good</span>
                <span className="fill">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span >Hazardous</span>
            </div>
            <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
        </div>
    );
};

LinearGradient.propTypes = {
    data: PropTypes.object.isRequired
};

export default LinearGradient;