let presentSelectedIndex = null
let presentSelectedName = null
window.onload = ()=>{
    localStorage.setItem("presentQuestion",1)
    localStorage.setItem("player1PresentMarks",0)
    localStorage.setItem("player2PresentMarks",0)
    const allCategoriesStringify = localStorage.getItem("allCategories")
    const allCategories = JSON.parse(allCategoriesStringify)
    const showAllCategories = document.getElementById("showCategories")
    allCategories.forEach((category, key) => {
        const catDiv = document.createElement("button");
        catDiv.setAttribute("id", key);
        catDiv.classList.add("category-button"); // Add a class for styling
        catDiv.setAttribute("class","cat-btn")
        const catImage = document.createElement("img");
        catImage.setAttribute("src", `../data/images/${key}.png`);
        const catName = document.createElement("p");
        catName.textContent = category.name;
        catDiv.appendChild(catImage);
        catDiv.appendChild(catName);
        if (category.completed) {
            catDiv.setAttribute("disabled", true);
        } else {
            catDiv.addEventListener("click", (e) => {
                handleCategoryButton(category, key);
            });
        }
        showAllCategories.appendChild(catDiv);
    });
    const startQuizButton = document.createElement("button")
    startQuizButton.textContent = "Play again"
    startQuizButton.setAttribute("id", "submitBtn")
    startQuizButton.setAttribute("disabled",true)
    const showSubBtn = document.getElementById("showSubBtn")
    startQuizButton.addEventListener("click", (e) => {
        handelStartSubmitButton(e)
    })
    showSubBtn.appendChild(startQuizButton);
    const exitQuizButton = document.createElement("button")
    exitQuizButton.textContent = "exit Game"
    exitQuizButton.setAttribute("class","exit")
    const showExitBtn = document.getElementById("showExitBtn")
    exitQuizButton.addEventListener("click",()=>{
        window.location.href = "/scoreBoard/scoreBoard.html"
    })
    showExitBtn.appendChild(exitQuizButton)
}
const handleCategoryButton = (category, key) => {
    document.getElementById("errMsg").textContent = ""
    document.getElementById("submitBtn").removeAttribute("disabled")
    if (presentSelectedIndex != null && presentSelectedName != null) {
        const lastSelectedCat = document.getElementById(presentSelectedIndex)
        lastSelectedCat.classList.remove("selected")
    }
    presentSelectedIndex = key
    presentSelectedName = category.name
    const selectedCat = document.getElementById(key)
    selectedCat.classList.add("selected")
};
const handelStartSubmitButton = (e) => {
    e.preventDefault()
    if (presentSelectedIndex != null && presentSelectedName != null) {
        localStorage.setItem("presentCategorySelectedIndex", presentSelectedIndex)
        localStorage.setItem("presentCategorySelectedName", presentSelectedName)
        window.location.href = "/questions/question.html";
    }
    else {
        document.getElementById("errMsg").textContent = "Select the category before playing again"
    }
}
