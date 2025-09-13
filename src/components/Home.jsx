import axios  from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Home (){

    const [loading , setLoading] = useState(false) ; 
    const navigate = useNavigate() ;  
    const [request , setRequest] = useState({
        amount:1, 
        category:"any",
        difficulty:"any",
        type:"any" 
    }) ; 

    // Setting value after changing 
    const handelChange = (e) => {
        const {name , value} = e.target ;  
        setRequest((prevData) => ({...prevData , [name]:value})) ; 
    }


    // Make Request to send 
    const editRequest = () => { 

        let url = `https://opentdb.com/api.php?amount=${request.amount}` ; 
        
        Object.entries(request).forEach(([key , value]) => {
            if(key !== "amount" && value !== "any") {
                url += `&${key}=${value}` ; 
            }
        })
        
        // < Log the URL > 
        console.log(url) ; 
        return url ; 
    } 

    // Sending Request 
    const handelSend = async (url) => {
        try{
            const response = await axios.get(url) ; 

            console.log( "Data : " , response.data) ; 
            
            const arrayOfQuestions = response.data.results ; 

            console.log('questions from Home page : ' , arrayOfQuestions) ; 
            
            setLoading(true) ; 

            setTimeout(() => {
                setLoading(false) ; 
                navigate("/quizpage" , {state: { questions:arrayOfQuestions }}) ; 
            } , 4000)


        }catch(err){
            console.error();
        }
    }

    // Submitting 
    const handelSubmit = (e) => {
        
        e.preventDefault() ; 
        console.log(request) ;  
        const url = editRequest() ; 
        handelSend(url) ;  
    }

    if(loading) {
        return <h1 className="h-screen flex items-center justify-center text-5xl">
            Loading...
        </h1>
    }
    else {
        return(

            <div className="flex flex-col justify-center items-center h-screen sticky  gap-4 ">
                
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl"> <span className="text-blue-600 font-mono">Quiz</span> App</h1>       
                    <p className="text-xl">Answer the <span className="text-2xl text-blue-600">Quistions</span> and <span className="text-green-500 text-2xl">win</span></p>
                </div>

                <form onSubmit={handelSubmit} className="flex flex-col justify-center items-center gap-14 h-4/6 bg-white shadow-2xl border border-gray-100 rounded-2xl w-1/3 p-12 ">
                    
                    <div className="flex flex-col gap-8 w-full justify-start">

                        <label className="flex flex-col gap-2">
                            <span className="text-2xl font-mono">Count: </span> 
                            <input type="number" name="amount" onChange={handelChange} value={request.amount} max={50} min={1} className="w-56 text-black p-2 rounded-lg bg-slate-200 focus:outline-none"/> 
                        </label>


                        <label className="flex flex-col gap-2">

                            <span className="text-2xl font-mono">Category:</span>
                            <select name="category" onChange={handelChange} value={request.category} className="w-56 text-black p-2 rounded-lg  bg-slate-200 focus:outline-none">
                                <option value="any">Any Category</option>
                                <option value="9">General Knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                <option value="14">Entertainment: Television</option>
                                <option value="15">Entertainment: Video Games</option>
                                <option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                                <option value="32">Entertainment: Cartoon &amp; Animations</option>	
                            </select>
                        
                        </label>


                        <label className="flex flex-col gap-2">
                            <span className="text-2xl font-mono">Level:</span> 
                            <select name="difficulty" onChange={handelChange} value={request.difficulty} className="w-56 text-black p-2 rounded-lg  bg-slate-200 focus:outline-none">
                                <option value="any">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-2xl font-mono">Level:</span> 
                            <select name="type" onChange={handelChange} value={request.type} className="w-56 text-black p-2 rounded-lg  bg-slate-200 focus:outline-none">
                                <option value="any">Any Type</option>
                                <option value="multiple">Multiple</option>
                                <option value="boolean">True/False</option>
                            </select>
                        </label>
                        
                    </div>

                    <button type="submit" className=" bg-blue-500 text-white rounded-2xl rounded-tr-none w-32 h-12 text-2xl hover:-translate-x-0.5 hover:bg-green-500 ">Start</button>

                </form>

            </div>
        )
    }
}

