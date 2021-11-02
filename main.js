status = "";

function preload(){
    //load the video
    video = createVideo("video.mp4");
}

function setup(){
    //create canvas
    canvas = createCanvas(500,500);

    var width = screen.width;

    if(width<768){
        resizeCanvas(320,320);
        canvas.position(20,250);
    }
    else{
        canvas.position(150,120);
    }
    
    //hide the extra component
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Coco-ssd model is loaded!");
    //change the status
    status = true;
    //play the video and loop it
    video.loop();
    //keep a normal speed for the video
    video.speed(1);
    //mute the video
    video.volume(0);
}

function draw(){
    image(video,0,0,500,500);
}