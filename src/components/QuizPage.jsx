import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import  he from "he" 


export default function QuizPage(){

    const location = useLocation() ; 
    const {questions} = location.state || { questions: [] } ;  // Recieving data from state 
    const [shuffelQuestions , setShuffelQuestions] = useState([]) ; // To shuffel the options 
    const [score , setScore] = useState(0) ; // The Count of right answers 
    const n = questions.length ; // length of questions 
    const navigate = useNavigate() ;   // To navigate 
    const [loading , setLoading] = useState(false) ; // Loading state 


    // Set shuffel the options of a question , and change in case the questions array change 
    useEffect(() => {
        const prepared = questions.map((q) => ({...q , shuffelAnswers : shuffleArray([ ...q.incorrect_answers , q.correct_answer])})) ;  
        setShuffelQuestions(prepared) ; 
    } , [questions])



    // To shuffel the options of an array 
    function shuffleArray(array) {
        return array
        .map(value => ({ value, sort: Math.random() })) // attach random number
        .sort((a, b) => a.sort - b.sort) // sort randomly
        .map(({ value }) => value); // get values back
    }

    // To predict the answer is right or false 
    const handelCompare = (selectedAnswer , rightAnswer , qIndex ) => {  
        setShuffelQuestions((prev) => 
            prev.map((q , index) => index === qIndex ? {...q , selectedAnswer} : q)
        ) ; 


        if(rightAnswer === selectedAnswer) {
            setScore(prev => prev + 1) ; 
        }
    }


    // Submitting 
    const handelSubmit = (e) => {
        e.preventDefault() ; 

        // < Log the score > 
        // console.log('Score : ' , score) ; 

        setLoading(true) ; 

        setTimeout(() => {
            setLoading(false) ; 
            navigate('/Result' , {state:{result:score , count:n}}) ; 
        } , 4000) ; 
    }


    // if(!questions || questions.length === 0){
    //     return <h1 className="h-screen flex items-center justify-center text-5xl">
    //         Loading...
    //     </h1>
    // }
    // else {

     return (
        <div className="flex flex-col h-screen w-full items-center">
        {loading === false ? <div className="border border-slate-200 rounded-2xl shadow-xl h-full overflow-y-scroll mt-5 mb-10 w-4/6 p-6 flex flex-col gap-10 items-center" name="form">
                    
                        <div name="div1" className="h-full flex flex-col items-start w-full justify-start">

                        {shuffelQuestions.map((item, index) => (

                        <div key={index} className="p-4 h-full border-b border-gray-300 rounded-md shadow-sm bg-white flex flex-col items-start w-full justify-start">
                            {/* Question */}
                            <h1 name="questions" className="text-lg font-semibold mb-4">Question {index + 1}: <br />
                            <span name="span1" className="font-normal">{he.decode(item.question)}</span>
                            </h1>

                            
                            {item.type === "boolean" ? (
                            <div className="flex justify-center gap-5">
                                <button name="button1" type="button" className={item.selectedAnswer === "True" ? "bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition" : "bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"} onClick={() => {handelCompare("True" , item.correct_answer , index ) ; }}> True </button>
                                <button name="button2" type="button" className={item.selectedAnswer === "False"  ? "bg-red-900 text-white px-6 py-2 rounded-md transition" : "bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"}onClick={() => handelCompare("False" , item.correct_answer , index)}>False</button>
                            </div> ) 
                            : 
                            (
                            <div className="grid grid-cols-2 gap-3">
                                {item.shuffelAnswers.map(
                                (answer, i) => (
                                    <button name="button3" key={i}   className={item.selectedAnswer === answer  ? "bg-blue-900 text-white px-4 py-2 rounded-md transition" : "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-left"} onClick={() => handelCompare(answer, item.correct_answer , index)}>{answer}</button>
                                )
                                )}
                            </div>
                            )}
                        </div>
                        ))
                        }
                            <div name="div2" className="p-5 mb-5">
                                 <button name="button4" type="button" onClick={(e) => handelSubmit(e)} className=" bg-green-400 text-white h-12 rounded-3xl w-28 rounded-l-none hover:translate-x-0.5">Calculate</button>
                            </div>
                        </div>

                </div> : <h1 className="h-screen flex items-center justify-center text-5xl"> Loading...</h1>}
        </div>
        );
}

