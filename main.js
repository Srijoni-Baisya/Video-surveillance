status = "";

objects = [];

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

    //check if the model is loaded
    if(status != ""){
        //execute the model
        objectDetector.detect(video, gotResult);

        for(i=0; i<objects.length; i++){
            //update the status and no. of objects
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of Objects Detected : " + objects.length;

            //display the name of the object and the confidence level
            fill("#00008b");

            percent = floor(objects[i].confidence * 100);
            textSize(18);
            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            //unset the color and set the border color
            noFill();
            stroke("#00008b");

            //draw the rectangle around the object
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects = results;
}