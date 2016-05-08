var canvas, barAlign, audio, context, analyser, source, fbcArray, audioSrc, initalized, audioForm;
	initalized = 0;
	barAlign = "H";
	audioForm = function(){audioBars()};

window.addEventListener("resize", resize, false);
window.addEventListener("init", loadAudio, false);

function resize(){
	if(initalized){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
}

function loadAudio(){
	audio = document.getElementById("audio");
	audio.src = audioSrc;
	audio.play();
	init();
}

function init(){
	canvas = document.getElementById('audio_vis');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	ctx.shadowColor = "black";

	if(!(initalized)){
		initalized = 1;
		context = new AudioContext();
		source = context.createMediaElementSource(audio);
	}

	analyser = context.createAnalyser();
	source.connect(analyser);
	source.connect(context.destination);
	analyser.connect(context.destination);

	drawAudio();
}

function drawAudio(){
	fbcArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbcArray);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	audioForm();
}

function audioBars(){
	var x = 0;
	var fillColor = "#00D7FF";
	var limit = (barAlign == "H") ? window.innerWidth : window.innerHeight;

	for(var i = 0; x < limit; i++){
		var limit = (barAlign == "H") ? window.innerWidth : window.innerHeight;
		height = fbcArray[i] * 1.2;
		ctx.beginPath();

		if(barAlign == "H"){
			ctx.rect(x, canvas.height / 2, 5, height);
			ctx.rect(x, canvas.height / 2, 5, -height);
		}

		else{
			ctx.rect(canvas.width / 2, x, height, 5);
			ctx.rect(canvas.width / 2, x, -height, 5);
		}
		
		ctx.fillStyle = fillColor;
		ctx.fill();
		ctx.closePath();

		x += 10;
	}

	window.requestAnimationFrame(drawAudio);
}

function audioCircle(){
	fillColor = "#00D7FF";

	for(var i = 0; i < 100; i++){
		ctx.beginPath();
		radius = fbcArray[i];
		ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI, false);

		if(fillColor == "#00D7FF"){fillColor = "#12C9EB"}
		else if(fillColor == "#12C9EB"){fillColor = "#00BFE3"}
		else if(fillColor == "#00BFE3"){fillColor = "#00D7FF"}
		
		ctx.fillStyle = fillColor;
		ctx.fill();
		ctx.closePath();
	}	

	window.requestAnimationFrame(drawAudio);
}

function audioWave(){
	ctx.beginPath();
	ctx.moveTo(0, canvas.height / 2);
	startX = (canvas.width - 797) * 0.5;
	ctx.lineTo(startX, canvas.height / 2);
	ctx.stroke();
	last_x = 0;

	for(var i = 0; i < 170; i++){
		y = fbcArray[i];
		ctx.lineTo((i * 5) + startX, -y + canvas.height / 2);

		ctx.strokeStyle = "#fff";
		ctx.stroke();
		last_x = (i * 5) + startX;
	}

	ctx.lineTo(last_x, canvas.height / 2);
	ctx.lineTo(canvas.width, canvas.height / 2);
	ctx.stroke();

	window.requestAnimationFrame(drawAudio);	
}