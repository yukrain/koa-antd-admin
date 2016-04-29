const assign = require('object-assign');

const defaultProps = {
    strokeWidth: 1,
    strokeColor: '#3FC7FA',
    trailWidth: 1,
    trailColor: '#D9D9D9'
}

const Circle = React.createClass({

    getDefaultProps() {
        return {
            width: 132,
            percent: 0,
            strokeWidth: 6,
            status: 'normal', // exception
            trailColor: '#f3f3f3',
        };
    },

    render () {
        const props = assign({}, this.props);
        const strokeWidth = props.strokeWidth;
        const radius = (50 - strokeWidth / 2);

        const len = Math.PI * 2 * radius;


        const a =   Math.PI * 2 * ( 270 - (props.percent / 100) * 360 ) / 360;
        const pathString = `M 50 50 l 0 -${radius} A ${radius},${radius} 0 ${ props.percent > 25 ? 1 :0 } 1 ${ 50 - radius * Math.cos(a)} ${ 50 + radius * Math.sin(a) }Z`;

        const b = Math.PI * 2 * ( 270 - ( 99.9 / 100) * 360 ) / 360
        const pathString2 = `M 50 50 l 0 -${radius} A ${radius},${radius} 0 ${ 99.9 > 25 ? 1 :0 } 1 ${ 50 - radius * Math.cos(b)} ${ 50 + radius * Math.sin(b) }Z`;

        const pathStyle = {
            'strokeDasharray': `${len}px ${len}px`,
            'strokeDashoffset': `${((100 - props.percent) / 100 * len)}px`,
            'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
        };
        ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach((item) => {
            if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
                props.trailWidth = props.strokeWidth;
                return;
            }
            if (!props[item]) {
                props[item] = defaultProps[item];
            }
        });


        return (

                <svg viewBox="0 0 100 100" width={this.props.width}>
                    <path d={pathString2}   fill='#f0f0f0'/>
                    <path d={pathString}   fill={props.strokeColor}/>
                </svg>



        )

    }
});

module.exports = Circle;