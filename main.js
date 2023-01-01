
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let randomField;

// Get user input for field dimensions, with a maximum value of 35 for the height and 135 for the width
let userHeight = prompt("input heigth, max 35");
if (userHeight > 35) userHeight = 35;
let userWidth = prompt("input width, max 135");
if (userWidth > 125) userWidth = 135;

class Field {
    constructor(arr) {
        this.arr = arr;
    }

    // Print the field to the console
    print() {
    for (let i = 0; i < this.arr.length; i++) {
        console.log(this.arr[i].toString().replaceAll(",", ""));
    }
    }

    // Play the game
    play() {
            let player = [];

            // Find the starting position of the player
            for (let i = 0; i < this.arr.length; i++) {
                for (let j = 0; j < this.arr.length; j++) {
                if (this.arr[i][j] === pathCharacter) {
                    player.push(i, j);
                }
                }
            }

            let move;
            let playing = true;

        // Main game loop
        while (true) {
            this.print();
            move = prompt("Which way western man? W = up, S = down, A = left, D = rigth, then press ENTER");
    
            if (move === "a") {
            player[1] -= 1;
            } else if (move === "d") {
            player[1] += 1;
            } else if (move === "w") {
            player[0] -= 1;
            } else if (move === "s") {
            player[0] += 1;
            }
    
            // Check for game over conditions
            if (
            player[1] === -1 ||
            player[1] === this.arr[1].length ||
            player[0] === -1 ||
            player[0] === this.arr[0].length ||
            this.arr[player[0]][player[1]] === hole
            ) {
            console.log("YOU LOST");
            return;
            } else if (this.arr[player[0]][player[1]] === hat) {
            console.log("YOU WON!");
            return;
            } else {
            // Update the field to reflect the player's move
            this.arr[player[0]][player[1]] = pathCharacter;
            }
            console.clear();
        }
    }

    static generateField(heigth, width) {
              
        // Initialize array to store field data
        let randomArr = [];
        // Initialize array to store field row data
        let intArr;
        // Initialize variable to store field character data
        let topography;
        
        // Loop through rows of the field
        for (let i = 0; i < heigth; i++) {
            // Reset intArr for each row
            intArr = [];  
            // Loop through columns of the field
            for (let j = 0; j < width; j++) {                             
                // Generate a random number between 0 and 99
                topography = Math.floor(Math.random() * 100);
                // If the random number is 36 or less, set the field character to a hole
                if (topography <= 36) {
                    topography = hole;
                }
                // Otherwise, set the field character to a field
                else {
                    topography = fieldCharacter;
                }
                // Add the field character to the current row
                intArr.push(topography);
            }
            // Add the current row to the field data
            randomArr.push(intArr);
        }
        
        // Set the starting position of the player to a path character
        randomArr[0][0] = pathCharacter;
        // Set the position of the hat to a random location on the field
        randomArr[(heigth - 1) - Math.floor(Math.random() * (heigth / 4))][(width - 1) - Math.floor(Math.random() * (width / 4))] = hat; 
        
        // Initialize array to store visited squares
        let visited = [[0, 0]];
        // Initialize array to store squares visited twice
        let visitedTwice = [];
        // Initialize array to store squares visited three times
        let visited3x = [];
        // Initialize array to store squares visited four times
        let visited4x = [];
        // Initialize player position
        let p = [0, 0];
        
        // Loop until a winning move is found
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

randomField = new Field (Field.generateField(userHeight, userWidth));

