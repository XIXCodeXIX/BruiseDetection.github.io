let img;

const pinkRedBruiseRange = [
    [90, 80, 180], // Lower bound for pink-red range
    [130, 140, 255] // Upper bound for pink-red range
];

const bluePurpleBruiseRange = [
    [70, 30, 120], // Lower bound for blue-purple range
    [180, 150, 220] // Upper bound for blue-purple range
];

const greenYellowBruiseRange = [
    [80, 120, 80], // Lower bound for green-yellow range
    [170, 220, 170] // Upper bound for green-yellow range
];

const brownHealRange = [
    [0, 0, 50], // Lower bound for brown-heal range
    [100, 180, 200] // Upper bound for brown-heal range
];


function setup() {
    createCanvas(400, 400);
    noLoop();
}

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            img = loadImage(event.target.result, () => {
                image(img, 0, 0, width, height);
                analyzeImage();
            });
        };
        reader.readAsDataURL(file);
    }
}

function analyzeImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                
                let pinkRed = 0;
                let bluePurple = 0;
                let greenYellow = 0;
                let brownYellow = 0;
                let totalPixels = 0;

                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const color = [r, g, b];

                    if (isColorInRange(color, pinkRedBruiseRange)) {
                        pinkRed++;
                    } else if (isColorInRange(color, bluePurpleBruiseRange)) {
                        bluePurple++;
                    } else if (isColorInRange(color, greenYellowBruiseRange)) {
                        greenYellow++;
                    } else if (isColorInRange(color, brownHealRange)) {
                        brownYellow++;
                    }

                    totalPixels++;
                }

                const resultElement = document.getElementById('result');
                const pinkRedElement = document.getElementById('pinkred');
                const bluePurpleElement = document.getElementById('bluepurple');
                const greenYellowElement = document.getElementById('yellowgreen');
                const brownYellowElement = document.getElementById('brownyellow');

                const pinkRedPercentage = (pinkRed / totalPixels) * 100;
                const bluePurplePercentage = (bluePurple / totalPixels) * 100;
                const greenYellowPercentage = (greenYellow / totalPixels) * 100;
                const brownYellowPercentage = (brownYellow / totalPixels) * 100;

                let healingTime;

                if (pinkRedPercentage > bluePurplePercentage && pinkRedPercentage > greenYellowPercentage && pinkRedPercentage > brownYellowPercentage) {
                    healingTime = "Estimated healing time 10 to 14 days";
                } else if (bluePurplePercentage > pinkRedPercentage && bluePurplePercentage > greenYellowPercentage && bluePurplePercentage > brownYellowPercentage) {
                    healingTime = "Estimated healing time 5 to 10 days";
                } else if (greenYellowPercentage > bluePurplePercentage && greenYellowPercentage > pinkRedPercentage && greenYellowPercentage > brownYellowPercentage) {
                    healingTime = "Estimated healing time 2 to 5 days";
                } else {
                    healingTime = "Estimated healing time 1 to 2 days";
                }

                resultElement.innerText = healingTime;
                pinkRedElement.innerText = pinkRedPercentage.toFixed(2) + "%";
                bluePurpleElement.innerText = bluePurplePercentage.toFixed(2) + "%";
                greenYellowElement.innerText = greenYellowPercentage.toFixed(2) + "%";
                brownYellowElement.innerText = brownYellowPercentage.toFixed(2) + "%";
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function isColorInRange(color, colorRange) {
    for (let i = 0; i < 3; i++) {
        if (color[i] < colorRange[0][i] || color[i] > colorRange[1][i]) {
            return false;
        }
    }
    return true;
}
