# SYFALA/FAUST WORKSHOP, 01/12/2023, INRIA LYON

## To follow the workshop : <a href="https://effractionmusicale.fr/syfala" >https://effractionmusicale.fr/syfala</a>


## Goal

The aim of this workshop is to introduce you to Faust, a programming language for creating electronic musical instruments. The workshop requires no prior knowledge of programming. During the workshop we will use an online tool, the Faust IDE, which will allow us to write and run our Faust programs directly in a Web browser. To access this tool, simply open the page <a href="https://faustide.grame.fr" target="_faust">https://faustide.grame.fr</a> from your browser.

## Step 1

A white noise generator with a slider to control the noise level.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnByb2Nlc3MgPSBuby5ub2lzZSAqIGhzbGlkZXIoIm5vaXNlIiwgMCwgMCwgMSwgMC4wMSk7Cg%3D%3D" target="_faust">TRY &rarr;</a>

```faust
import("stdfaust.lib");

process = no.noise * hslider("noise", 0, 0, 1, 0.01);

```


## Step 2

We add a resonator to filter the white noise.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnJlc29uKGQpID0gK34oQChkKTptZWFuKTsgCQkJLy8gPC0gSGVyZQptZWFuID0gKigwLjQ5OCkgPDogXywgbWVtIDo-IF87Cgpwcm9jZXNzID0gbm8ubm9pc2UgKiBoc2xpZGVyKCJub2lzZSIsIDAsIDAsIDEsIDAuMDEpIAoJCTogcmVzb24oNDAwKTsJCQkJLy8gPC0gSGVyZQo%3D" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean); 			// <- Here
mean = *(0.498) <: _, mem :> _;

process = no.noise * hslider("noise", 0, 0, 1, 0.01) 
		: reson(400);				// <- Here

```

## Step 3

We create a bank of resonators in parallel.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=CmltcG9ydCgic3RkZmF1c3QubGliIik7CgpyZXNvbihkKSA9ICt-KEAoZCk6bWVhbik7Cm1lYW4gPSAqKDAuNDk4KSA8OiBfLCBtZW0gOj4gXzsKCnByZXNvbihOLGQxLGQyKSA9IHBhcihpLCBOLCByZXNvbihkMSsoZDItZDEpKmkvKE4tMSkpKTsgCS8vIDwtIEhlcmUKCnByb2Nlc3MgPSBuby5ub2lzZSAqIGhzbGlkZXIoIm5vaXNlIiwgMCwgMCwgMSwgMC4wMSkgCgkJPDogcHJlc29uKDQsIDQwMCwgODApIAkvLyA8LSBIZXJlCgkJOj4gXyxfOwo%3D" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean);
mean = *(0.498) <: _, mem :> _;

preson(N,d1,d2) = par(i, N, reson(d1+(d2-d1)*i/(N-1))); 	// <- Here

process = no.noise * hslider("noise", 0, 0, 1, 0.01) 
		<: preson(4, 400, 80) 	// <- Here
		:> _,_;

```


# Step 4

To avoid saturation, we add a limiter.


<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnJlc29uKGQpID0gK34oQChkKTptZWFuKTsKbWVhbiA9ICooMC40OTgpIDw6IF8sIG1lbSA6PiBfOwoKcHJlc29uKE4sZDEsZDIpID0gcGFyKGksIE4sIHJlc29uKGQxKyhkMi1kMSkqaS8oTi0xKSkpOwoKcHJvY2VzcyA9IG5vLm5vaXNlICogaHNsaWRlcigibm9pc2UiLCAwLCAwLCAxLCAwLjAxKSAKCQk8OiBwcmVzb24oNCwgNDAwLCA4MCkgCgkJOj4gY28ubGltaXRlcl8xMTc2X1I0X3N0ZXJlbzsgCQkvLyA8LSBIZXJlCg%3D%3D" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean);
mean = *(0.498) <: _, mem :> _;

preson(N,d1,d2) = par(i, N, reson(d1+(d2-d1)*i/(N-1)));

process = no.noise * hslider("noise", 0, 0, 1, 0.01) 
		<: preson(4, 400, 80) 
		:> co.limiter_1176_R4_stereo; 		// <- Here

```
# Step 5

We add a panner to distribute the resonators in the stereo field.


<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnJlc29uKGQpID0gK34oQChkKTptZWFuKTsKbWVhbiA9ICooMC40OTgpIDw6IF8sIG1lbSA6PiBfOwoKcHJlc29uKE4sIGQxLCBkMikgPSBwYXIoaSwgTiwgcmVzb24oZDErKGQyLWQxKSppLyhOLTEpKSk7CgpwYW5uZXIgKGZ4KSA9IGZ4IDogcGFyKGksIE4sIHBhbihpLyhOLTEpKSkgOj4gXyxfICAJLy8gPC0gSGVyZQoJd2l0aCB7IAoJCU4gPSBvdXRwdXRzKGZ4KTsgCgkJcGFuKHApID0gXyA8OiAqKHNxcnQoMS1wKSksICooc3FydChwKSk7IAoJfTsKCnByb2Nlc3MgPSBuby5ub2lzZSAqIGhzbGlkZXIoIm5vaXNlIiwgMCwgMCwgMSwgMC4wMSkgCgkJPDogcGFubmVyKHByZXNvbig0LCA0MDAsIDgwKSkJCQkJLy8gPC0gSGVyZQoJCTogY28ubGltaXRlcl8xMTc2X1I0X3N0ZXJlbzsK" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean);
mean = *(0.498) <: _, mem :> _;

preson(N, d1, d2) = par(i, N, reson(d1+(d2-d1)*i/(N-1)));

panner (fx) = fx : par(i, N, pan(i/(N-1))) :> _,_  	// <- Here
	with { 
		N = outputs(fx); 
		pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p)); 
	};

process = no.noise * hslider("noise", 0, 0, 1, 0.01) 
		<: panner(preson(4, 400, 80))				// <- Here
		: co.limiter_1176_R4_stereo;

```


# Step 6

We add an enhancer to increase the gain of a resonator at a certain position in the stereo field.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnJlc29uKGQpID0gK34oQChkKTptZWFuKTsKbWVhbiA9ICooMC40OTgpIDw6IF8sIG1lbSA6PiBfOwoKcHJlc29uKE4sIGQxLCBkMikgPSBwYXIoaSwgTiwgcmVzb24oZDErKGQyLWQxKSppLyhOLTEpKSk7CgpwYW5uZXIgKGZ4KSA9IGZ4IDogcGFyKGksIE4sIHBhbihpLyhOLTEpKSkgOj4gXyxfIAoJd2l0aCB7IAoJCU4gPSBvdXRwdXRzKGZ4KTsgCgkJcGFuKHApID0gXyA8OiAqKHNxcnQoMS1wKSksICooc3FydChwKSk7IAoJfTsKCmVuaGFuY2VyKGZ4KSA9IGZ4IDogcGFyKGksIE4sICooMStnKnByb3goaSxwKihOLTEpKSkpCS8vIDwtIEhlcmUKCXdpdGggewoJCU4gPSBvdXRwdXRzKGZ4KTsKCQlnID0gaHNsaWRlcigiZ2FpbiIsIDAsIDAsIDUsIDAuMDEpOwoJCXAgPSBoc2xpZGVyKCJwb3MiLCAwLCAwLCAxLCAwLjAxKTsKCQlwcm94KHgseSkgPSAxIC0gbWluKDEsYWJzKHgteSkpOwoJfTsKCnByb2Nlc3MgPSBuby5ub2lzZSAqIGhzbGlkZXIoIm5vaXNlIiwgMCwgMCwgMSwgMC4wMSkgCgkJPDogcGFubmVyKGVuaGFuY2VyKHByZXNvbig0LCA0MDAsIDgwKSkpIAkJLy8gPC0gSGVyZQoJCTogY28ubGltaXRlcl8xMTc2X1I0X3N0ZXJlbzsK" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean);
mean = *(0.498) <: _, mem :> _;

preson(N, d1, d2) = par(i, N, reson(d1+(d2-d1)*i/(N-1)));

panner (fx) = fx : par(i, N, pan(i/(N-1))) :> _,_ 
	with { 
		N = outputs(fx); 
		pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p)); 
	};

enhancer(fx) = fx : par(i, N, *(1+g*prox(i,p*(N-1))))	// <- Here
	with {
		N = outputs(fx);
		g = hslider("gain", 0, 0, 5, 0.01);
		p = hslider("pos", 0, 0, 1, 0.01);
		prox(x,y) = 1 - min(1,abs(x-y));
	};

process = no.noise * hslider("noise", 0, 0, 1, 0.01) 
		<: panner(enhancer(preson(4, 400, 80))) 		// <- Here
		: co.limiter_1176_R4_stereo;

```

## Step 7

We add an LFO to modulate the noise level.

<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnJlc29uKGQpID0gK34oQChkKTptZWFuKTsKbWVhbiA9ICooMC40OTgpIDw6IF8sIG1lbSA6PiBfOwoKcHJlc29uKE4sIGQxLCBkMikgPSBwYXIoaSwgTiwgcmVzb24oZDErKGQyLWQxKSppLyhOLTEpKSk7CgpwYW5uZXIgKGZ4KSA9IGZ4IDogcGFyKGksIE4sIHBhbihpLyhOLTEpKSkgOj4gXyxfIAoJd2l0aCB7IAoJCU4gPSBvdXRwdXRzKGZ4KTsgCgkJcGFuKHApID0gXyA8OiAqKHNxcnQoMS1wKSksICooc3FydChwKSk7IAoJfTsKCmVuaGFuY2VyKGZ4KSA9IGZ4IDogcGFyKGksIE4sICooMStnKnByb3goaSxwKihOLTEpKSkpCgl3aXRoIHsKCQlOID0gb3V0cHV0cyhmeCk7CgkJZyA9IGhzbGlkZXIoImdhaW4iLCAwLCAwLCA1LCAwLjAxKTsKCQlwID0gaHNsaWRlcigicG9zIiwgMCwgMCwgMSwgMC4wMSk7CgkJcHJveCh4LHkpID0gMSAtIG1pbigxLGFicyh4LXkpKTsKCX07Cgptbz1saWJyYXJ5KCJsZm8uZHNwIik7CQkvLyA8LSBIZXJlCgpwcm9jZXNzID0gbm8ubm9pc2UgKiBtby5sZm8oMSkgKiBoc2xpZGVyKCJub2lzZSIsIDAsIDAsIDEsIDAuMDEpIAkJLy8gPC0gSGVyZQoJCTw6IHBhbm5lcihlbmhhbmNlcihwcmVzb24oNCwgNDAwLCA4MCkpKSAKCQk6IGNvLmxpbWl0ZXJfMTE3Nl9SNF9zdGVyZW87" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean);
mean = *(0.498) <: _, mem :> _;

preson(N, d1, d2) = par(i, N, reson(d1+(d2-d1)*i/(N-1)));

panner (fx) = fx : par(i, N, pan(i/(N-1))) :> _,_ 
	with { 
		N = outputs(fx); 
		pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p)); 
	};

enhancer(fx) = fx : par(i, N, *(1+g*prox(i,p*(N-1))))
	with {
		N = outputs(fx);
		g = hslider("gain", 0, 0, 5, 0.01);
		p = hslider("pos", 0, 0, 1, 0.01);
		prox(x,y) = 1 - min(1,abs(x-y));
	};

mo=library("lfo.dsp");		// <- Here

process = no.noise * mo.lfo(1) * hslider("noise", 0, 0, 1, 0.01) 		// <- Here
		<: panner(enhancer(preson(4, 400, 80))) 
		: co.limiter_1176_R4_stereo;

```

## Step 8

Final step, we add an echo for additional complexity.


<a href="https://faustide.grame.fr/?autorun=1&voices=0&name=untitled1&inline=aW1wb3J0KCJzdGRmYXVzdC5saWIiKTsKCnJlc29uKGQpID0gK34oQChkKTptZWFuKTsKbWVhbiA9ICooMC40OTgpIDw6IF8sIG1lbSA6PiBfOwoKcHJlc29uKE4sIGQxLCBkMikgPSBfIDw6IHBhcihpLCBOLCByZXNvbihkMSsoZDItZDEpKmkvKE4tMSkpKTsKCnBhbm5lciAoZngpID0gZnggOiBwYXIoaSwgTiwgcGFuKGkvKE4tMSkpKSA6PiBfLF8gCgl3aXRoIHsgCgkJTiA9IG91dHB1dHMoZngpOyAKCQlwYW4ocCkgPSBfIDw6ICooc3FydCgxLXApKSwgKihzcXJ0KHApKTsgCgl9OwoKZW5oYW5jZXIoZngpID0gZnggOiBwYXIoaSwgTiwgKigxK2cqcHJveChpLHAqKE4tMSkpKSkKCXdpdGggewoJCU4gPSBvdXRwdXRzKGZ4KTsKCQlnID0gaHNsaWRlcigiZ2FpbiIsIDAsIDAsIDUsIDAuMDEpOwoJCXAgPSBoc2xpZGVyKCJwb3MiLCAwLCAwLCAxLCAwLjAxKTsKCQlwcm94KHgseSkgPSAxIC0gbWluKDEsYWJzKHgteSkpOwoJfTsKCm1vPWxpYnJhcnkoImxmby5kc3AiKTsKCmVjaG8gPSBwYXIoaSwyLCArfihAKG1hLlNSKjQpOiooaHNsaWRlcigiZmVlZGJhY2siLCAwLjc1LDAsMSwwLjAxKSkpKTsJLy8gPC0gSGVyZQoKcHJvY2VzcyA9IG5vLm5vaXNlICogbW8ubGZvKDEpICogaHNsaWRlcigibm9pc2UiLCAwLCAwLCAxLCAwLjAxKSAKCQk6IHBhbm5lcihlbmhhbmNlcihwcmVzb24oNCwgNDAwLCA4MCkpKSAKCQk6IGVjaG8JCQkvLyA8LSBIZXJlCgkJOiBjby5saW1pdGVyXzExNzZfUjRfc3RlcmVvOw%3D%3D" target="_faust">TRY &rarr;</a>

```faust

import("stdfaust.lib");

reson(d) = +~(@(d):mean);
mean = *(0.498) <: _, mem :> _;

preson(N, d1, d2) = _ <: par(i, N, reson(d1+(d2-d1)*i/(N-1)));

panner (fx) = fx : par(i, N, pan(i/(N-1))) :> _,_ 
	with { 
		N = outputs(fx); 
		pan(p) = _ <: *(sqrt(1-p)), *(sqrt(p)); 
	};

enhancer(fx) = fx : par(i, N, *(1+g*prox(i,p*(N-1))))
	with {
		N = outputs(fx);
		g = hslider("gain", 0, 0, 5, 0.01);
		p = hslider("pos", 0, 0, 1, 0.01);
		prox(x,y) = 1 - min(1,abs(x-y));
	};

mo=library("lfo.dsp");

echo = par(i,2, +~(@(ma.SR*4):*(hslider("feedback", 0.75,0,1,0.01))));	// <- Here

process = no.noise * mo.lfo(1) * hslider("noise", 0, 0, 1, 0.01) 
		: panner(enhancer(preson(4, 400, 80))) 
		: echo			// <- Here
		: co.limiter_1176_R4_stereo;

```