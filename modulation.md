# Widget Modulation

L'objectif de la _widget Modulation_ est de permettre de moduler, par des signaux extérieurs, les éléments d'interface utilisateur d'un circuit sans avoir à en modifier le code. 

## Etape 1

Voici un oscillateur et un LFO qui ne peuvent pas vraiment communiquer entre eux :

	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = lfo(0) * osc(0);

On peut se servir du LFO pour moduler en amplitude le signal de sortie de l'oscillateur, mais on ne peut pas s'en servir pour moduler la fréquence de l'oscillateur !

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoJCQkJCglwcm9jZXNzID0gbGZvKDApICogb3NjKDApOwo%3D" target="_faust">Essayer &rarr;</a>


## Etape 2

Si l'on veut pouvoir moduler la fréquence de l'oscillateur, il faut modifier son code. On va créer une variante modulable de l'oscillateur :


	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 

	mosc(n,x) = hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1) * x)
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = lfo(0) : mosc(0);

Là, c'est facile. Mais dans le cas d'une bibliothèque existante, c'est plus compliqué et plus lourd !

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoKCW1vc2Mobix4KSA9IGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkgKiB4KQoJCQkJCTogKih2c2xpZGVyKCJnYWluW3N0eWxlOmtub2JdIiwgMCwgMCwgMSwgMC4wMSkpCgkJCQkpOyAKCQkJCQoJcHJvY2VzcyA9IGxmbygwKSA6IG1vc2MoMCk7Cg%3D%3D" target="_faust">Essayer &rarr;</a>


## Etape 3

L'intérêt de la _widget modulation_ est de permettre de faire cela sans modifier le code existant !

	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = lfo(0) : ["freq" -> osc(0)];

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoJCQkJCglwcm9jZXNzID0gbGZvKDApIDogWyJmcmVxIiAtPiBvc2MoMCldOwo%3D" target="_faust">Essayer &rarr;</a>


## Etape 4

On peut spécifier précisément la façon de combiner les signaux de modulation et de contrôle en indiquant le circuit à utiliser :

	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = lfo(0) : ["freq":* -> osc(0)];

Par défaut, le circuit de modulation est une multiplication.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoJCQkJCglwcm9jZXNzID0gbGZvKDApIDogWyJmcmVxIjoqIC0-IG9zYygwKV07Cg%3D%3D" target="_faust">Essayer &rarr;</a>


## Etape 5

On peut donner un circuit arbitrairement complexe de modulation :

	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = ["freq":*(lfo(0)) -> osc(0)];

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoJCQkJCglwcm9jZXNzID0gWyJmcmVxIjoqKGxmbygwKSkgLT4gb3NjKDApXTsK" target="_faust">Essayer &rarr;</a>


## Etape 6

On peut même remplacer le slider par un autre circuit :

	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = ["freq":440 -> osc(0)];

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoJCQkJCglwcm9jZXNzID0gWyJmcmVxIjo0NDAgLT4gb3NjKDApXTsK" target="_faust">Essayer &rarr;</a>


## Etape 7

Ou faire complètement disparaitre d'interface utilisateur et retrouver l'algorithme audio :

	import("stdfaust.lib");
	
	lfo(n) =    hgroup("LFO %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 1, 0.1, 800, 0.1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
					: +(1)
					: *(vslider("value[style:knob][scale:log]", 1, 0.1, 10, 0.1))
				); 

	osc(n) =    hgroup("OSC %2n", 
					os.osc(vslider("freq[style:knob][scale:log][unit:Hz]", 440, 20, 20000, 1))
					: *(vslider("gain[style:knob]", 0, 0, 1, 0.01))
				); 
				
	process = ["freq":440, "gain":0.25 -> osc(0)];


<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled2&inline=CWltcG9ydCgic3RkZmF1c3QubGliIik7CgkKCWxmbyhuKSA9ICAgIGhncm91cCgiTEZPICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCAxLCAwLjEsIDgwMCwgMC4xKSkKCQkJCQk6ICoodnNsaWRlcigiZ2FpbltzdHlsZTprbm9iXSIsIDAsIDAsIDEsIDAuMDEpKQoJCQkJCTogKygxKQoJCQkJCTogKih2c2xpZGVyKCJ2YWx1ZVtzdHlsZTprbm9iXVtzY2FsZTpsb2ddIiwgMSwgMC4xLCAxMCwgMC4xKSkKCQkJCSk7IAoKCW9zYyhuKSA9ICAgIGhncm91cCgiT1NDICUybiIsIAoJCQkJCW9zLm9zYyh2c2xpZGVyKCJmcmVxW3N0eWxlOmtub2JdW3NjYWxlOmxvZ11bdW5pdDpIel0iLCA0NDAsIDIwLCAyMDAwMCwgMSkpCgkJCQkJOiAqKHZzbGlkZXIoImdhaW5bc3R5bGU6a25vYl0iLCAwLCAwLCAxLCAwLjAxKSkKCQkJCSk7IAoJCQkJCglwcm9jZXNzID0gWyJmcmVxIjo0NDAsICJnYWluIjowLjI1IC0-IG9zYygwKV07Cg%3D%3D" target="_faust">Essayer &rarr;</a>

