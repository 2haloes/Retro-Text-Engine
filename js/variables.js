/*
This page stores the values for the engine, this includes:

    - The content of what to display
    - What sound clip to use while text is being displayed
    - The speed of the text
    - The title and header text
*/

// Array to store values, edit this to edit the output
// Explination!
/*
    To output text, you can insert text into the array below, the text is comma seperated as seen below
    But 2 more output types can be used:
    Images: Change the background image with fade effects. 
        Syntax - [IMAGE]:foo.bar - Where foo is the file name and bar is the file extention
        Images are loaded from [project root]/assets/images folder
        Any browser compatible image can be used here
    Sounds: Play a sound or music (may be expanded later)
        Syntax - [SOUND]:foo.bar - Where foo is the file name and bar is the file extention
        Sounds are loaded from [project root]/assets/sounds folder
        Any browser compatible audio file can be used, mp3 (IE9+) and WAV (No IE) are the most compatible 
*/
let textToDisplay = [
"Hello there",
"*Gasp!*",
"Pizza PIE!!!"
];
// This is where the talking sound is stored, either changing the string here
// or replacing the file will change the sound. MP3 is used as all browsers support it
let textAudio = new Audio("assets/talking.mp3");

// This is the speed of the text display (default 75)
// This is in ms, lower is faster
let textSpeed = 75;

let displayHeader = "Retro Text Engine";
let displayTitle = "Retro Text Engine";