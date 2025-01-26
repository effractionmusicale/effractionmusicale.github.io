# ATELIER FAUST -- LYCEE SIMONE WEIL

## Pour suivre : <a href="https://effractionmusicale.fr/weil" >https://effractionmusicale.fr/weil</a>

<img src="qrc-weil.png" alt="workshop" width="25%"/>


## Objectif

L'objectif de cet atelier est de vous initier à Faust, un langage de programmation permettant de créer des instruments de musique électroniques. L'atelier s'adresse à toutes et tous, et ne nécessite pas de connaissances préalables en programmation. 

Durant l'atelier, nous allons utiliser un outil en ligne, le Faust IDE, qui va nous permettre d'écrire et de faire fonctionner nos programmes Faust directement dans un navigateur Web. Pour accéder à cet outil, il suffit d'ouvrir la page <a href="https://faustide.grame.fr" target="_faust">https://faustide.grame.fr</a> depuis son navigateur.

Grâce à cet outil, nous allons créer, étape par étape, un petit synthétiseur musical que l'on pourra ensuite jouer soit directement depuis l'ordinateur, soit à partir d'un clavier MIDI, soit également depuis un smartphone. 

Nous terminerons l'atelier par une petite improvisation musicale collective, en utilisant l'instrument que nous aurons construit.

## Etape 0

Vérifier que le son fonctionne sur votre ordinateur.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled5&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKcHJvY2VzcyA9IGJhLnB1bHNlbigxLCAxMDAwMCkgOiBwbS5kamVtYmUoNjAsIDAuMywgMC40LCAxKSA8OiBkbS5mcmVldmVyYl9kZW1vOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;
```

## Etape 1

Baisser le volume; être en mode MONO !

<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7Cglwcm9jZXNzID0gb3Muc2F3dG9vdGgoNTApOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");
process = os.sawtooth(50);
```



## Etape 2

Ajout d'un contrôle de volume :

<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7Cglwcm9jZXNzID0gb3Muc2F3dG9vdGgoNTApCgkJCSogaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSk7" target="_faust">Essayer &rarr;</a>


```faust
import("stdfaust.lib");
process = os.sawtooth(50)
        * hslider("gain", 0.1, 0, 1, 0.01);
```

## Etape 3

Ajout d'un contrôle de fréquence :

<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7Cglwcm9jZXNzID0gb3Muc2F3dG9vdGgoaHNsaWRlcigiZnJlcSIsIDUwLCAzMCwgODAwMCwgMSkpCgkJCSogaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSk7" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");
process = os.sawtooth(hslider("freq", 50, 30, 8000, 1))
        * hslider("gain", 0.1, 0, 1, 0.01);
```


## Etape 4

Ajout d'un filtre résonnant :

<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7Cglwcm9jZXNzID0gb3Muc2F3dG9vdGgoaHNsaWRlcigiZnJlcSIsIDUwLCAzMCwgODAwMCwgMSkpCgkJCSogaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSkgOgoJZmkucmVzb25scCgzMDAsNSwxKTs%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");
process = os.sawtooth(hslider("freq", 50, 30, 8000, 1))
        * hslider("gain", 0.1, 0, 1, 0.01) :
fi.resonlp(300,5,1);
```

## Etape 5

Restructuration du code :


<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDgwMDAsIDEpOwoJZ2FpbiA9IGhzbGlkZXIoImdhaW4iLCAwLjEsIDAsIDEsIDAuMDEpOwoJCglwcm9jZXNzID0gb3Muc2F3dG9vdGgoZnJlcSkqZ2FpbiAKCQkJOiBmaS5yZXNvbmxwKDMwMCw1LDEpOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq = hslider("freq", 50, 30, 8000, 1);
gain = hslider("gain", 0.1, 0, 1, 0.01);

process = os.sawtooth(freq)*gain 
        : fi.resonlp(300,5,1);
```

## Etape 6

Oscillateur sur la fréquence de résonance :

<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDgwMDAsIDEpOwoJZ2FpbiA9IGhzbGlkZXIoImdhaW4iLCAwLjEsIDAsIDEsIDAuMDEpOwoJbGZvID0gb3MubGZfdHJpYW5nbGUoMC41KSowLjUrMC41OwoJCglwcm9jZXNzID0gb3Muc2F3dG9vdGgoZnJlcSkqZ2FpbiAKCQkJOiBmaS5yZXNvbmxwKGxmbyozMDArNTAsNSwxKTs%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq = hslider("freq", 50, 30, 8000, 1);
gain = hslider("gain", 0.1, 0, 1, 0.01);
lfo  = os.lf_triangle(0.5)*0.5+0.5;

process = os.sawtooth(freq)*gain 
        : fi.resonlp(lfo*300+50,5,1);
```

## Etape 7

Oscillateur sur la fréquence de résonance, ajout de contrôles sur le lfo :


<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDgwMDAsIDEpOwoJZ2FpbiA9IGhzbGlkZXIoImdhaW4iLCAwLjEsIDAsIDEsIDAuMDEpOwoJbGZyZXEgPSBoc2xpZGVyKCJsZnJlcSIsMC41LDAuMDEsNTAsMC4wMSk7CglscmFuZ2UgPSBoc2xpZGVyKCJscmFuZ2UiLDMwMCwxMCw1MDAwLDAuMDEpOwoKCWxmbyA9IG9zLmxmX3RyaWFuZ2xlKGxmcmVxKSowLjUrMC41OwoJCglwcm9jZXNzID0gb3Muc2F3dG9vdGgoZnJlcSkqZ2FpbiAKCQkJOiBmaS5yZXNvbmxwKGxmbypscmFuZ2UrNTAsNSwxKTs%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq   = hslider("freq", 50, 30, 8000, 1);
gain   = hslider("gain", 0.1, 0, 1, 0.01);
lfreq  = hslider("lfreq",0.5,0.01,50,0.01);
lrange = hslider("lrange",300,10,5000,0.01);

lfo = os.lf_triangle(lfreq)*0.5+0.5;

process = os.sawtooth(freq)*gain 
        : fi.resonlp(lfo*lrange+50,5,1);
```


## Etape 8

Production d'un son stéréo :

<a href="https://faustide.grame.fr/?autorun=0&voices=0&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDUwMCwgMSk7CglnYWluID0gaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSk7CgoJbGZyZXEgPSBoc2xpZGVyKCJsZnJlcSIsMC41LDAuMDEsNTAsMC4wMSk7CglscmFuZ2UgPSBoc2xpZGVyKCJscmFuZ2UiLDMwMCwxMCw1MDAwLDAuMDEpOwoJbGZvMSA9IG9zLmxmX3RyaWFuZ2xlKGxmcmVxKSowLjUrMC41OwoJbGZvMiA9IG9zLmxmX3RyaWFuZ2xlKGxmcmVxKjEuMDEpKjAuNSswLjU7CgkKCXByb2Nlc3MgPSBvcy5zYXd0b290aChmcmVxKSpnYWluIAoJCQk8OiAJZmkucmVzb25scChsZm8xKmxyYW5nZSs1MCw1LDEpLCAKCQkJCWZpLnJlc29ubHAobGZvMipscmFuZ2UrNTAsNSwxKTsg" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq = hslider("freq", 50, 30, 500, 1);
gain = hslider("gain", 0.1, 0, 1, 0.01);

lfreq = hslider("lfreq",0.5,0.01,50,0.01);
lrange = hslider("lrange",300,10,5000,0.01);
lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;

process = os.sawtooth(freq)*gain 
        <: fi.resonlp(lfo1*lrange+50,5,1), 
           fi.resonlp(lfo2*lrange+50,5,1); 
```

## Etape 9

Pilotage à partir d'un clavier MIDI (Poly 16) :

<a href="https://faustide.grame.fr/?autorun=0&voices=8&name=untitled&inline=CglpbXBvcnQoInN0ZGZhdXN0LmxpYiIpOwoKCWZyZXEgPSBoc2xpZGVyKCJmcmVxIiwgNTAsIDMwLCA1MDAsIDEpOwoJZ2FpbiA9IGhzbGlkZXIoImdhaW4iLCAwLjEsIDAsIDEsIDAuMDEpOwoJZ2F0ZSA9IGJ1dHRvbigiZ2F0ZSIpOwoKCWxmcmVxID0gaHNsaWRlcigibGZyZXEiLDAuNSwwLjAxLDUwLDAuMDEpOwoJbHJhbmdlID0gaHNsaWRlcigibHJhbmdlIiwzMDAsMTAsNTAwMCwwLjAxKTsKCWxmbzEgPSBvcy5sZl90cmlhbmdsZShsZnJlcSkqMC41KzAuNTsKCWxmbzIgPSBvcy5sZl90cmlhbmdsZShsZnJlcSoxLjAxKSowLjUrMC41OwoJCglwcm9jZXNzID0gb3Muc2F3dG9vdGgoZnJlcSkqZ2FpbipnYXRlIAoJCQk8OiAJZmkucmVzb25scChsZm8xKmxyYW5nZSs1MCw1LDEpLCAKCQkJCWZpLnJlc29ubHAobGZvMipscmFuZ2UrNTAsNSwxKTsg" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq = hslider("freq", 50, 30, 500, 1);
gain = hslider("gain", 0.1, 0, 1, 0.01);
gate = button("gate");

lfreq = hslider("lfreq",0.5,0.01,50,0.01);
lrange = hslider("lrange",300,10,5000,0.01);
lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;

process = os.sawtooth(freq)*gain*gate 
        <: fi.resonlp(lfo1*lrange+50,5,1), 
           fi.resonlp(lfo2*lrange+50,5,1); 
```

## Etape 10

Ajout d'un limiteur pour éviter les clics :

<a href="https://faustide.grame.fr/?autorun=0&voices=8&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDUwMCwgMSk7CglnYWluID0gaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSk7CglnYXRlID0gYnV0dG9uKCJnYXRlIik7CgoJbGZyZXEgPSBoc2xpZGVyKCJsZnJlcSIsMC41LDAuMDEsNTAsMC4wMSk7CglscmFuZ2UgPSBoc2xpZGVyKCJscmFuZ2UiLDMwMCwxMCw1MDAwLDAuMDEpOwoJbGZvMSA9IG9zLmxmX3RyaWFuZ2xlKGxmcmVxKSowLjUrMC41OwoJbGZvMiA9IG9zLmxmX3RyaWFuZ2xlKGxmcmVxKjEuMDEpKjAuNSswLjU7CgkKCXByb2Nlc3MgPSBvcy5zYXd0b290aChmcmVxKSpnYWluKmdhdGUgCgkJCTw6ICBmaS5yZXNvbmxwKGxmbzEqbHJhbmdlKzUwLDUsMSksIAoJCQkJZmkucmVzb25scChsZm8yKmxyYW5nZSs1MCw1LDEpOyAKCgllZmZlY3QgPSBjby5saW1pdGVyXzExNzZfUjRfc3RlcmVvOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq = hslider("freq", 50, 30, 500, 1);
gain = hslider("gain", 0.1, 0, 1, 0.01);
gate = button("gate");

lfreq = hslider("lfreq",0.5,0.01,50,0.01);
lrange = hslider("lrange",300,10,5000,0.01);
lfo1 = os.lf_triangle(lfreq)*0.5+0.5;
lfo2 = os.lf_triangle(lfreq*1.01)*0.5+0.5;

process = os.sawtooth(freq)*gain*gate 
        <: fi.resonlp(lfo1*lrange+50,5,1), 
           fi.resonlp(lfo2*lrange+50,5,1); 

effect = co.limiter_1176_R4_stereo;
```

## Etape 11

Ajout de contrôles MIDI :


<a href="https://faustide.grame.fr/?autorun=0&voices=8&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDUwMCwgMSk7CglnYWluID0gaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSk7CglnYXRlID0gYnV0dG9uKCJnYXRlIik7CgoJbGZyZXEgPSBoc2xpZGVyKCJsZnJlcSIsMC41LDAuMDEsNTAsMC4wMSk7CglscmFuZ2UgPSBoc2xpZGVyKCJscmFuZ2VbbWlkaTpjdHJsIDQ5XSIsMzAwLDEwLDUwMDAsMC4wMSk7CglsZm8xID0gb3MubGZfdHJpYW5nbGUobGZyZXEpKjAuNSswLjU7CglsZm8yID0gb3MubGZfdHJpYW5nbGUobGZyZXEqMS4wMSkqMC41KzAuNTsKCQoJcHJvY2VzcyA9IG9zLnNhd3Rvb3RoKGZyZXEpKmdhaW4qZ2F0ZSAKCQkJPDogCWZpLnJlc29ubHAobGZvMSpscmFuZ2UrNTAsNSwxKSwgCgkJCQlmaS5yZXNvbmxwKGxmbzIqbHJhbmdlKzUwLDUsMSk7IAoKCWVmZmVjdCA9IGNvLmxpbWl0ZXJfMTE3Nl9SNF9zdGVyZW87" target="_faust">Essayer &rarr;</a>

```faust
import("stdfaust.lib");

freq = hslider("freq", 50, 30, 500, 1);
gain = hslider("gain", 0.1, 0, 1, 0.01);
gate = button("gate");

lfreq  = hslider("lfreq",0.5,0.01,50,0.01);
lrange = hslider("lrange[midi:ctrl 49]",300,10,5000,0.01);
lfo1   = os.lf_triangle(lfreq)*0.5+0.5;
lfo2   = os.lf_triangle(lfreq*1.01)*0.5+0.5;

process = os.sawtooth(freq)*gain*gate 
        <: fi.resonlp(lfo1*lrange+50,5,1), 
           fi.resonlp(lfo2*lrange+50,5,1); 

effect = co.limiter_1176_R4_stereo;
```

## Etape 12

Ajout d'une enveloppe et d'un volume :


<a href="https://faustide.grame.fr/?autorun=0&voices=8&name=untitled&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CglmcmVxID0gaHNsaWRlcigiZnJlcSIsIDUwLCAzMCwgNTAwLCAxKTsKCWdhaW4gPSBoc2xpZGVyKCJnYWluIiwgMC4xLCAwLCAxLCAwLjAxKTsKCWdhdGUgPSBidXR0b24oImdhdGUiKSA6IGVuLmFkc3IoMC4xLCAwLjIsIDAuOCwgMik7Cgl2b2x1bWUgPSBoc2xpZGVyKCJ2b2x1bWVbbWlkaTpjdHJsIDQ4XSIsMC42LDAsMSwwLjAxKTsKCglsZnJlcSA9IGhzbGlkZXIoImxmcmVxIiwwLjUsMC4wMSw1MCwwLjAxKTsKCWxyYW5nZSA9IGhzbGlkZXIoImxyYW5nZVttaWRpOmN0cmwgNDldIiwzMDAsMTAsNTAwMCwwLjAxKTsKCWxmbzEgPSBvcy5sZl90cmlhbmdsZShsZnJlcSkqMC41KzAuNTsKCWxmbzIgPSBvcy5sZl90cmlhbmdsZShsZnJlcSoxLjAxKSowLjUrMC41OwoJCglwcm9jZXNzID0gb3Muc2F3dG9vdGgoZnJlcSkqZ2FpbipnYXRlIAoJCQk8OiAJZmkucmVzb25scChsZm8xKmxyYW5nZSs1MCw1LDEpLCAKCQkJCWZpLnJlc29ubHAobGZvMipscmFuZ2UrNTAsNSwxKTsgCgllZmZlY3QgPSBjby5saW1pdGVyXzExNzZfUjRfc3RlcmVvOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
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
        <: fi.resonlp(lfo1*lrange+50,5,1), 
           fi.resonlp(lfo2*lrange+50,5,1); 
	effect = co.limiter_1176_R4_stereo;
```

## Etape 13 (Keyboard version)

Ajout d'un écho, la vélocité contrôle en partie le lrange :

<a href="https://faustide.grame.fr/?autorun=0&voices=8&name=untitled&inline=CWRlY2xhcmUgbmFtZSAiV2Fob28iOwoKICAgIGltcG9ydCgic3RkZmF1c3QubGliIik7CglmcmVxID0gaHNsaWRlcigiZnJlcSIsIDUwLCAzMCwgNTAwLCAxKTsKCWdhaW4gPSBoc2xpZGVyKCJnYWluIiwgMC4xLCAwLCAxLCAwLjAxKTsKCWdhdGUgPSBidXR0b24oImdhdGUiKSA6IGVuLmFkc3IoMC4xLCAwLjIsIDAuOCwgMikgOwoJdm9sdW1lID0gaHNsaWRlcigidm9sdW1lIiwwLjYsMCwxLDAuMDEpOwoKCWxmcmVxID0gaHNsaWRlcigibGZyZXFbbWlkaTpjdHJsIDQ4XSIsMC41LDAuMDEsNCwwLjAxKTsKCWxyYW5nZSA9IGhzbGlkZXIoImxyYW5nZVttaWRpOmN0cmwgNDldIiwzMDAsMjAsNTAwMCwwLjAxKSAqICgxKzIqZ2Fpbik7CglsZm8xID0gb3MubGZfdHJpYW5nbGUobGZyZXEpKjAuNSswLjU7CglsZm8yID0gb3MubGZfdHJpYW5nbGUobGZyZXEqMS4wMSkqMC41KzAuNTsKCQoJcHJvY2VzcyA9IG9zLnNhd3Rvb3RoKGZyZXEpKmdhaW4qZ2F0ZSAKCQkJPDogCWZpLnJlc29ubHAobGZvMSpscmFuZ2UrNTAsNSwxKSp2b2x1bWUsIAoJCQkJZmkucmVzb25scChsZm8yKmxyYW5nZSs1MCw1LDEpKnZvbHVtZTsgCgoJZWZmZWN0IAk9IHBhcihpLDIsZWYuZWNobygxLDAuMjUsIDAuNzUpKSAKCQkJOiBjby5saW1pdGVyXzExNzZfUjRfc3RlcmVvOw%3D%3D" target="_faust">Essayer &rarr;</a>

```faust
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
        <: fi.resonlp(lfo1*lrange+50,5,1)*volume, 
           fi.resonlp(lfo2*lrange+50,5,1)*volume; 

effect 	= par(i,2,ef.echo(1,0.25, 0.75)) 
        : co.limiter_1176_R4_stereo;
```

## Etape 14 (Android version)

Metadata acc ajoutées aux LFOs pour les contrôler via les accéléromètres du smartphone :

<a href="https://faustide.grame.fr/?autorun=0&voices=8&name=untitled&inline=CWRlY2xhcmUgbmFtZSAiV2Fob28iOwoKCS8vIHZlcnNpb24gcG91ciBhbmRyb2lkCiAgICBpbXBvcnQoInN0ZGZhdXN0LmxpYiIpOwoJZnJlcSA9IGhzbGlkZXIoImZyZXEiLCA1MCwgMzAsIDUwMCwgMSk7CglnYWluID0gaHNsaWRlcigiZ2FpbiIsIDAuMSwgMCwgMSwgMC4wMSk7CglnYXRlID0gYnV0dG9uKCJnYXRlIikgOiBlbi5hZHNyKDAuMSwgMC4yLCAwLjgsIDIpIDsKCXZvbHVtZSA9IGhzbGlkZXIoInZvbHVtZSIsMC42LDAsMSwwLjAxKTsKCglsZnJlcSA9IGhzbGlkZXIoImxmcmVxW2FjYzogMCAzIC0xMCAwIDEwXSIsMC41LDAuMDEsNCwwLjAxKTsKCWxyYW5nZSA9IGhzbGlkZXIoImxyYW5nZVthY2M6IDEgMyAtMTAgMCAxMF0iLDMwMCwxMCw1MDAwLDAuMDEpICogKDErZ2Fpbik7CglsZm8xID0gb3MubGZfdHJpYW5nbGUobGZyZXEpKjAuNSswLjU7CglsZm8yID0gb3MubGZfdHJpYW5nbGUobGZyZXEqMS4wMSkqMC41KzAuNTsKCQoJcHJvY2VzcyA9IG9zLnNhd3Rvb3RoKGZyZXEpKmdhaW4qZ2F0ZSAKCQkJPDogCWZpLnJlc29ubHAobGZvMSpscmFuZ2UrNTAsNSwxKSp2b2x1bWUsIAoJCQkJZmkucmVzb25scChsZm8yKmxyYW5nZSs1MCw1LDEpKnZvbHVtZSAKICAgICAgICAgICAgOiBlZmZlY3Q7IAoKCWVmZmVjdCAJPSBwYXIoaSwyLGVmLmVjaG8oMSwwLjI1LCAwLjc1KSkgCgkJCTogY28ubGltaXRlcl8xMTc2X1I0X3N0ZXJlbzs%3D" target="_faust">Essayer &rarr;</a>

```faust
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
        <: fi.resonlp(lfo1*lrange+50,5,1)*volume, 
           fi.resonlp(lfo2*lrange+50,5,1)*volume 
        : effect; 

effect 	= par(i,2,ef.echo(1,0.25, 0.75)) 
        : co.limiter_1176_R4_stereo;
```


## Installer l'application sur Android

L'application pour Android est disponible [ici](https://effractionmusicale.fr/wahoo.apk) ou via le QR code ci-dessous :

<img src="qrc-wahoo-apk.png" alt="drawing" width="25%"/>

L'application native n'est pas disponible pour iOS. Il faut donc utiliser la version Web préalablement créée.
