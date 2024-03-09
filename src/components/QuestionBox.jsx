import React, {useEffect, useState} from 'react'
import questions from './questions'


export default function QuestionBox() {

  const [currentQuestion,setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [dark, setTheme] = useState(true)
  const [themeName, setThemeName] = useState('dark')
  const [themeStyle, setThemeStyle] = useState({backgroundColor: "black",color: "white",});
  const [highlight, setHighlight] = useState()


  //This function helps to:
  //1. Move to next question.
  //2. update score if correct option is clicked.

  function handleNextQuestion(selectedOption) {
    const correctOption = selectedOption.isCorrect

    if(correctOption){
      setScore((prevScore)=>{
        const updatedScore = prevScore +1
        givePercentage(updatedScore)
        return updatedScore;
      })
    }

    if(currentQuestion < questions.length ){
      setCurrentQuestion((prevQuestion) => { return prevQuestion + 1})
    }
    else{
      console.log("Your Result")
      givePercentage(score)
    }
  }

  //This function helps to calculate percentage based on the score.
  function givePercentage(score){
    const myPercentage = (score / questions.length)*100
    setPercentage(myPercentage)
  }
//This function is given to the restart button to restart the game
  function handleRestart(){
    setCurrentQuestion(0);
    setScore(0);
    setPercentage(0);
  };


  //in tis code the useEffect hook is used to change the UI and button text when the theme button is clicked 
  useEffect(() => {
    const themeStyle = dark
      ? {
          backgroundColor: "black",
          border:"4px solid white",
          color: "white",
        }
      : {
          backgroundColor: "white",
          border:"4px solid black",
          color: "black",
        };

    setThemeName(dark ? 'light' : 'dark');
    setThemeStyle(themeStyle);
  }, [dark]);
  
//This function is used to switch initial theme value to its opposite. In this case(true ->false or false -> true)
  function handleTheme(){
    setTheme(!dark)
  }

  // This is set to the highlight button to highlight the text whenever clicked
  function isHighlight(){
    setHighlight({color:"white",backgroundColor:"black"})
  }

  //This is set to remove highlight button, to remove the highlighted text back to original
  function notHighlight(){
    setHighlight({color:"black"})
  }

  
  return (
    <>
    <div style={themeStyle} className='full_container'>

      <div className='title_theme_container'>
        <span><h1>QUIZZIBLE</h1></span>
        <span><button style={themeStyle} onClick={handleTheme}>{themeName}</button></span>
      </div>

      <div className='main_container'>
            {currentQuestion < questions.length ? (
              
              <div key={currentQuestion}>
                  <h3>Questions {currentQuestion+1}  of {questions.length}</h3>
                  <div>
                    <h2 className='question' style={highlight}>{questions[currentQuestion].text}</h2>
                  </div>
                  <div className='options_container'>
                    <ul>
                      {questions[currentQuestion].options.map((option)=>(
                        <li className='options' key={option.id} onClick={()=>{handleNextQuestion(option)}}>
                          {option.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='highlight_container'>
                    <button onClick={isHighlight}>Highlight Q</button> 
                    <span><button onClick={notHighlight}>Remove Highlight Q</button></span>
                  </div>
                </div> 

            ):(
              <div className='Result_container'>
                <h1>Result</h1>
                <h2>You have {score} out of 5 correct answers</h2>
                <h2>Your IQ - {percentage} %</h2>
                <button onClick={handleRestart}>Restart</button>
              </div>
            )}

    </div>
  </div>
    </>
  )
}

