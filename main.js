const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let randomField;
let userHeight = prompt("input heigth, max 35");
if (userHeight > 35) userHeight = 35;
let userWidth = prompt("input width, max 135");
if (userWidth > 125) userWidth = 135;
//let userPercentage = prompt("input % of holes");

class Field {
    constructor(arr) {
        this.arr = arr;
        
       
    };

    print() {
        for(let i=0; i<this.arr.length; i++) {
            console.log(this.arr[i].toString().replaceAll(",", ""))
        }
    };

    
    play() {       
        let player = [];
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr.length; j++) {
                if (this.arr[i][j] === pathCharacter) {
                    player.push(i, j);
                }
            }              
        }
        let move;

        let playing = true;

        while (true) {     
            this.print();
            move = prompt("Which way western man? W = up, S = down, A = left, D = rigth");
            
            if (move === "a") {
               player[1] -= 1;
            }
            else if (move === "d") {
                player[1] += 1;
            }
            else if (move === "w") {
                player[0] -= 1;
            }
            else if (move === "s") {
                player[0] += 1;
            }
            if (player[1] === -1 || player[1] === this.arr[1].length || player[0] === -1 || player[0] === this.arr[0].length || this.arr[player[0]][player[1]] === hole) {
                console.log("YOU LOST");
                return;
            }
            else if (this.arr[player[0]][player[1]] === hat) {
                console.log("YOU WON!");
                return;
            } else {
                this.arr[player[0]][player[1]] = pathCharacter;
            }
            console.clear();
        } 
    };

    static generateField(heigth, width) {
        
        let randomArr = [];
        let intArr;
        let topography;
        for (let i = 0; i < heigth; i++) {
            intArr = [];  
            for (let j = 0; j < width; j++) {                             
                topography = Math.floor(Math.random() * 100);
                if (topography <= 36) {
                    topography = hole;
                }
                else {
                    topography = fieldCharacter;
                }
                intArr.push(topography);
            }
            randomArr.push(intArr);
        }
        randomArr[0][0] = pathCharacter;
        randomArr[(heigth - 1) - Math.floor(Math.random() * (heigth / 4))][(width - 1) - Math.floor(Math.random() * (width / 4))] = hat; 
        
        let visited = [[0, 0]];
        let visitedTwice = [];
        let visited3x = [];
        let visited4x = [];
        let p = [0, 0];
        while (true) {           
            //checking if next move is a winning move
            if (randomArr?.[p[0]]?.[p[1] + 1] === hat || randomArr?.[p[0]]?.[p[1] - 1] === hat || randomArr?.[p[0] + 1]?.[p[1]] === hat || randomArr?.[p[0] - 1]?.[p[1]] === hat) {
                let goodField = new Field (randomArr);
                goodField.play();
                return;
            }          
            //checking if neighbouring square hasn't been visited, if no, go there
            else if (randomArr?.[p[0]]?.[p[1] + 1] === fieldCharacter && !visited.some(([el1, el2]) => el1 == p[0] && el2 == p[1] + 1)) {
                p[1] += 1;
                visited.push([p[0], p[1]]);
            } else if (randomArr?.[p[0]]?.[p[1] - 1] === fieldCharacter && !visited.some(([el1, el2]) => el1 == p[0] && el2 == p[1] - 1)) {
                p[1] -= 1;
                visited.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] + 1]?.[p[1]] === fieldCharacter && !visited.some(([el1, el2]) => el1 == p[0] + 1 && el2 == p[1])) {
                p[0] += 1;
                visited.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] - 1]?.[p[1]] === fieldCharacter && !visited.some(([el1, el2]) => el1 == p[0] - 1 && el2 == p[1])) {
                p[0] -= 1;
                visited.push([p[0], p[1]]);
            //checking if neighbouring square hasn't been visited twice, if no, go there
            } else if (randomArr?.[p[0]]?.[p[1] + 1] === fieldCharacter && !visitedTwice.some(([el1, el2]) => el1 == p[0] && el2 == p[1] + 1)) {
                p[1] += 1;
                visitedTwice.push([p[0], p[1]]);
            } else if (randomArr?.[p[0]]?.[p[1] - 1] === fieldCharacter && !visitedTwice.some(([el1, el2]) => el1 == p[0] && el2 == p[1] - 1)) {
                p[1] -= 1;
                visitedTwice.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] + 1]?.[p[1]] === fieldCharacter && !visitedTwice.some(([el1, el2]) => el1 == p[0] + 1 && el2 == p[1])) {
                p[0] += 1;
                visitedTwice.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] - 1]?.[p[1]] === fieldCharacter && !visitedTwice.some(([el1, el2]) => el1 == p[0] - 1 && el2 == p[1])) {
                p[0] -= 1;
                visitedTwice.push([p[0], p[1]]);
            //checking if neighbouring square hasn't been visited 3x, if no, go there    
            } else if (randomArr?.[p[0]]?.[p[1] + 1] === fieldCharacter && !visited3x.some(([el1, el2]) => el1 == p[0] && el2 == p[1] + 1)) {
                p[1] += 1;
                visited3x.push([p[0], p[1]]);
            } else if (randomArr?.[p[0]]?.[p[1] - 1] === fieldCharacter && !visited3x.some(([el1, el2]) => el1 == p[0] && el2 == p[1] - 1)) {
                p[1] -= 1;
                visited3x.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] + 1]?.[p[1]] === fieldCharacter && !visited3x.some(([el1, el2]) => el1 == p[0] + 1 && el2 == p[1])) {
                p[0] += 1;
                visited3x.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] - 1]?.[p[1]] === fieldCharacter && !visited3x.some(([el1, el2]) => el1 == p[0] - 1 && el2 == p[1])) {
                p[0] -= 1;
                visited3x.push([p[0], p[1]]);
            //checking if neighbouring square hasn't been visited 4x, if no, go there
            } else if (randomArr?.[p[0]]?.[p[1] + 1] === fieldCharacter && !visited4x.some(([el1, el2]) => el1 == p[0] && el2 == p[1] + 1)) {
                p[1] += 1;
                visited4x.push([p[0], p[1]]);
            } else if (randomArr?.[p[0]]?.[p[1] - 1] === fieldCharacter && !visited4x.some(([el1, el2]) => el1 == p[0] && el2 == p[1] - 1)) {
                p[1] -= 1;
                visited4x.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] + 1]?.[p[1]] === fieldCharacter && !visited4x.some(([el1, el2]) => el1 == p[0] + 1 && el2 == p[1])) {
                p[0] += 1;
                visited4x.push([p[0], p[1]]);
            } else if (randomArr?.[p[0] - 1]?.[p[1]] === fieldCharacter && !visited4x.some(([el1, el2]) => el1 == p[0] - 1 && el2 == p[1])) {
                p[0] -= 1;
                visited4x.push([p[0], p[1]]);
            } else {                
                randomField = new Field (Field.generateField(userHeight, userWidth));
            }
        }
    }
     
}
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);
randomField = new Field (Field.generateField(userHeight, userWidth));

