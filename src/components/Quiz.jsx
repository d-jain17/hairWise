import './Quiz.css'
import { Link } from "react-router-dom";
import image from '../assets/hair.avif'
function Quiz(){
    return(
        <div className="container quiz-container">
            <div style={{height:"65%",width:"65%",borderRadius:"3%",border:"2px solid black",padding:"5%"}}>
            <center>
            <h1 style={{color:"rgb(37, 63, 87)"}}>Welcome to the quiz</h1>
            <hr style={{border:"1px solid"}}></hr>
            <center>
            <img src={image} style={{height:"300px",borderRadius:"50%"}}></img>
            </center>
            <Link to="/ques1">
            <button style={{marginTop:"3%",width:"60%",backgroundColor:"rgba(236, 142, 132, 0)",border:"3px solid black" }}>START</button>
            </Link>
            </center>
            </div>
        </div> 
    )
}
export default Quiz;