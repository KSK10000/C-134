img = "";
status1="";
object=[];
function setup(){
    canvas=createCanvas(550,550);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects...."
    video=createCapture(VIDEO);
    video.hide();
}
function preload(){
    Song=loadSound("alarm.mp3");
}
function modelloaded(){
  console.log("Your model is successfully loaded");
  status1=true;
}
function gotResults(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  object = results;
}
function draw() {
    image(video, 0, 0, 550, 550);
    if(status1!=""){
    objectDetector.detect(video, gotResults);
    for(i=0;i<object.length;i++){
      document.getElementById("status").innerHTML="Status: Object Detected";
      r=random(255);
      g=random(255);
      b=random(255);
      fill(r, g, b);
      percentage=floor(object[i].confidence*100);
      text(object[i].label+" , "+percentage+"%", object[i].x, object[i].y);
      textSize(25);
      noFill();
      stroke(r, g, b);
      rect(object[i].x, object[i].y, object[i].width, object[i].height);
      if(object[i].label=="person"){
        document.getElementById("number").innerHTML="Person Detected";
        Song.stop();
        console.log("Stop");
      }
      else{
        document.getElementById("number").innerHTML="Person Not Detected";
        Song.play();
        console.log("Play");
      }
    }
    if(object[i].length==0){
      document.getElementById("number").innerHTML="Person Not Detected";
      Song.play();
    }
    }
}