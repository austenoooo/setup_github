let moodIndex = [1, 2, 3, 3, 5, 4, 3, 2, 1, 3, 4, 5, 5, 3, 3, 4, 1, 2, 3, 3, 3, 4, 5, 5, 3, 2, 2, 1, 1, 0];
let monthFeature = [
  {text: "JAN", dayCount: 31},
  {text: "FEB", dayCount: 29},
  {text: "MAR", dayCount: 31},
  {text: "APR", dayCount: 30},
  {text: "MAY", dayCount: 31},
  {text: "JUN", dayCount: 30},
  {text: "JUL", dayCount: 31},
  {text: "AUG", dayCount: 31},
  {text: "SEPT", dayCount: 30},
  {text: "OCT", dayCount: 31},
  {text: "NOV", dayCount: 30},
  {text: "DEC", dayCount: 31}
];

let currentDay = 28; // current day start with 0
let currentMonth = 11;
let daysCount = monthFeature[currentMonth - 1].dayCount;
let monthText = monthFeature[currentMonth - 1].text;

let moodPoints = [];
let innerCircleIndex = 0.3;
let outerRingIndex = 1 - innerCircleIndex;

// let colorPalette = ["#FFB2E6", "#D972FF", "#8447FF", "#8CFFDA", "#C6FFE1", "#FFFFE8"];

// let colorPalette = ["#F27EA9", "#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8", "#F2F2F2"];

let colorPalette = ["#70d6ff", "#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70", "#e9ff70"];

let numberFont;

let openIcon;
let closeIcon;

function preload(){
  numberFont = loadFont("assets/CodeNext.ttf");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  textFont('forma-djr-banner');
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  let radius = min(width * 0.4, height * 0.4);
 
  visualization(radius);
  
//   displayDay();
  
//   let windowW = width / 4.5;
//   let windowH = height / 12;
//   let margin = 10;
//   allWindow(windowW, windowH, margin);
}

function displayDay(){
  fill(255);
  textAlign(LEFT, CENTER);
  textFont('forma-djr-banner');
  textSize(width / 20);
  text(monthText + ".  " + (currentDay + 1), 20, width / 20 - 10);
}

function allWindow(windowW, windowH, margin){
  stroke(255);
  noFill();
  
  
  // from bottom to top
  // colorWindow
  let colorWindowY = height - windowH * 1 - margin * 1;
  let colorWindowX = margin;
  rect(colorWindowX, colorWindowY, windowW, windowH, 5, 5, 5, 5);
  
  // periodWindow
  let periodWindowY = height - windowH * 2 - margin * 2;
  let periodWindowX = margin;
  rect(periodWindowX, periodWindowY, windowW, windowH, 5, 5, 5, 5);
  
  // moodWindow
  let moodWindowY = height - windowH * 3 - margin * 3;
  let moodWindowX = margin;
  rect(moodWindowX, moodWindowY, windowW, windowH, 5, 5, 5, 5);
  
  
  // all the text
  textSize(width / 65);
  fill(255);
  noStroke();
  text("Change your color", colorWindowX + 15, height - windowH * 0.5 - margin * 1);
  text("+ Add period", periodWindowX + 15, height - windowH * 1.5 - margin * 2);
  text("How do you feel today?", moodWindowX + 15, height - windowH * 2.5 - margin * 3);
  
  // icon
  
}

