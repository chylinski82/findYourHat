const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

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

        while (playing) {     
            this.print();
            console.log(player);
            move = prompt("Which way western man? W = up, S = down, A = left, D = rigth");
            if (move === "r") {
                randomField = new Field (Field.generateField(randomField.heigth, randomField.width, randomField.percentage))
                randomField.print();
            }
            else if (move === "a") {
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

    static generateField(heigth, width, percentage) {       
        let randomArr = [];
        let intArr;
        let topography;
        for (let i = 0; i < heigth; i++) {
            intArr = [];  
            for (let j = 0; j < width; j++) {                             
                topography = Math.floor(Math.random() * 100);
                if (topography <= percentage) {
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
        return randomArr;
    }
     
}
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

//myField.play();

var randomField = new Field (Field.generateField(prompt("input heigth"), prompt("input width"), prompt("input % of holes")));

randomField.play();

