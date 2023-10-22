let osc, playing, freq, amp;

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.mousePressed(playOscillator);

  //initiate oscillator
  osc = new p5.Oscillator('sine');

  //initiate fft
  fft = new p5.FFT();
}

function draw() {
  background(220, 0, 0)

  // put the rectangle sizes in variables and set them to screen adjustable size
  sqx = width/4;
  sqy = height/2-(height/4)/2;
  sqw = width/2;
  sqh = height/4;
  
  //draw rectangle
  fill(255);
  rect(width/4, height/2-(height/4)/2, width/2, height/4);

  //map the frequency and amplitude inside the rectangle
  freq = constrain(map(mouseX, sqx, sqx + sqw, 100, 500), 100, 500);
  amp = constrain(map(mouseY, sqy + sqh, sqy, 0, 1), 0, 1);

  // analyse the waveform
  let waveform = fft.waveform();
  // console.log(waveform);

  //draw the waveform
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, sqx, sqx + sqw);
    let y = map( waveform[i], -1, 1, sqy, sqy + sqh);
    vertex(x,y);
  }
  endShape();

  //move the text to next to the rectangle
  push(); // push/pop so nothing else moves
  translate(sqx, sqy - 80)
  text('tap to play', 0, 20);
  text('freq: ' + freq, 0, 40);
  text('amp: ' + amp, 0, 60);
  pop();

  // envelope
  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

//function to play oscillator
function playOscillator() {
  // starting an oscillator on a user gesture will enable audio in browsers that have a strict autoplay policy.
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}

