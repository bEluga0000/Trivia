let presentSelectedIndex = null
let presentSelectedName = null
window.onload = () => {
    // here i need to set all the default values in the localStorage like all from categories to all the other things
    loadValues()
    const allCategoriesStringify = localStorage.getItem("allCategories")
    const allCategories = JSON.parse(allCategoriesStringify)
    const showAllCategories = document.getElementById("showCategories")
    const content = document.getElementById("content")
    const showSubBtn = document.getElementById("showSubBtn")
    allCategories.forEach((category, key) => {
        const catDiv = document.createElement("button");
        catDiv.setAttribute("class","cat-btn")
        catDiv.setAttribute("id", key);
        catDiv.classList.add("category-button"); 
        const catImage = document.createElement("img");
        catImage.setAttribute("src", `data/images/${key}.png`);
        const catName = document.createElement("p");
        catName.textContent = category.name;
        catDiv.appendChild(catImage);
        catDiv.appendChild(catName);
        if (category.completed) {
            catDiv.setAttribute("disabled", true);
        } else {
            catDiv.addEventListener("click", (e) => {
                handleCategoryButton(category,key);
            });
        }
        showAllCategories.appendChild(catDiv);
    });
    const startQuizButton = document.createElement("button")
    startQuizButton.textContent = "Start quizz"
    startQuizButton.setAttribute("id","submitBtn")
    startQuizButton.addEventListener("click",(e)=>{
        handelStartSubmitButton(e)
    })    
    showSubBtn.appendChild(startQuizButton)

};
const handleCategoryButton = (category, key) => {
    if(presentSelectedIndex != null && presentSelectedName != null)
    {
        const lastSelectedCat = document.getElementById(presentSelectedIndex)
        lastSelectedCat.classList.remove("selected")
    }
    presentSelectedIndex = key
    presentSelectedName = category.name
    const selectedCat = document.getElementById(key)
    selectedCat.classList.add("selected")
};
const handelStartSubmitButton = (e)=>{
    e.preventDefault()
    const player1Name = document.getElementById("player1").value
    const player2Name = document.getElementById("player2").value
    const errMsg = document.getElementById("errMsg")
    if (player1Name.length > 0 && player2Name.length > 0 && presentSelectedIndex!=null && presentSelectedName!=null && player1Name != player2Name)
    {
        errMsg.textContent = ""
        localStorage.setItem("player1",player1Name)
        localStorage.setItem("player2",player2Name)
        localStorage.setItem("presentCategorySelectedIndex", presentSelectedIndex)
        localStorage.setItem("presentCategorySelectedName", presentSelectedName)
        window.location.href = "/questions/question.html";
    }
    else
    {

        if (player1Name.length <= 0 || player2Name.length <= 0)
            errMsg.textContent = "Enter the name for both the players"
        else if(!presentSelectedIndex || !presentSelectedName)
            errMsg.textContent = "Need to select the category before starting the quiz"
        else if(player1Name == player2Name)
            errMsg.textContent = "Both the players name cannot be same"
    }
}
// load all the default values to the localStorage
const loadValues = ()=>{
    const stringifyAllCategories = JSON.stringify(allCategories)
    localStorage.setItem("allCategories", stringifyAllCategories)
    localStorage.setItem("player1",null)
    localStorage.setItem("player2",null)
    localStorage.setItem("presentCategorySelectedIndex",null)
    localStorage.setItem("presentCategorySelectedName",null)
    localStorage.setItem("presentQuestion",1)
    localStorage.setItem("player1PresentMarks",0)
    localStorage.setItem("player2PresentMarks",0)
    const stringifyScoreBoard = JSON.stringify(scoreBoardState)
    localStorage.setItem("scoreBoard", stringifyScoreBoard)
    localStorage.setItem("completedCategories",0)
}
