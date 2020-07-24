console.log("Starting javascript...");

/*JAVASCRIPT BASICS*/
/*EXERCISE 1*/

var myName = "Aylen";
console.log("Name: " + myName);

/*EXERCISE 2*/

var age = 21;
console.log("Age: " + age);

/*EXERCISE 3*/

var ignasiAge = 32;
var ageDiff = ignasiAge - age;
console.log("Difference of age between Ignasi and you: ", ageDiff);

/*EXERCISE 4*/

if (age > 21){
    console.log("You're older than 21")
} else {
    console.log("You're not older than 21")
}

/*EXERCISE 5*/

if (age > ignasiAge){
    console.log("Ignasi is younger than you")
} else {
    if (age < ignasiAge){
        console.log("Ignasi is older than you")
    } else {
        console.log("You have the same age as Ignasi")
    }
}

/*JAVASCRIPT ARRAY FUNCTIONS*/
/*EXERCISE 1*/

var names = ["Jhoelda", "Maria", "Azucena", "Catalina", "Micaela", "Luz","Belen", "Carolina", "Andrea", "Florencia", "Branko", "Katy", "Malena", "Melissa", "Carla"];
console.log("Names of the class: ", names);

console.log("These are names ordered: ", names.sort());
console.log("This is the first name: ", names[0]);
console.log("This is the last name: ", names[names.length-1]);
console.log("These are all the names in the class: ");

var i=0; //La defino acá para todos los bucles que use después.

for(i=0; i<names.length; i++){
    console.log(names[i])
}

/*EXERCISE 2*/

var ages = [21, 19, 18, 23, 19, 19, 20, 18, 22, 20, 22, 19, 21, 21, 21];
console.log("Ages in the class: ", ages);

console.log("These are all the pair ages in the class: ");

/*
while(i<ages.length){
    if((ages[i] % 2) == 0){
        console.log(ages[i]);
    }
    i++;
}
*/

for(i=0; i<ages.length; i++){
     if((ages[i] % 2) == 0){
         console.log(ages[i])
     }
}

/*EXERCISE 3*/

var array = [1,30,15,-3,21,5,20,-9,5];
console.log("An array: ", array);

function lowestNumber(myArray) {
    var lowest = myArray[0];

    for(i=0; i<myArray.length; i++){
        if(myArray[i]<=lowest){
            lowest = myArray[i];
        }
    }
    return lowest;
}

console.log("This is the lowest number: ", lowestNumber(array));

/*EXERCISE 4*/

function biggestNumber(myArray) {
    var biggest = myArray[0];

    for(i=0; i<myArray.length; i++){
        if(myArray[i]>=biggest){
            biggest = myArray[i];
        }
    }
    return biggest;
}

console.log("This is the biggest number: ", biggestNumber(array));

/*EXERCISE 5*/

var index = 1;
var array = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];
console.log("Another array: ", array);

function contentIn(index, myArray) {
    return myArray[index];
}

console.log("This is the array's content in the index " + index + ": " + contentIn(index,array))

/*EXERCISE 6*/

function repeatedOnes(myArray) {
    var repeated = []

    for(i=0; i<myArray.length; i++){
        for(var j=0; j<myArray.length; j++){
            if((j!= i) && (myArray[i] == myArray[j])){
                if (repeated.indexOf(myArray[j])==-1){
                   repeated.push(myArray[j]);
                }
            }
        }
    }

    return repeated;
}

console.log("These are the repeated numbers in the array: ", repeatedOnes(array));

/*EXERCISE 7*/

myColor = ["Red", "Green", "White", "Black"];
console.log("Array with colors: ", myColor);

// function arrayToString(myArray) {
//     return myArray.toString(); //join(", ");
// }

function arrayToString(myArray) {
    var phrase="";
    for(i=0; i<myArray.length; i++){
        phrase += myArray[i];
        if (i<myArray.length-1) {
            phrase += ', ';
        }
    }

    return phrase;
}

console.log("This are all the elements of the array into a string: " + arrayToString(myColor));

/*JAVASCRIPT STRING FUNCTIONS*/
/*EXERCISE 1*/

var number = 32443;
console.log("Number: ", number);

function reverse(num) {
    return reversed = num.toString().split('').reverse().join('');
}

console.log("This is the number reversed: ", reverse(number));

/*EXERCISE 2*/

var word = "webmaster";
console.log("String: " + word);

function sortString(myWord){
    return myWord.split('').sort().join('');
}

console.log("This is the string in alphabetical order: " + sortString(word));

/*Exercise 3*/

var phrase = "prince of persia";
console.log("Phrase: " + phrase);

function capitalize(myPhrase) {
    var splitArray = myPhrase.split(' ');
    var aux = [];

    for(i=0; i<splitArray.length; i++){
        aux.push(splitArray[i].charAt(0).toUpperCase() + splitArray[i].slice(1));
    }

    return aux.join(' ');
}
  
console.log("This is the phrase capitalized: " + capitalize(phrase));

/*Exercise 4*/

phrase = "Web Development Tutorial";
console.log("Another phrase: " + phrase);


function longestWord(myPhrase) {
    var splitArray = myPhrase.split(' ');
    var lengths = [];
    var index = 0;

    for (i = 0; i < splitArray.length; i++) {
        lengths.push(splitArray[i].length);     
    }

    index = lengths.indexOf(biggestNumber(lengths));

    return splitArray[index];
}

console.log("This is the longest word in the phrase: " + longestWord(phrase));