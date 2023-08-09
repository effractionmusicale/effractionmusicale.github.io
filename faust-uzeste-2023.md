# Workshop Faust à Improtech/Uzeste 2023

## Objectif

L'objectif de ce workshop est de vous initier à Faust, un langage de programmation permettant de créer des instruments de musique electronique. Le workshop s'adresse à tous et ne nécessite pas de connaissances préalables en programmation. 

Durant tout le workshop nous allons utiliser un outil en ligne, le Faust IDE, qui va nous permettre d'écrire et de faire fonctionner nos programmes Faust directement dans un navigateur Web. Pour acceder à cet outil, il suffit d'ouvrir la page https://faustide.grame.fr depuis son navigateur.

Grâce à cet outil, nous allons créér, étape par étape, un petit synthétiseur musicale que l'on pourra ensuite jouer soit directement depuis l'ordinateur, soit à partir d'un clavier MIDI, soit également depuis un smartphone. 

Nous terminerons le workshop par une petite improvisation musicale collective, en utilisant l'instrument que nous auront construit.


## Etape 1

Baisser le volume; être un MONO !

	import("stdfaust.lib");
	process = os.sawtooth(50);

## Etape 2

Ajout d'un contrôle de volume :

	import("stdfaust.lib");
	process = os.sawtooth(50)
			* hslider("gain", 0.1, 0, 1, 0.01);

## Etape 3

Ajout d'un contrôle de fréquence :

	import("stdfaust.lib");
	process = os.sawtooth(hslider("freq", 50, 30, 8000, 1))
			* hslider("gain", 0.1, 0, 1, 0.01);


## Etape 4

Ajout d'un filtre résonnant :

	import("stdfaust.lib");
	process = os.sawtooth(hslider("freq", 50, 30, 8000, 1))
			* hslider("gain", 0.1, 0, 1, 0.01) :
	fi.resonlp(300,5,1);


## Etape 5

Restructuration du code :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 8000, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	
	process = os.sawtooth(freq)*gain 
			: fi.resonlp(300,5,1);


## Etape 6

Oscillateur sur la fréquence de resonnance :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 8000, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	lfo = os.lf_triangle(0.5)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain 
			: fi.resonlp(lfo*300+50,5,1);

## Etape 7

Oscillateur sur la fréquence de resonnance, ajout de controles sur le lfo :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 8000, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	lfreq = hslider("lfreq",0.5,0.01,50,0.01);
	lrange = hslider("lrange",300,10,5000,0.01);

	lfo = os.lf_triangle(lfreq)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain 
			: fi.resonlp(lfo*lrange+50,5,1);


## Etape 8

Production d'un son stereo :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);

	lfreq = hslider("lfreq",0.5,0.01,50,0.01);
	lrange = hslider("lrange",300,10,5000,0.01);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain 
			<: 	fi.resonlp(lfo1*lrange+50,5,1), 
				fi.resonlp(lfo2*lrange+50,5,1); 



## Etape 9

Pilotage à partir d'un clavier MIDI (Poly 16) :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	gate = button("gate");

	lfreq = hslider("lfreq",0.5,0.01,50,0.01);
	lrange = hslider("lrange",300,10,5000,0.01);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain*gate 
			<: 	fi.resonlp(lfo1*lrange+50,5,1), 
				fi.resonlp(lfo2*lrange+50,5,1); 



## Etape 10

Ajout d'un limiter pour éviter les clicks :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	gate = button("gate");

	lfreq = hslider("lfreq",0.5,0.01,50,0.01);
	lrange = hslider("lrange",300,10,5000,0.01);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain*gate 
			<:  fi.resonlp(lfo1*lrange+50,5,1), 
				fi.resonlp(lfo2*lrange+50,5,1); 

	effect = co.limiter_1176_R4_stereo;



## Etape 11

Ajout de contrôles MIDI :

	import("stdfaust.lib");

	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	gate = button("gate");

	lfreq = hslider("lfreq",0.5,0.01,50,0.01);
	lrange = hslider("lrange[midi:ctrl 49]",300,10,5000,0.01);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain*gate 
			<: 	fi.resonlp(lfo1*lrange+50,5,1), 
				fi.resonlp(lfo2*lrange+50,5,1); 

	effect = co.limiter_1176_R4_stereo;


## Etape 12

Ajout d'une enveloppe et d'un volume :

	import("stdfaust.lib");
	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	gate = button("gate") : en.adsr(0.1, 0.2, 0.8, 2);
	volume = hslider("volume[midi:ctrl 48]",0.6,0,1,0.01);

	lfreq = hslider("lfreq",0.5,0.01,50,0.01);
	lrange = hslider("lrange[midi:ctrl 49]",300,10,5000,0.01);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain*gate 
			<: 	fi.resonlp(lfo1*lrange+50,5,1), 
				fi.resonlp(lfo2*lrange+50,5,1); 
	effect = co.limiter_1176_R4_stereo;


## Etape 13 (Keyboard version)

Ajout d'un écho, la vélocité contrôle un peu le lrange :

	declare name "Wahoo";

    import("stdfaust.lib");
	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	gate = button("gate") : en.adsr(0.1, 0.2, 0.8, 2) ;
	volume = hslider("volume",0.6,0,1,0.01);

	lfreq = hslider("lfreq[midi:ctrl 48]",0.5,0.01,4,0.01);
	lrange = hslider("lrange[midi:ctrl 49]",300,20,5000,0.01) * (1+2*gain);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain*gate 
			<: 	fi.resonlp(lfo1*lrange+50,5,1)*volume, 
				fi.resonlp(lfo2*lrange+50,5,1)*volume; 

	effect 	= par(i,2,ef.echo(1,0.25, 0.75)) 
			: co.limiter_1176_R4_stereo;

## Etape 14 (Android version)

Metadata acc ajoutés aux lfo :

	declare name "Wahoo";

	// version pour android
    import("stdfaust.lib");
	freq = hslider("freq", 50, 30, 500, 1);
	gain = hslider("gain", 0.1, 0, 1, 0.01);
	gate = button("gate") : en.adsr(0.1, 0.2, 0.8, 2) ;
	volume = hslider("volume",0.6,0,1,0.01);

	lfreq = hslider("lfreq[acc: 0 3 -10 0 10]",0.5,0.01,4,0.01);
	lrange = hslider("lrange[acc: 1 3 -10 0 10]",300,10,5000,0.01) * (1+gain);
	lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
	lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;
	
	process = os.sawtooth(freq)*gain*gate 
			<: 	fi.resonlp(lfo1*lrange+50,5,1)*volume, 
				fi.resonlp(lfo2*lrange+50,5,1)*volume 
            : effect; 

	effect 	= par(i,2,ef.echo(1,0.25, 0.75)) 
			: co.limiter_1176_R4_stereo;



# Original

Final step :

	import("stdfaust.lib");
	declare name "WAHOO";
	oscFreq = vslider("h:WAAHOO/h:OSC/freq[style:knob][unit:Hz]",50,30,500,0.01);
	oscGain = vslider("h:WAAHOO/h:OSC/gain[style:knob]",0.5,0,1,0.01);
	lfoFreq = vslider("h:WAAHOO/h:LFO/lfreq[style:knob][unit:Hz]",0.5,0.01,50,0.01);
	lfoRange = vslider("h:WAAHOO/h:LFO/lrange[style:knob][midi:ctrl 49]",300,10,5000,0.01);
	volume = hslider("volume[midi:ctrl 48]",0.6,0,1,0.01);
	gate = button("gate") : en.adsr(0.1, 0.2, 0.8, 2);

	LFO1 = os.lf_triangle(lfoFreq)*0.5 + 0.5;
	LFO2 = os.lf_triangle(lfoFreq*1.01)*0.5 + 0.5;
	process = os.sawtooth(oscFreq)*oscGain*gate <: 
		fi.resonlp(LFO1*lfoRange+50,5,1)*volume,
		fi.resonlp(LFO2*lfoRange+50,5,1)*volume;

	effect = par(i,2,ef.echo(2,0.5,0.9)) : co.limiter_1176_R4_stereo;
