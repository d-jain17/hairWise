import './App.css';
import { BrowserRouter as Router, Route, Routes, Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Quiz from './components/Quiz';
import BtnBar from './components/BtnBar';
import Options from './components/Options';
import Results from './components/Results';
import Success from './components/Success';
import Fail from './components/Fail';
import image from './assets/hair.avif'

function Ques1({ onAnswer,answers }){
  const data={
    options: ["Straight", "Wavy", "Curly"] 
  }
  const [selected, setSelected] = useState("");

  const handleOptionClick = (option) => {
    setSelected(option);
    onAnswer("hairType", option);
   
  };
 
  return(
      <div className='quiz-container'>
          <div className='quiz-parent'>
          <center>
            <BtnBar currentStep={1}/>
            <h2>What is your hair type?</h2>
            <Options data={data} onClick={handleOptionClick} selected={selected} />
            <Link to="/ques2">
            <button style={{borderRadius:"0",marginTop:"15%",backgroundColor:"black",color:"white"}}>NEXT</button>
            </Link>
            </center>
          </div>
      </div>
  )
}
function Ques2({ onAnswer,answers }){
  const data={
    options: ["Fine", "Medium", "Thick"] 
  }
  const [selected, setSelected] = useState("");

  const handleOptionClick = (option) => {
    setSelected(option);
    onAnswer("hairTexture", option);
  };
  useEffect(()=>{
    console.log(answers)
  },[])
  return(
      <div className='quiz-container'>
          <div className='quiz-parent'>
            <center>
            <BtnBar currentStep={2}/>
            <h2>How would you describe your hair texture</h2>
            <Options data={data} onClick={handleOptionClick} selected={selected} />
            <Link to="/ques3">
            <button style={{borderRadius:"0",marginTop:"15%",backgroundColor:"black",color:"white"}}>NEXT</button>
            </Link>
            </center>

          </div>
      </div>
  )
}
function Ques3({ onAnswer }) {
  const data = {
    options: ["Dryness", "Frizz", "Hair fall/thinning",  "Dandruff", "Split ends"]
  };
  const [selected, setSelected] = useState("");

  const handleOptionClick = (option) => {
    setSelected(option);
    onAnswer("hairConcern", option);
  };
  return (
    <div className='quiz-container'>
      <div className='quiz-parent'>
        <center>
        <BtnBar currentStep={3}/>
          <h2>What is your biggest hair concern?</h2>
          <Options data={data} onClick={handleOptionClick} selected={selected} />
          <Link to="/ques4">  
            <button style={{borderRadius:"0",marginTop:"15%",backgroundColor:"black",color:"white"}}>NEXT</button>
          </Link>
        </center>
      </div>
    </div>
  );
}

function Ques4({ onAnswer }){
  const data={
    options:["Dry",
      "Oily",
      "Normal",
      "Sensitive"]
  }
  const [selected, setSelected] = useState("");

  const handleOptionClick = (option) => {
    setSelected(option);
    onAnswer("hairScalp", option);
  };
  return(
      <div className='quiz-container'>
          <div className='quiz-parent'>
            <center>
            <BtnBar currentStep={4}/>
            <h2>What is your scalp type?</h2>
            <Options data={data} onClick={handleOptionClick} selected={selected} />
            <Link to="/ques5">
            <button style={{borderRadius:"0",marginTop:"15%",backgroundColor:"black",color:"white"}}>NEXT</button>
            </Link>
            </center>

          </div>
      </div>
  )
}
function Ques5({ onAnswer,answers }) {
  const data = { options: ["yes", "no"] };
  const [selected, setSelected] = useState("");

  const handleOptionClick = (option) => {
    setSelected(option);
    onAnswer("hairChemical", option);

  };
  const handleGetResults = (e) => {
    if (Object.keys(answers).length === 0) {
      e.preventDefault(); // Prevent navigation
      alert("Please make valid choices before getting results.");
    }
  };

  return (
    <div className='quiz-container'>
      <div className='quiz-parent'>
        <center>
        <BtnBar currentStep={5} />
          <h2>Do you dye or chemically treat your hair?</h2>
          <Options data={data} onClick={handleOptionClick} selected={selected} />
          <Link to={Object.keys(answers).length > 0 ? "/results" : "#"} onClick={handleGetResults}>
            <button 
              style={{ 
                marginTop: "14%", 
                borderRadius: "0%", 
                backgroundColor: Object.keys(answers).length > 0 ? "rgb(7, 6, 6)" : "gray", 
                color: "white", 
                border: "none", 
                cursor: Object.keys(answers).length > 0 ? "pointer" : "not-allowed"
              }}
            >
              Get Results
            </button>
          </Link>
        </center>
      </div>
    </div>
  );
}


function Home() {
  return (
    <div style={{display:"flex",justifyContent:"space-around",paddingTop:"4%"}}>
    <div style={{marginLeft:"10%",paddingTop:"10%"}}>
      <h1 style={{ textAlign: "left", color: 'rgb(37, 63, 87)',fontWeight:"normal" }}>Take the <br /> ultimate quiz</h1>
      <h2 style={{ textAlign: "left", color: "rgb(37, 63, 87)",fontWeight:"normal" }}>To get a personalized hair care routine</h2>
      
        <Link to="/quiz">
          <button style={{ fontFamily: "sans-serif", fontWeight: "bold", color: "black", border: "2px solid black", height:"10%",backgroundColor:"rgba(0, 0, 0, 0)"}}>
            TAKE THE QUIZ
          </button>
        </Link>
    </div>
    <div>
      <img src={image} style={{borderRadius:"50%"}}></img>
    </div>
    </div>
  );
}

function App() {
  const [answers, setAnswers] = useState({});

  const handleAnswerSelection = (question, answer) => {
    setAnswers((prev) => {
      const updatedAnswers = { ...prev, [question]: answer };
      console.log("Updated Answers:", updatedAnswers); // Check if it's updating
      return updatedAnswers;
    });
  };
  
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path='/ques1' element={<Ques1 onAnswer={handleAnswerSelection} answers={answers}/>}></Route>
          <Route path='/ques2' element={<Ques2 onAnswer={handleAnswerSelection} answers={answers}/>}></Route>
          <Route path='/ques3' element={<Ques3 onAnswer={handleAnswerSelection}/>}></Route>
          <Route path='/ques4' element={<Ques4 onAnswer={handleAnswerSelection}/>}></Route>
          <Route path='/ques5' element={<Ques5 onAnswer={handleAnswerSelection} answers={answers}/>}></Route>
          <Route path='/results' element={<Results answers={answers}/>}></Route>
          <Route path='/success' element={<Success/>}></Route>
          <Route path='/fail' element={<Fail/>}></Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
