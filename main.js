var speech_recognition = window.webkitSpeechRecognition;
var recognition = new speech_recognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
    document.getElementById("playOnClick").play();
    setTimeout(() => {
        document.getElementById("playOnClick").pause();
    }, 500);
}

recognition.onresult = function (event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(typeof (Content), Content);
    if (Content.toLowerCase().replace(".", "") == "take my selfie") {
        document.getElementById("selfieBox").style.display = "block";
        console.log("Taking selfie... ");
        speak();
    } else if (Content.toLowerCase().replace(".", "") == "text-to-speech") {
        document.getElementById("ttsBox").style.display = "block";
        console.log("Text to speech...");
        var synth = window.speechSynthesis;
        var speak_data = "Type your text in the text-box that was just created below.";
        var Content = speak_data;
        var utter_this = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utter_this);
    }
}

function tts() {
    var synth = window.speechSynthesis;
    var speak_data = document.getElementById("ttsText").value;
    var Content = speak_data;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    if (Content.toLowerCase().replace(".", "") == "take my selfie") {
        document.getElementById("selfieBox").style.display = "block";
        console.log("Taking selfie... ");
        speak();
    } else if (Content.toLowerCase().replace(".", "").replace("-", " ") == "text to speech") {
        var sd = "Already in text-to-speech mode.";
        var ut = new SpeechSynthesisUtterance(sd);
        synth.speak(ut);
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "Taking your selfie in 5 seconds...";
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    camera = document.getElementById("camera");
    Webcam.attach(camera);
    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 200
});

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        var imageToAdd = document.createElement("img");
        imageToAdd.src = data_uri;
        imageToAdd.id = "selfie_image";
        document.getElementById("result").appendChild(imageToAdd);
        console.log(data_uri);
    });
}

function save() {
    link = document.getElementById("link");
    console.log(document.getElementById("selfie_image"));
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}