$(function() {
    // Array to store values, edit this to edit the output
    textToDisplay = [
        "Hello there",
        "*Gasp!*",
        "[IMAGE]:seascape.png",
        "[IMAGE]:seascape.png",
        "Pizza PIE!!!"
    ];
    // This is where the talking sound is stored, either changing the string here
    // or replacing the file will change the sound. MP3 is used as all browsers support it
    textAudio = new Audio("assets/talking.mp3");
    textAudio.loop = true;

    // This is used to find where in the text display it is, don't mess with this value
    textIndex = 0;

    // When the box is clicked, then progress the text
    document.getElementById("textBox").addEventListener("click", function() {
        if (textIndex < textToDisplay.length) {
            nextDisplay();
        }
    });

});

// Variables used thoughout the file are declared here
let textToDisplay;
let textToDisplayChar;
let textIndex;
let charIndex;
let textOutputInterval;
let textAudio;
let audioPause;

function nextDisplay() {

    if (textToDisplay[textIndex].startsWith('[IMAGE]:')) {
        let tmpImgString = textToDisplay[textIndex].substr(8);
        if (!!$('#imageToDisplay').attr('src')) {
            $('#imageToDisplay').toggleClass('imageFade');
            setTimeout(() => {$('#imageToDisplay').attr('src', 'assets/images/' + tmpImgString);}, 500);
            setTimeout(() => {$('#imageToDisplay').toggleClass('imageFade');}, 1000);
        } else {
            setTimeout(() => {$('#imageToDisplay').attr('src', 'assets/images/' + tmpImgString);}, 500);
            setTimeout(() => {$('#imageToDisplay').toggleClass('imageFade');}, 500);
        }
    } else if (textToDisplay[textIndex].startsWith('[SOUND]:')) {
        let tmpImgString = textToDisplay[textIndex].substr(8);
        new Audio('assets/sounds/' + tmpImgString).play();
    } else {
        // [...Foo] creates an array from the Foo variable, this is used here to split the string into chars
        // This is used as it allows support for special characters (unlike a function like Foo.split('') which would output broken characters in that case)
        textToDisplayChar = [...textToDisplay[textIndex]];
        // Stops sounds issues when click mashing
        clearTimeout(audioPause);
        charIndex = 0;
        // When the text starts displaying, there's a 75ms delay which means that the sounds start to early, this stops that
        setTimeout(() => {textAudio.play();}, 80);
        $('#textOutput').text('');
        // Every 75ms, a char is displayed
        textOutputInterval = setInterval(textOutput, 75);
    }
    // Now that everything is done with the textIndex, it's incremented 
    textIndex++;
}

function textOutput() {
    if (charIndex < textToDisplayChar.length) {
        // This appends the char to the currently displayed text
        $('#textOutput').text($('#textOutput').text() + textToDisplayChar[charIndex]);
        charIndex++;
    } else {
        // clearInterval stops the loop of this function
        clearInterval(textOutputInterval);
        // Stopping the audio as soon as possible was really janky, this avoids that
        // At first, only the looping was stopped but then the audio would still loop about 5 times before stopping
        audioPause = setTimeout(() => {textAudio.pause();}, 75);
        return;
    }
}