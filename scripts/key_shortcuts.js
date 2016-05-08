$(document).ready(function(){
	$(document).keyup(function(e){
		if(e.keyCode == 79){
			if(e.ctrlKey){
				$('input[type=file]').click();
			}
		}

		else if(e.keyCode == 86){barAlign = "V"}
		else if(e.keyCode == 72){barAlign = "H"}
		else if(e.keyCode == 66){audioForm = function(){audioBars()};}
		else if(e.keyCode == 67){audioForm = function(){audioCircle()};}
		else if(e.keyCode == 87){audioForm = function(){audioWave()};}
		
		else if(e.keyCode == 32){
			if(initalized){
				if(audio.paused){audio.play()}
				else if(!(audio.paused)){audio.pause()}
			}
		}

		else if(e.keyCode == 77){$("#audioContainer").toggle()}
	})

	$("#openAudioFile").on("change", function () {
		var files = $(this)[0].files;

		for(var i = 0; i < files.length; ++i){
		  	audioSrc = files[i].path;
		}

		loadAudio();
	});
})