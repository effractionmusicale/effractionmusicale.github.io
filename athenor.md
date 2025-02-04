# Programmer des instruments de musique électronique avec FAUST, langage de programmation pour la création sonore


## Pour suivre : <a href="https://effractionmusicale.fr/athenor" >https://effractionmusicale.fr/athenor</a>

<img src="qrc-athenor.png" alt="workshop" width="25%"/>


## Objectif

L'objectif de ce mini atelier est de vous initier à Faust, un langage de programmation permettant de créer des instruments de musique électroniques. 

<figure>
  <img src="synth.jpg" alt="synth" width="100%"/>
  <figcaption>Faust, un langage de programmation pour les instruments électroniques.</figcaption>
</figure>

L'atelier s'adresse à toutes et tous, et ne nécessite pas de connaissances préalables en programmation. Durant l'atelier, nous allons utiliser un outil en ligne, le Faust IDE, qui va nous permettre d'écrire et de faire fonctionner nos programmes Faust directement dans un navigateur Web. Pour accéder à cet outil, il suffit d'ouvrir la page <a href="https://faustide.grame.fr" target="_faust">https://faustide.grame.fr</a> depuis son navigateur.

Grâce à cet outil, nous allons créer un petit instrument musical que l'on pourra ensuite jouer soit directement depuis son smartphone. 

Nous terminerons l'atelier par une petite improvisation musicale collective, en utilisant l'instrument que nous aurons construit.

## Etape 1

On demande à chatgpt: "peux-tu ecrire un générateur de bruit blanc en Faust avec un réglage de volume ?"

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=Ly8gR-lu6XJhdGV1ciBkZSBicnVpdCBibGFuYyBhdmVjIGNvbnRy9GxlIGRlIHZvbHVtZQppbXBvcnQoInN0ZGZhdXN0LmxpYiIpOwoKLy8gUGFyYW3odHJlIGRlIHZvbHVtZSAoZGUgMC4wIOAgMS4wKQp2b2x1bWUgPSBoc2xpZGVyKCJWb2x1bWUiLCAwLCAwLjAsIDEuMCwgMC4wMSk7CgovLyBH6W7pcmF0ZXVyIGRlIGJydWl0IGJsYW5jCndoaXRlX25vaXNlID0gbm8ubm9pc2U7CgovLyBBcHBsaWNhdGlvbiBkdSB2b2x1bWUKcHJvY2VzcyA9IHdoaXRlX25vaXNlICogdm9sdW1lOwo%3D" target="_faust">Essayer &rarr;</a>

```faust
// Générateur de bruit blanc avec contrôle de volume
import("stdfaust.lib");

// Paramètre de volume (de 0.0 à 1.0)
volume = hslider("Volume", 0, 0.0, 1.0, 0.01);

// Générateur de bruit blanc
white_noise = no.noise;

// Application du volume
process = white_noise * volume;
```

## Etape 2

On ajoute un resonnateur:

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=Ly8gR-lu6XJhdGV1ciBkZSBicnVpdCBibGFuYyBhdmVjIGNvbnRy9GxlIGRlIHZvbHVtZQppbXBvcnQoInN0ZGZhdXN0LmxpYiIpOwoKLy8gUGFyYW3odHJlIGRlIHZvbHVtZSAoZGUgMC4wIOAgMS4wKQp2b2x1bWUgPSBoc2xpZGVyKCJWb2x1bWUiLCAwLCAwLjAsIDEuMCwgMC4wMSk7CgovLyBH6W7pcmF0ZXVyIGRlIGJydWl0IGJsYW5jCndoaXRlX25vaXNlID0gbm8ubm9pc2U7CgovLyBBcHBsaWNhdGlvbiBkdSB2b2x1bWUKcHJvY2VzcyA9IHdoaXRlX25vaXNlICogdm9sdW1lIDogcmVzb25uYXRldXI7CgovLyByZXNvbm5hdGV1ciAKcmVzb25uYXRldXIgPSArIH4gKEAoNDMpIDw6IF8sIG1lbSA6PiAqKDAuNDk5OSkpOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
// Générateur de bruit blanc avec contrôle de volume
import("stdfaust.lib");

// Paramètre de volume (de 0.0 à 1.0)
volume = hslider("Volume", 0, 0.0, 1.0, 0.01);

// Générateur de bruit blanc
white_noise = no.noise;

// Application du volume
process = white_noise * volume : resonnateur;

// resonnateur 
resonnateur = + ~ (@(43) <: _, mem :> *(0.4999));

```



## Etape 3

On fait un gros saut en avant et on crée KISANA, un instrument avec deux "cordes" sur lesquelles on peut jouer :

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=kisana&inline=Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQovLyAJCUtpc2FuYSA6IDMtbG9vcHMgc3RyaW5nIGluc3RydW1lbnQKLy8JCShiYXNlZCBvbiBLYXJwbHVzLVN0cm9uZykKLy8KLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKZGVjbGFyZSBuYW1lICAJIktpc2FuYSI7CmRlY2xhcmUgYXV0aG9yICAiWWFubiBPcmxhcmV5IjsKCmltcG9ydCgic3RkZmF1c3QubGliIik7CgpLRVkgPSA2MDsJLy8gYmFzaWMgbWlkaSBrZXkKTkNZID0gMTU7IAkvLyBub3RlIGN5Y2xlIGxlbmd0aApDQ1kgPSAxNTsJLy8gY29udHJvbCBjeWNsZSBsZW5ndGgKQlBTID0gMzYwOwkvLyBnZW5lcmFsIHRlbXBvIChiZWF0IHBlciBzZWMpCgovLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1raXNhbmEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCi8vIFVTQUdFOiAga2lzYW5hIDogXyxfOwovLyAJCTMtbG9vcHMgc3RyaW5nIGluc3RydW1lbnQKLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKcHJvY2VzcyA9IGhncm91cCgiS0lTQU5BIiwgaGFycGUoQywxMSw2MCksIGhhcnBlKEMsMTEsNzIpICA6PiAqKGwpLCoobCkgOiBwYXIoaSwyLGVmLmVjaG8oMSwwLjI1LEUpKSkKCXdpdGggewoJCWwgPSB2c2xpZGVyKCJ2Ols2Ml1DVFJML21hc3RlcltzdHlsZTprbm9iXVthY2M6IDEgMyAtMTAgMCAxMF0iLC02LCAtNjAsIDAsIDAuMDEpIDogYmEuZGIybGluZWFyIDogc2kuc21vbzsgLy8gWTogMDpwbGF0IC0-IHZlcnRpY2FsOjEwCgkJQyA9IHZzbGlkZXIoInY6WzYyXUNUUkwvdGltYnJlW3N0eWxlOmtub2JdW2FjYzogMCAzIC0zIDAgM10iLDAuNSwgMC41LCAwLjk4LCAwLjAxKSA6IHNpLnNtb287IC8vIFg6IHRvdXJuZXIgZ2F1Y2hlIDwtMC0%2BIGRyb2l0ZQoJCUUgPSB2c2xpZGVyKCJ2Ols2Ml1DVFJML2VjaG9bc3R5bGU6a25vYl0iLDAsIDAsIDAuOSwgMC4wMSkgOiBzaS5zbW9vOyAvLyB0b3VybmVyIGdhdWNoZSA8LT4gZHJvaXRlCgl9OwoKLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tSGFycGUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQovLyBVU0FHRTogIGhhcnBlKEMsMTAsNjApIDogXyxfOwovLwkJQyBpcyB0aGUgZmlsdGVyIGNvZWZmaWNpZW50IDAuLjEKLy8gCQlCdWlsZCBhIE4gKDEwKSBzdHJpbmdzIGhhcnBlIHVzaW5nIGEgcGVudGF0b25pYyBzY2FsZQovLwkJYmFzZWQgb24gbWlkaSBrZXkgYiAoNjApCi8vCQlFYWNoIHN0cmluZyBpcyB0cmlnZ2VyZWQgYnkgYSBzcGVjaWZpYwovLwkJcG9zaXRpb24gb2YgdGhlICJoYW5kIgovLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmhhcnBlKEMsTixiKSA9IAloYW5kIDw6IHBhcihpLCBOLCBwb3NpdGlvbihpKzEpCgkJCQkJCQk6IHN0cmluZyhDLFBlbnRhKGIpLmRlZ3JlZTJIeihpKSwgYXR0LCBsdmwpCgkJCQkJCQk6IHBhbigoaSswLjUpL04pICkKCQkJCSAJOj4gXyxfCgl3aXRoIHsKCQlhdHQgID0gNDsKCQloYW5kID0gdmdyb3VwKCJbJWJdTE9PUCAlYiIsIHZzbGlkZXIoIlsxXW5vdGUiLCAwLCAwLCBOLCAxKSA6IGludCA6IGJhLmF1dG9tYXQoMzYwLCAxMywgMC4wKSk7CgkJbHZsICA9IDE7CgkJcGFuKHApID0gXyA8OiAqKHNxcnQoMS1wKSksICooc3FydChwKSk7CgkJcG9zaXRpb24oYSx4KSA9IGFicyh4IC0gYSkgPCAwLjU7CgkJZGIybGluZWFyKHgpICA9IHBvdygxMCwgeC8yMC4wKTsKCgl9OwoKLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tUGVudGEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCi8vIFBlbnRhdG9uaWMgc2NhbGUgd2l0aCBkZWdyZWUgdG8gbWlkaSBhbmQgZGVncmVlIHRvIEh6IGNvbnZlcnNpb24KLy8gVVNBR0U6IFBlbnRhKDYwKS5kZWdyZWUybWlkaSgzKSA9PT4gNjcgbWlkaWtleQovLyAgICAgICAgUGVudGEoNjApLmRlZ3JlZTJIeig0KSAgID09PiA0NDAgSHoKLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQoKUGVudGEoa2V5KSA9IGVudmlyb25tZW50IHsKCglBNEh6ID0gNDQwOwoKCWRlZ3JlZTJtaWRpKDApID0ga2V5KzA7CglkZWdyZWUybWlkaSgxKSA9IGtleSsyOwoJZGVncmVlMm1pZGkoMikgPSBrZXkrNDsKCWRlZ3JlZTJtaWRpKDMpID0ga2V5Kzc7CglkZWdyZWUybWlkaSg0KSA9IGtleSs5OwoJZGVncmVlMm1pZGkoZCkgPSBkZWdyZWUybWlkaShkLTUpKzEyOwoKCWRlZ3JlZTJIeihkKSA9IEE0SHoqc2VtaXRvbihkZWdyZWUybWlkaShkKS02OSkgd2l0aCB7IHNlbWl0b24obikgPSAyLjBeKG4vMTIuMCk7IH07Cgp9OwoKLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tU3RyaW5nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQovLyBBIGthcnBsdXMtc3Ryb25nIHN0cmluZy4KLy8KLy8gVVNBR0U6IHN0cmluZyg0NDBIeiwgNHMsIDEuMCwgYnV0dG9uKCJwbGF5IikpCi8vIG9yCSAgYnV0dG9uKCJwbGF5IikgOiBzdHJpbmcoNDQwSHosIDRzLCAxLjApCi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KCnN0cmluZyhjb2VmLCBmcmVxLCB0NjAsIGxldmVsLCB0cmlnKSA9IG5vaXNlKmxldmVsCgkJCQkJCQk6ICoodHJpZyA6IHRyaWdnZXIoZnJlcTJzYW1wbGVzKGZyZXEpKSkKCQkJCQkJCTogcmVzb25hdG9yKGZyZXEyc2FtcGxlcyhmcmVxKSwgYXR0KQoJd2l0aCB7CgkJcmVzb25hdG9yKGQsYSkJPSAoKyA6IEAoZC0xKSkgfiAoYXZlcmFnZSA6ICooYSkpOwoJCWF2ZXJhZ2UoeCkJCT0gKHgqKDErY29lZikreCcqKDEtY29lZikpLzI7CgkJdHJpZ2dlcihuKSAJCT0gdXBmcm9udCA6ICsgfiBkZWNheShuKSA6ID4oMC4wKTsKCQl1cGZyb250KHgpIAkJPSAoeC14JykgPiAwLjA7CgkJZGVjYXkobix4KQkJPSB4IC0gKHg%2BMC4wKS9uOwoJCWZyZXEyc2FtcGxlcyhmKSA9IDQ0MTAwLjAvZjsKCQlhdHQgCQkJPSBwb3coMC4wMDEsMS4wLyhmcmVxKnQ2MCkpOyAvLyBhdHRlbnVhdGlvbiBjb2VmZmljaWVudAoJCXJhbmRvbSAgCQk9ICsoMTIzNDUpfiooMTEwMzUxNTI0NSk7CgkJbm9pc2UgICAJCT0gcmFuZG9tLzIxNDc0ODM2NDcuMDsKCX07Cg%3D%3D" target="_faust">Essayer &rarr;</a>


```faust
//-----------------------------------------------
// 		Kisana : 3-loops string instrument
//		(based on Karplus-Strong)
//
//-----------------------------------------------

declare name  	"Kisana";
declare author  "Yann Orlarey";

import("stdfaust.lib");

KEY = 60;	// basic midi key
NCY = 15; 	// note cycle length
CCY = 15;	// control cycle length
BPS = 360;	// general tempo (beat per sec)

//-------------------------------kisana----------------------------------
// USAGE:  kisana : _,_;
// 		3-loops string instrument
//-----------------------------------------------------------------------

process = hgroup("KISANA", harpe(C,11,60), harpe(C,11,72)  :> *(l),*(l) : par(i,2,ef.echo(1,0.25,E)))
	with {
		l = vslider("v:[62]CTRL/master[style:knob][acc: 1 3 -10 0 10]",-6, -60, 0, 0.01) : ba.db2linear : si.smoo; // Y: 0:plat -> vertical:10
		C = vslider("v:[62]CTRL/timbre[style:knob][acc: 0 3 -3 0 3]",0.5, 0.5, 0.98, 0.01) : si.smoo; // X: tourner gauche <-0-> droite
		E = vslider("v:[62]CTRL/echo[style:knob]",0, 0, 0.9, 0.01) : si.smoo; // tourner gauche <-> droite
	};

//----------------------------------Harpe--------------------------------
// USAGE:  harpe(C,10,60) : _,_;
//		C is the filter coefficient 0..1
// 		Build a N (10) strings harpe using a pentatonic scale
//		based on midi key b (60)
//		Each string is triggered by a specific
//		position of the "hand"
//-----------------------------------------------------------------------
harpe(C,N,b) = 	hand <: par(i, N, position(i+1)
							: string(C,Penta(b).degree2Hz(i), att, lvl)
							: pan((i+0.5)/N) )
				 	:> _,_
	with {
		att  = 4;
		hand = vgroup("[%b]LOOP %b", vslider("[1]note", 0, 0, N, 1) : int : ba.automat(360, 13, 0.0));
		lvl  = 1;
		pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p));
		position(a,x) = abs(x - a) < 0.5;
		db2linear(x)  = pow(10, x/20.0);

	};

//----------------------------------Penta-------------------------------
// Pentatonic scale with degree to midi and degree to Hz conversion
// USAGE: Penta(60).degree2midi(3) ==> 67 midikey
//        Penta(60).degree2Hz(4)   ==> 440 Hz
//-----------------------------------------------------------------------

Penta(key) = environment {

	A4Hz = 440;

	degree2midi(0) = key+0;
	degree2midi(1) = key+2;
	degree2midi(2) = key+4;
	degree2midi(3) = key+7;
	degree2midi(4) = key+9;
	degree2midi(d) = degree2midi(d-5)+12;

	degree2Hz(d) = A4Hz*semiton(degree2midi(d)-69) with { semiton(n) = 2.0^(n/12.0); };

};

//----------------------------------String-------------------------------
// A karplus-strong string.
//
// USAGE: string(440Hz, 4s, 1.0, button("play"))
// or	  button("play") : string(440Hz, 4s, 1.0)
//-----------------------------------------------------------------------

string(coef, freq, t60, level, trig) = noise*level
							: *(trig : trigger(freq2samples(freq)))
							: resonator(freq2samples(freq), att)
	with {
		resonator(d,a)	= (+ : @(d-1)) ~ (average : *(a));
		average(x)		= (x*(1+coef)+x'*(1-coef))/2;
		trigger(n) 		= upfront : + ~ decay(n) : >(0.0);
		upfront(x) 		= (x-x') > 0.0;
		decay(n,x)		= x - (x>0.0)/n;
		freq2samples(f) = 44100.0/f;
		att 			= pow(0.001,1.0/(freq*t60)); // attenuation coefficient
		random  		= +(12345)~*(1103515245);
		noise   		= random/2147483647.0;
	};
```
## Etape 4

Export de KISANA en PWA (Progressive Web App) :
<figure>
  <img src="qrc-kisana.png" alt="synth" width="75%"/>
  <figcaption>Scanner le QRCode depuis son smartphone.</figcaption>
</figure>

## Si vous voulez en savoir plus

- [Site officiel de Faust](https://faust.grame.fr)
- [Documentation de Faust](https://faustdoc.grame.fr)
- [Tutoriels en ligne](https://faustdoc.grame.fr/workshops/2020-04-10-faust-101/)
- [Cours Kadenze en ligne](https://www.kadenze.com/courses/real-time-audio-signal-processing-in-faust/info)
- [Réalisations](https://faust.grame.fr/community/powered-by-faust/)

