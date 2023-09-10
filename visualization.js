function visualization(radius){
  // drawRadialGradient(radius);

  // display the day texts
  displayDays(radius, daysCount);
  
  // display the mood points
  // displayMood(radius, daysCount);
  displayRect(radius, daysCount);
}


function displayRect(radius, totalDays){
  moodPoints = [];
  
  let centerX = width/2;
  let centerY = height/2;
  let angleIncrement = 2 * PI / totalDays;

  
  // calculate the position
  for (let i = 0; i < totalDays; i++){
    let angle = i * angleIncrement;
    let alteredRadius = radius * (innerCircleIndex + outerRingIndex / 5 * (moodIndex[i] - 1));
    let x = centerX + sin(angle) * alteredRadius;
    let y = centerY - cos(angle) * alteredRadius;
    let xMax = centerX + sin(angle) * radius;
    let yMax = centerY - cos(angle) * radius;
    // update the mood points position
    if (moodIndex[i] != 0){
      moodPoints.push({
        x: x,
        y: y
      });
    }
    
    // draw the background line
    push();
    stroke(25);
    strokeCap(SQUARE);
    strokeWeight(14);
    line(centerX, centerY, xMax, yMax);
    pop();
    
    // draw the gradient rect
    push();
    translate(centerX, centerY)
    rotate(angle);
    gradientRect(radius, moodIndex[i]);
    pop();
  }
  
  // the black circle in the center
  fill(0);
  noStroke();
  circle(centerX, centerY, radius * (innerCircleIndex + 0.05) * 2);
}

function gradientRect(radius, moodLevel){
  for (let c = 0; c < moodLevel; c++){
    let colorStart = color(colorPalette[c]);
    let colorEnd = color(colorPalette[c+1]);
    let totalSteps = radius * outerRingIndex / 5;
    for (let y = 0; y < totalSteps; y++){
      let currentColor = lerpColor(colorStart, colorEnd, y/totalSteps);
      let circleRadius = radius * innerCircleIndex + c * totalSteps + y;
      noFill();
      stroke(currentColor);
      strokeWeight(2);
      // circle(centerX, centerY, circleRadius * 2);
      line(-6, -circleRadius, 6, -circleRadius);
    }
  }
  

  // if (moodLevel != 0){
  //   fill(colorPalette[moodLevel]);
  //   let radiusMax = radius * (innerCircleIndex + outerRingIndex / 5 * moodLevel)
  //   noStroke();
  //   arc(0, -radiusMax+1, 14, 14, PI, 0);
  // }
}


function displayMood(radius, totalDays){
   // reset 
  moodPoints = [];
  
  let centerX = width/2;
  let centerY = height/2;
  let angleIncrement = 2 * PI / totalDays;
  
  // calculate the position
  for (let i = 0; i < totalDays; i++){
    let angle = i * angleIncrement;
    let alteredRadius = radius * (innerCircleIndex + outerRingIndex / 5 * (moodIndex[i] - 1));
    let x = centerX + sin(angle) * alteredRadius;
    let y = centerY - cos(angle) * alteredRadius;
    // update the mood points position
    if (moodIndex[i] != 0){
      moodPoints.push({
        x: x,
        y: y
      });
      fill('white');
      circle(x, y, radius / 50);
    }
  }
  
  // connect all the dots
  push();
  stroke(255);
  strokeWeight(0.8);
  drawCurveLines(false);
  pop();
  
  // the smaller view
  push();
  translate(width/2*0.7, height/2*0.7);
  scale(0.3);
  stroke(colorPalette[4]);
  strokeWeight(1);
  fill(0);
  drawCurveLines(true);
  pop();
}


function drawRadialGradient(radius){
  let centerX = width/2;
  let centerY = height/2;
  
  fill(color(colorPalette[0]));
  circle(centerX, centerY, radius * innerCircleIndex * 2);
  
  fill(0);
  circle(centerX, centerY, radius * innerCircleIndex * 2 * 0.8);
  
  // there is five color in total
  for (let c = 0; c < 5; c++){
    let colorStart = color(colorPalette[c]);
    let colorEnd = color(colorPalette[c+1]);
    let totalSteps = radius * outerRingIndex / 5;
    for (let y = 0; y < totalSteps; y++){
      let currentColor = lerpColor(colorStart, colorEnd, y/totalSteps);
      let circleRadius = radius * innerCircleIndex + c * totalSteps + y;
      noFill();
      stroke(currentColor);
      strokeWeight(2);
      circle(centerX, centerY, circleRadius * 2);
    }
  }
  
  // drawing the dashed lines
  // push();
  // for (let i = 0; i < 5; i++){
  //   setLineDash([4, 3]);
  //   stroke(255);
  //   strokeWeight(0.5);
  //   let r = radius * (innerCircleIndex + i * outerRingIndex / 5);
  //   circle(centerX, centerY, 2 * r);
  // }
  // pop();
}



// display the days on the circle
function displayDays(radius, totalDays){
  let centerX = width/2;
  let centerY = height/2;
  let angleIncrement = 2 * PI / totalDays;
  
  for (let i = 0; i < totalDays; i+=1){
    let angle = i * angleIncrement;
    let x = centerX + sin(angle) * radius * 1.1;
    let y = centerY - cos(angle) * radius * 1.1;
    
    noStroke();
    fill(255);
    textSize(radius / 23);
    textFont('forma-djr-banner');
    textAlign(CENTER, CENTER)
    text((i + 1).toString(), x, y);
  }
}


function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  noStroke();
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawCurveLines(drawBones){
  noFill();
  beginShape();
  curveVertex(moodPoints[0].x, moodPoints[0].y);
  for (let i = 0; i <= currentDay; i++){
    curveVertex(moodPoints[i].x, moodPoints[i].y);
    if (drawBones){
      line(width/2, height/2, moodPoints[i].x, moodPoints[i].y);
    }
  }
  curveVertex(moodPoints[currentDay].x, moodPoints[currentDay].y);
  endShape();
}

