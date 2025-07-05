const startButton = document.querySelector('.start-button')
startButton.addEventListener('click',()=>{
    window.location.href = 'quizPage.html';
})
const homePageScore = document.querySelector('.home-page-score > span')
document.addEventListener("DOMContentLoad", ()=>{
    if(parseInt(localStorage.userResult) <= 9){
        homePageScore.textContent = `0${parseInt(localStorage.userResult)}/25`;
    }else{
        homePageScore.textContent =`${parseInt(localStorage.userResult)}`
    }

    if(localStorage.userResult === 0){
        homePageScore.parentElement.style.display = 'none';
    }else{
        homePageScore.parentElement.style.display = 'block';
    }
})