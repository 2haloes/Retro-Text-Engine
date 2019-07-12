$(function() {
    // Array to store values, edit this to edit the output
    textToDisplay = [
        "Hello there",
        "*Gasp!*",
        "Pizza PIE!!!"
    ];

    textAudio = new Audio("talking.mp3");
    textIndex = 0;

    document.getElementById("textBox").addEventListener("click", function() {
        nextDisplay();
    });

});

let textToDisplay;
let textToDisplayChar;
let textIndex;
let charIndex;
let textOutputInterval;
let textAudio;

function nextDisplay() {
    // [...Foo] creates an array from the Foo variable, this is used here to split the string into chars
    // This is used as it allows support for special characters (unlike a function like Foo.split('') which would output broken characters in that case)
    textToDisplayChar = [...textToDisplay[textIndex]];
    textAudio.loop = true;
    charIndex = 0;
    textAudio.play();
    $('#textOutput').text('');
    textOutputInterval = setInterval(textOutput, 75);
    
    textIndex++;
}

function textOutput() {
    if (charIndex < textToDisplayChar.length) {
        $('#textOutput').text($('#textOutput').text() + textToDisplayChar[charIndex]);
        charIndex++;
    } else {
        clearInterval(textOutputInterval);
        setTimeout(() => {textAudio.pause();}, 200);
        textAudio.loop = false;
        return;
    }
}