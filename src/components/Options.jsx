import './Options.css';
import PropTypes from 'prop-types';
function Options({ data, onClick, selected }) {
    if (!data || !Array.isArray(data.options)) {
        return <p>No options available</p>;
    }

    return (
        <div className='bttn-container'>
            {data.options.map((option, index) => (
                <button key={index}  onClick={() => onClick(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
}
Options.propTypes = {
    data: PropTypes.shape({
        options: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.string
};
export default Options;
