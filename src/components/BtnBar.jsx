import './BtnBar.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
function BtnBar({ currentStep }) {
  return (
    
    <div className='main'>
    <div className='btn-container'>
      {["ques1", "ques2","ques3", "ques4", "ques5"].map((step,i) => (
        <Link key={i+1} to={`/${step}`}>
        <button
          
          style={{
            backgroundColor: currentStep === i+1 ? "gray" : "rgba(223, 113, 131, 0)"
          }}
        >
          {i+1}
        </button>
        </Link>
      ))}
    </div>
    </div>
  );
}
BtnBar.propTypes = {
  currentStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
export default BtnBar;

