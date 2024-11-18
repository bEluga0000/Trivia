const presentCategory = localStorage.getItem("presentCategorySelectedName")
const player1name = localStorage.getItem("player1")
const player2name = localStorage.getItem("player2")
let selectedCategoryIndex = null
window.onload = ()=>{
    const questionShow = document.getElementById("questionShow")
    questionShow.textContent = "Loading......"
    fetchQuestion()
}

const fetchQuestion = async()=>{
    const presentQuestinoNumber = parseInt(localStorage.getItem("presentQuestion"))
    const questionLevel = presentQuestinoNumber <= 2 ? "easy" : presentQuestinoNumber <= 4 && presentQuestinoNumber > 2 ? "medium" : "hard"
    try{
        const res = await axios.get(`https://the-trivia-api.com/v2/questions?limit=1&categories=${presentCategory}&difficulties=${questionLevel}`)
        if(!res.data)
            throw new Error("Error in getting response")
        // need to set the questions
        const questionData = res.data[0]
        const question = document.getElementById("questionShow")
        question.textContent = questionData.question.text
        // shuffle the answer
        const shuffledOptions = shuffleOptionsFunc([questionData.correctAnswer, questionData.incorrectAnswers[0], questionData.incorrectAnswers[1], questionData.incorrectAnswers[2]])
        // show everything
        const showOptions = document.getElementById("showOptions")
        showOptions.textContent = ""
        shuffledOptions.forEach((option,key) => {
            console.log(option)
            const opBtn = document.createElement("button")
            opBtn.setAttribute("class","optBtn")
            opBtn.textContent = option
            opBtn.setAttribute("id",key)

            //  need to add the eventListener such a way that it should update the selected option data
            opBtn.addEventListener("click",()=>{
                const errMsg = document.getElementById("errMsg")
                errMsg.textContent =""
                const rmsubBtn = document.getElementById('subBtn')
                rmsubBtn.removeAttribute("disabled");
                if (selectedCategoryIndex != null)
                {
                    const LastSelectedCat = document.getElementById(selectedCategoryIndex)
                    LastSelectedCat.classList.remove("selectedOpt")
                }
                opBtn.classList.add("selectedOpt")
                selectedCategoryIndex = key
                localStorage.setItem("selectedOption",option)
            })
            showOptions.appendChild(opBtn)
        });
        const showTurn = document.getElementById("playerNameSHow")
        showTurn.textContent = ""
        showTurn.textContent = presentQuestinoNumber%2 == 0 ? player2name:player1name
        const catShow = document.getElementById("catSHow")
        catShow.textContent = presentCategory
        const diffShow = document.getElementById("diffShow")
        diffShow.textContent = ""
        diffShow.textContent = questionLevel
        const showSubBtn = document.getElementById("submitBtnShow")
        showSubBtn.textContent =""
        const submitBtn = document.createElement("button")
        submitBtn.textContent = "Submit"
        submitBtn.setAttribute("disabled",true)
        submitBtn.setAttribute("id","subBtn")
        submitBtn.addEventListener("click", (e) => { handelSubmitBtn(e, questionData.correctAnswer) })
        showSubBtn.appendChild(submitBtn)
        // const correctAns = document.getElementById("correctAns")
        // correctAns.textContent = ""
        // correctAns.textContent = questionData.correctAnswer
    }catch(e){
        const questionShow = document.getElementById("questionShow")
        questionShow.innerHTML = `<p>${e} </p><p>Go to give link and play this category again</p> <a href="/categories/categories.html">Category page</>`

    }
}

const shuffleOptionsFunc = (optionsArray)=>{
    const shuffled = [...optionsArray]
    for(i=shuffled.length-1;i>0;i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
}

const handelSubmitBtn = (e,correctAnswer)=>{
    e.preventDefault()
    const selectedOption = localStorage.getItem("selectedOption")
    if (selectedCategoryIndex == null)
    {
        const errMsg = document.getElementById("errMsg")
        errMsg.textContent = "Please select the option before submiting"
    }
    else
    {
        const questionShow = document.getElementById("questionShow")
        const showSubBtn = document.getElementById("submitBtnShow")
        showSubBtn.textContent = ""
        const showTurn = document.getElementById("playerNameSHow")
        showTurn.textContent = ""
        const diffShow = document.getElementById("diffShow")
        diffShow.textContent = ""
        const showOptions = document.getElementById("showOptions")
        showOptions.textContent = ""
        questionShow.textContent = "Loading......"
        let presentQuestinoNumber = localStorage.getItem("presentQuestion")
        presentQuestinoNumber = parseInt(presentQuestinoNumber)
        if(presentQuestinoNumber<6)
        {
            handelMarks(correctAnswer, selectedOption, presentQuestinoNumber)
            fetchQuestion()
        }
        else
        {
            handelMarks(correctAnswer, selectedOption, presentQuestinoNumber)
            updateCategory()
            let completedCategories = parseInt(localStorage.getItem("completedCategories"))
            if(completedCategories>=6)
                window.location.href = "/scoreBoard/scoreBoard.html"
            else
                window.location.href = "/categories/categories.html"
            
        }
    }

}
const handelMarks = (correctAnswer,submittedAns,questionNumber)=>{
    if(correctAnswer == submittedAns)
    {
        let player1Score = parseInt(localStorage.getItem("player1PresentMarks"))
        let player2Score = parseInt(localStorage.getItem("player2PresentMarks"))
        if (questionNumber <= 2)
            questionNumber % 2 != 0 ? player1Score+=10
                : player2Score+=10
        else if (questionNumber > 2 && questionNumber <= 4)
            questionNumber % 2 != 0 ? player1Score+= 15 : player2Score+=15
        else
            questionNumber % 2 != 0 ? player1Score+= 20 : player2Score+= 20
        
        localStorage.setItem("player1PresentMarks",player1Score)
        localStorage.setItem("player2PresentMarks",player2Score)
    }
    questionNumber += 1
    localStorage.setItem("presentQuestion", questionNumber)
    localStorage.setItem("selectedOption",null)
    selectedCategoryIndex = null
}
const updateCategory = ()=>{
    const stringifyCategories = localStorage.getItem("allCategories")
    let player1Score = parseInt(localStorage.getItem("player1PresentMarks"))
    let player2Score = parseInt(localStorage.getItem("player2PresentMarks"))
    const presentCategory = localStorage.getItem("presentCategorySelectedName")
    const categories = JSON.parse(stringifyCategories)
    const updatedCategories = categories.map((c) => c.name == presentCategory ? { ...c, completed: true } : c)
    const stringifyUpdatedCategories = JSON.stringify(updatedCategories)
    localStorage.setItem("allCategories", stringifyUpdatedCategories)
    const stringifyScoreBoard = localStorage.getItem("scoreBoard")
    const scoreBoard = JSON.parse(stringifyScoreBoard)
    const updatedScoreBoard = scoreBoard.map((s) => { return s.category == presentCategory ? { ...s, player1: player1Score, player2: player2Score, winner: player1Score == player2Score ? "Draw" : player1Score > player2Score ? player1name : player2name } : s })
    const stringifyUpdatedScoreBoard = JSON.stringify(updatedScoreBoard)
    localStorage.setItem("scoreBoard",stringifyUpdatedScoreBoard)
    const completedCategories = parseInt(localStorage.getItem("completedCategories"))
    localStorage.setItem("completedCategories",completedCategories + 1)
    console.log(completedCategories)
    localStorage.setItem("player1PresentMarks",0)
    localStorage.setItem("player2PresentMarks",0)
    localStorage.setItem("presentCategorySelectedName",null)
    localStorage.setItem("presentCategorySelectedIndex",null)
    localStorage.setItem("presentQuestion",1)
    localStorage.getItem("selectedOption",null)
}