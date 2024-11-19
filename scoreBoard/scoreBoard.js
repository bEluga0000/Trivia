window.onload = ()=>{
    const scoreBoardStringify = localStorage.getItem("scoreBoard")
    const scoreBoard = JSON.parse(scoreBoardStringify)
    const player1Name = localStorage.getItem("player1")
    const player2Name = localStorage.getItem("player2")
    const showScoreBoard = document.getElementById("showScoreBoard")
    let totalPlayer1Win = 0
    let totalPlayer2Win = 0
    scoreBoard.forEach((s,key)=>{
        const card = document.createElement("div")
        card.setAttribute("class","showScoreCard")
        const topDiv = document.createElement("div")
        topDiv.setAttribute("class","top")
        const topMain = document.createElement("div")
        topMain.setAttribute("class","top-main")
        const categoryname = document.createElement("div")
        categoryname.textContent = `Category Name : ${s.category}`
        categoryname.setAttribute("id","catname")
        topMain.appendChild(categoryname)
        const p1Score = document.createElement("div")
        p1Score.textContent = `${player1Name} : ${s.player1 ==null ? "--":s.player1}`
        p1Score.setAttribute("id","p1Score")
        topMain.appendChild(p1Score)
        const p2Score = document.createElement("div")
        p2Score.textContent = `${player2Name} : ${s.player2 == null ? "--" : s.player2}`
        p2Score.setAttribute("id","p2Score")
        topMain.appendChild(p2Score)
        topDiv.appendChild(topMain)
        const topImg = document.createElement("div")
        topImg.setAttribute("class","top-img")
        const avtar = document.createElement("img")
        avtar.setAttribute("src",`/data/images/${key}.png`)
        topImg.appendChild(avtar)
        topDiv.appendChild(topImg)
        card.appendChild(topDiv)
        // here top div completes
        const bottomDiv = document.createElement("div")
        bottomDiv.textContent =s.winner=="Draw" ? "draw" : `Winner : ${s.winner == null ? "--" : s.winner}`
        if(s.player2!=null && s.player1!=null)
        {
            if(s.player2 == s.player1)
            {
                totalPlayer1Win++
                totalPlayer2Win++
            }
            else if(s.player1 > s.player2)
                totalPlayer1Win++
            else
                totalPlayer2Win++
        }
        card.appendChild(bottomDiv)
        showScoreBoard.appendChild(card)
    })
    const finalWin = document.createElement("div")
    finalWin.setAttribute("id","finalWin")
    const finalImg = document.createElement("div")
    finalImg.setAttribute("id","finalImag")
    const logoImg = document.createElement("img")
    logoImg.setAttribute("src","/data/images/Logo.png")
    finalImg.appendChild(logoImg)
    finalWin.appendChild(finalImg)
    const finalText = document.createElement("div")
    finalText.setAttribute("id","finalText")
    finalText.textContent = totalPlayer1Win == totalPlayer2Win?"Its Draw":totalPlayer1Win >totalPlayer2Win ? `Player 1 ${player1Name} wins!`:`Player 2 ${player2Name} wins!`
    finalWin.appendChild(finalText)
    showScoreBoard.appendChild(finalWin)
}
// {category: "science", player1: null, player2: null, winner: null}