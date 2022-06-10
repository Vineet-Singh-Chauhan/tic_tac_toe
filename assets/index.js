const x='x';
const o='o';
const winningCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements=document.querySelectorAll('.cell');
const winText=document.querySelector('#winText');
const restartBtn=document.getElementById('restartBtn');
let circleTurn;
startGame();
function startGame(){
    circleTurn=false;
    cellElements.forEach(cell =>{
        cell.classList.remove(x);
        cell.classList.remove(o);
        cell.removeEventListener('click',handleclick);
        cell.addEventListener('click',handleclick,{once:true})
    })
    setBoardHoverClass();
    document.querySelector("#overlay").style.display="none";

}
function handleclick(e){
    const cell=e.target;
    const currentClass= circleTurn?o:x;
    placemark(cell,currentClass);
    if (checkWin(currentClass)){
        // console.log("winner is"+ currentClass);
        endGame(false,currentClass);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
    
}
const placemark=(cell,currentClass)=>{
    cell.classList.add(currentClass);
}
const swapTurns=()=>{
    circleTurn=!circleTurn;
}
function setBoardHoverClass(){
    board.classList.remove(x);
    board.classList.remove(o);
    if(circleTurn){
        board.classList.add(o);
    }
    else{
        board.classList.add(x);
    }
}
function checkWin(currentClass){
  return  winningCondition.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function endGame(draw,currentClass){
    if(draw){
        winText.innerHTML=`It's a draw !`;
    }else{
        winText.innerHTML=`${currentClass.toUpperCase()} won the game`;
    }
    document.querySelector("#overlay").style.display="flex";
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(x)||cell.classList.contains(o);
    })
}
restartBtn.addEventListener('click',startGame);