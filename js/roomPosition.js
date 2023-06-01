// Control the apparent room position of a musician in a video
// using the Web Audio API.
// Copyright 2023, Yann Orlarey

let myAudioGraph = null; // Use buildAudioGraph() to create this audio graph


// Build the audio graph the first time it is called
function buildAudioGraph() {
	if (myAudioGraph == null) {
		console.log("build audio graph");
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		myAudioGraph = new AudioContext();

		// 1) Check if context is in suspended state (autoplay policy)
		if (myAudioGraph.state === "suspended") {
			console.log("resume")
			myAudioGraph.resume();
		}
		reverbjs.extend(myAudioGraph);

		// 2) Load the impulse response; upon load, connect it to the audio output.
		var reverbUrl = "http://reverbjs.org/Library/LadyChapelStAlbansCathedral.m4a";
		var reverbNode = myAudioGraph.createReverbFromUrl(reverbUrl, function () {
			reverbNode.connect(myAudioGraph.destination);
		});

		// Create audio source
		// get the audio element
		const videoElement = document.querySelector("video");
		// pass it into the audio context
		const source = myAudioGraph.createMediaElementSource(videoElement);

		// Create a gain control node
		const wetNode = myAudioGraph.createGain();
		const dryNode = myAudioGraph.createGain();
		//const preDelay = myAudioGraph.createDelay();
		// and a slider to control the gain
		const volumeControl = document.querySelector("#volume");
		volumeControl.addEventListener(
			"input",
			() => {
				wetNode.gain.value = Math.sqrt(volumeControl.value);
				dryNode.gain.value = Math.sqrt(1 - volumeControl.value);
				//preDelay.delayTime.value = 0.01 * volumeControl.value;
				//console.log("wet: ", Math.sqrt(volumeControl.value), "dry: ", Math.sqrt(1 - volumeControl.value));
			},
			false
		);

		// connect the source to the context's destination (the speakers)
		source.connect(wetNode)/*.connect(preDelay)*/.connect(reverbNode);
		source.connect(dryNode).connect(myAudioGraph.destination);
	}
}

