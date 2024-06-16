const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.getElementById('solve-button');
const solutionDisplay = document.querySelector('#solution')
const squares = 81;
const submission = []
var config = { aff2888c11mshaa792dab9cc2d20p1bb249jsna6003242c8a : '1234' }
let key = config.aff2888c11mshaa792dab9cc2d20p1bb249jsna6003242c8a;

for (let i=0; i<squares; i++){
    const inputElement = document.createElement('input');

    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max', '9');
    puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input'); 
    inputs.forEach(INPUT  => {
        if (INPUT.value){
            submission.push(INPUT.value);
        } 
        else {
             submission.push('.');
        }
    })
    console.log(submission);
}


const populateValues = (isSolvable, solution) => {
    const inputs2 = document.querySelectorAll('input');
    if (isSolvable && solution){
          inputs2.forEach((INPUT2,index) => {
              INPUT2.value =  solution[index];
        })
        solutionDisplay.innerHTML = 'This is the answer';
    } 
    else {
         solutionDisplay.innerHTML = 'This is not solvable';
    }     
    
}

const solve = () => {

    const data = submission.join('');
    console.log('data', data);

    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
              'x-rapidapi-key': '1234',
              'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
              'Content-Type': 'application/json'
        },
        data: {
          puzzle:data

        }
      };

      axios.request(options).then((response) => {
	    console.log(response.data);
        populateValues(response.data.solvable, response.data.solution);
      }).catch ((error) => {
	    console.error(error);
      })

}
   

solveButton.addEventListener('click', solve);



 


