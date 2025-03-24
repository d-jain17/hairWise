import React from 'react';
import axios from "axios"
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
function Results({answers}) {

  console.log("Received answers:", answers);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate=useNavigate()
    const API_URL = "https://hairwise.onrender.com";
    const sendEmail = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

      if (!email.trim()) {
       alert("Please enter a valid email address.");
       return;
      }

      if (!emailRegex.test(email)) {
       alert("Please enter a valid email format (e.g., example@example.com).");
       return;
      }
    
      try {
        console.log("heloo")
        const response = await axios.post(`${API_URL}/send-email`, { email, answers });
        setMessage(response.data.message);
        navigate('/success')
      } catch (error) {
        setMessage("Failed to send email");
        navigate('/fail')
      }
    };

  return (
    <div className='quiz-container'>
      <div className='quiz-parent'>
        <h2>Your Hair Care Routine :</h2>
        <p>Based on your responses, we have customized a hair care routine for you!</p>
        <p>Kindly enter your e-mail to get your customized hair care routine right now!</p>
        <center>
        <input
        style={{width:"63%",height:"40px",borderRadius:"10px",backgroundColor:"transparent",marginTop:"5%"}}
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <br></br>
          <button onClick={sendEmail} type='submit'  style={{ marginTop: "10%", borderRadius: "0%", backgroundColor: "rgb(223, 113, 132)", color: "white", border: "none" }}>
            Get Results
          </button>
          </center>
      </div>
    </div>
  );
}

export default Results;
