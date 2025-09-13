import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {

    const navigate = useNavigate(); 
    const location = useLocation();
    const { result, count } = location.state || { result: 0, count: 0 };

    const percentage = Math.round((result / count) * 100);

    // Dynamic feedback
    const feedback =
        percentage === 100
        ? "🎉 Perfect Score! Amazing!"
        : percentage >= 70
        ? "👏 Great Job! You did well!"
        : percentage >= 40
        ? "🙂 Not bad, keep practicing!"
        : "😢 Better luck next time!";

    const handelSubmit = (e) => {
        e.preventDefault() ; 
        navigate('/') ; 
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-400">
            <form onSubmit={(e) => handelSubmit(e)} className="bg-white shadow-xl rounded-2xl p-10 w-96 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Result</h1>

                <div  className={`text-6xl font-extrabold mb-4 ${  percentage >= 70 ? "text-green-500" : percentage >= 40 ? "text-yellow-500" : "text-red-500" }`} >
                    {result}/{count}
                </div>

                <p className="text-lg font-medium text-gray-700 mb-2">{percentage}%</p>
                <p className="text-md text-gray-600 mb-6">{feedback}</p>

                <div className="flex flex-col gap-3">
                    <button type="submit"  className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition" > 🔄 Try Again </button>
                </div>
            </form>
        </div>
    );
}
