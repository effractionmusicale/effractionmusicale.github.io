# Atelier Faust — IEEE IS2 2026

**Composer des programmes : la modularité du langage Faust**

Yann Orlarey, EMERAUDE (INRIA/INSA/GRAME) — 7th IEEE International Symposium on the Internet of Sounds, Campus Georges Méliès, Cannes, jeudi 30 octobre 2026, 15 h 15–16 h 15.

Cette page rassemble les slides et tous les exemples de l'atelier. Chaque exemple s'ouvre dans **faustcode**, un environnement Faust qui tourne entièrement dans le navigateur, sur ordinateur ou sur téléphone : le code est inclus dans le lien, rien à installer.

---

## Les slides

Les slides de l'atelier (en français, version anglaise à venir) sont disponibles [ici](https://effractionmusicale.fr/20261030-faust-IS2.pdf).

---

## faustcode

Pour écrire et jouer du Faust pendant l'atelier, ouvrez <a href="https://orlarey.github.io/faustcode/" target="_faust">https://orlarey.github.io/faustcode/</a> sur votre ordinateur, ou scannez ce QR code avec votre téléphone :

<img src="is2/qr-faustcode.png" alt="QR code faustcode" width="30%"/>

Pas besoin d'écouteurs : nous jouerons ensemble, sur les haut-parleurs de vos appareils.

**iPhone** : faustcode n'a pas encore été testé sur iPhone. Pour jouer, utilisez de préférence les applications web Wahoo et Kisana, plus bas sur cette page.

---

## Un premier programme

Un oscillateur dont on règle la fréquence. Le programme se lit comme le circuit : slider `:` oscillateur `:` gain.

```faust
import("stdfaust.lib");
process = hslider("freq", 440, 50, 2000, 1) : os.osc : *(0.2);
```

<a href="https://orlarey.github.io/faustcode/?code=DYvLCoAgEADvfcWyJw0RE7sUfUz5IMHQXPv_9jDDXCY_rfYhkEZI50dDl3yh3KfWq49EcMBNJYfYBaYeX1TgnFGwMtYY9iJhg0q6kueYhdGW9x8&name=premier&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

---

## Wahoo

Une scie, deux filtres résonants modulés par des LFO, un écho et un limiteur : un instrument en 20 lignes. Sur téléphone, inclinez l'appareil : la métadonnée `[acc: …]` relie deux sliders aux accéléromètres.

```faust
declare name "Wahoo";
import("stdfaust.lib");

freq   = hslider("freq", 50, 30, 500, 1);
gain   = hslider("gain", 0.1, 0, 1, 0.01);
gate   = button("gate") : en.adsr(0.1, 0.2, 0.8, 2);
volume = hslider("volume", 0.6, 0, 1, 0.01);

lfreq  = hslider("lfreq[acc: 0 3 -10 0 10]", 0.5, 0.01, 4, 0.01);
lrange = hslider("lrange[acc: 1 3 -10 0 10]", 300, 10, 5000, 0.01) * (1+gain);
lfo1   = os.lf_triangle(lfreq)*0.5 + 0.5;
lfo2   = os.lf_triangle(lfreq*1.01)*0.5 + 0.5;

process = os.sawtooth(freq)*gain*gate
        <: fi.resonlp(lfo1*lrange+50, 5, 1)*volume,
           fi.resonlp(lfo2*lrange+50, 5, 1)*volume
        : effect;

effect = par(i, 2, ef.echo(1, 0.25, 0.75)) : co.limiter_1176_R4_stereo;
```

<a href="https://orlarey.github.io/faustcode/?code=dVLBbsMgDL3nK6ycSJpF0Dbt1G4_scsO0xTRhDRINGRAt9-fDVXVVioHQ5z3nh82veqMdAomeVKQf8rR2nyf6dNsXWC5D_0gzz7URh_yYp9lg1M_APAOoze6V47llMkraHgFK047BoHQo9TTPZIyiOS1wIAgOvIEDSpCD-cQ7ETIoPICdqCmWvbescSplxReK1gi6deaM1q-0U-ZWGHzUCEzyfgNOma-ZNftgMMKXgTHXfDvyG8Ss4L1VcI4OR3v6qVMkhAPEqvYhtQPftGAEphYUBdIbrAi3tn62gxtcBrFjGLRVlGiBViQkYhcPkWWgpRv4dnsbKe8TwQv_4K1YWRJloqX1N0MLuttB4OunfJ2MjMjV2W614Im2tAsy9TY6srBdc9ZPuNcKTjKYVBdQH_pgPZm6ZjGYVb4r1bdaFkacmz-tinoAXQWn95JB-VaIbab9mPdevxQdp_9Aw&name=wahoo&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

La même source existe en application web, qui fonctionne sur tous les téléphones : <a href="https://effractionmusicale.fr/wahoo" target="_faust">https://effractionmusicale.fr/wahoo</a>

<img src="is2/qr-wahoo.png" alt="QR code Wahoo" width="30%"/>

---

## Réécriture : des règles qui fabriquent des circuits

Faust permet de définir des fonctions par des règles, évaluées à la compilation, qui filtrent la structure des circuits. Ici, une composition parallèle est transformée en composition séquentielle :

```faust
import("stdfaust.lib");
serial((x,xs)) = x : serial(xs);
serial(x) = x;
process = serial((fi.lowpass(2,2000), fi.highpass(2,200), *(0.5)));
```

<a href="https://orlarey.github.io/faustcode/?code=RczdCoMwDAXge58ieJVIKUXYjeLDdP7MQEdLU7GPvyBzu8x3zgm_U8wFWynL5g8pNvCzpbGRNbMPiNVUIYIJKgzwRZVfoV7Z2KQc51VEj3u5sQ3xTF4Ee9M758iA2s6v_Y9qHTr7INKXHw&name=serial&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

La FFT radix 2 de Julius Smith (`analyzers.lib`) s'écrit en deux règles. Pour `N` fixé, le compilateur déplie la récursion et il ne reste que les papillons :

```faust
// FFT radix 2 de Julius Smith (analyzers.lib), réduite à ses règles
import("stdfaust.lib");
fftb(1) = _,_;
fftb(N) = si.cbus(N) : (fftb(No2) <: (si.cbus(No2), si.cbus(No2))), (fftb(No2)
        <: (si.cbus(N) : twiddleOdd(N))) :> si.cbus(N)
with {
  No2 = int(N)>>1;
  twiddleOdd(N) = par(k, N, si.cmul(cos(w(k)), 0-sin(w(k))))
  with { w(k) = 2.0*ma.PI*float(k)/float(N); };
};
process = fftb(4);
```

<a href="https://orlarey.github.io/faustcode/?code=VZBNTsMwEIX3OcWoK7sKSRuxIpBlJVgEJNhXTuyAVSeOPLbCj7gLSzhHL8aYVKW1vPD3PG_8xnkOm80TOCH1KxQgFdwFowPCY6_9CzAxCPP2rhxmRjc8Bbf_kUF7BfsvQIXE389GYaL70TrPFuhlJwL6WL7gZdJ1vmFrDjewTbcHrCOiztomYIQrYLNuCw7XRMc7ElI4JU78X5zAYZ2ZYkM_aSmNupeSmJNSnTyYTHG0D3JTE4qiB09qVa1Lks6cdDkKx3Yp1HOOPhjWWmQT28UoqwvUwww8ppkbQxTIWmSrZS-yh9tlZ6zwJObzoeYlfJYJ7dHZViFS8d9Ql_Rjvw&name=fft&view=svg" target="_faust">Ouvrir dans faustcode (vue diagramme) &rarr;</a>

---

## Composer des programmes

En Faust, un programme complet est un circuit comme un autre : deux programmes se composent dans un troisième, comme des commandes Unix avec `|`. Avec des fichiers séparés, on écrit `component("synth.dsp") : component("echo.dsp")`. Dans un seul fichier, chaque programme devient un `environment` :

```faust
import("stdfaust.lib");

synth = environment {
  freq = hslider("freq", 220, 50, 1000, 1);
  process = os.sawtooth(freq) * 0.2;
};

echo = environment {
  d  = hslider("delay", 0.25, 0, 1, 0.01);
  fb = hslider("feedback", 0.5, 0, 0.95, 0.01);
  process = + ~ (de.delay(ma.SR, d*ma.SR) * fb);
};

process = synth.process : echo.process;
```

<a href="https://orlarey.github.io/faustcode/?code=bZBBDoIwEEX3PcWEVVHSVBIWSryEnqDQIRCBYls1xOjZnUIImrjoZH7zZ97PNN1grOeR87pSN-dF2xRRnDPmxt7XcATs7401fYe9hycDqCxe6bt2baPR8ijoKIE0lQlk9HZShkorAAZrSnSO7MYJpx7eGF_zMBHDBqRIc_YiFJa1-UPS8M3R2KqRQDSVUSVE6OUMqoqfSIi6UOVlcs9mKfbZl38NtoU3cI1iWs87Jc6nBPRmakLIqojnkOvIdBmx6AOE-IvM2Qc&name=1-composition&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

<img src="is2/qr-1-composition.png" alt="QR code composition" width="30%"/>

---

## Personnaliser sans modifier

La substitution explicite `[...]` redéfinit une définition interne d'un programme sans toucher à son code. Ici, le slider `freq` est remplacé par un LFO :

```faust
import("stdfaust.lib");

synth = environment {
  freq = hslider("freq", 220, 50, 1000, 1);
  process = os.sawtooth(freq) * 0.2;
};

echo = environment {
  d  = hslider("delay", 0.25, 0, 1, 0.01);
  fb = hslider("feedback", 0.5, 0, 0.95, 0.01);
  process = + ~ (de.delay(ma.SR, d*ma.SR) * fb);
};

process = synth[freq = 110 + 50*os.osc(0.5);].process : echo.process;
```

<a href="https://orlarey.github.io/faustcode/?code=bZDBboMwDIbveQqLU2AoCkgcOrSXaI_TDoEYgQqExWmnamqffQ6saiftEMuOfvv77WFanA8yoWA7c6KgxqFJ0loIusyhhzfA-Tx4N084B_gWAJ3HT_7uaRwsepnEOsmhLHUOFb9C6xh5BMDiXYtELHekyHwF50IvY0cKGWhV1uLKKGx79w_JwjPH4mguDOKuiiMjYq43UNf8sYRoG9MeV_Um1mpXPekfxl7gBtKiWsfLyajDPgebrUk02TXpZvLRsl7m_fcORaF5RqUz3tBRKxmY1h_qrn6FuNy9rMUP&name=2-substitution&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

Quatre copies du même programme, chacune réglée sur un harmonique : une synthèse additive en une ligne.

```faust
import("stdfaust.lib");

synth = environment {
  freq = hslider("freq", 220, 50, 1000, 1);
  process = os.sawtooth(freq) * 0.2;
};

echo = environment {
  d  = hslider("delay", 0.25, 0, 1, 0.01);
  fb = hslider("feedback", 0.5, 0, 0.95, 0.01);
  process = + ~ (de.delay(ma.SR, d*ma.SR) * fb);
};

process = par(i, 4, synth[freq = 110*(i+1);].process) :> echo.process;
```

<a href="https://orlarey.github.io/faustcode/?code=bZDBboMwDIbveQqLU6BRFNA4bGh7iO1Y7RCIEVGBsCRbVVXds8-BTu2kHWLZ1m9_f2ynxfnIsxBNrz9DlKNts7xhLJzmOMAz4PxlvZsnnCOcGUDv8YPaQxitQc-zVGcCqkoJqOmVSqVIKwAW7zoMgeQuyKCP0bk48DSRQwFKVg27EAq7wf1DMnDPMTjqE4FoqqZIiJSrDdS3fywhmlZ3h1W9iZV8rO_0N2M7-AZuUK7r-aTl26sAU6xJMtm3-WbyNrJoz62ABwHrjfbXi5SlKrjdEeBdXsU5PL1A-t1vo2E_&name=3-additif&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

---

## La widget modulation

`["freq":*(lfo) -> C]` module le slider `freq` d'un circuit `C` depuis l'extérieur, sans modifier son code :

```faust
import("stdfaust.lib");

synth = environment {
  freq = hslider("freq", 220, 50, 1000, 1);
  process = os.sawtooth(freq) * 0.2;
};

echo = environment {
  d  = hslider("delay", 0.25, 0, 1, 0.01);
  fb = hslider("feedback", 0.5, 0, 0.95, 0.01);
  process = + ~ (de.delay(ma.SR, d*ma.SR) * fb);
};

lfo = 1 + 0.5*os.osc(hslider("lfo", 3, 0.1, 20, 0.1));
process = ["freq":*(lfo) -> synth.process] : echo.process;
```

<a href="https://orlarey.github.io/faustcode/?code=bZDBTsQgEIbvPMWkJ6hdQmt6cBv3IfRoPNAypI1tWQE1G6PP7kDVXRMPTGbgn_l-ZlqOzkdehGisfglRzlNfiI6xcFrjCLeA6-vk3brgGuGdAViPz3Q9hnky6HmR6qKCplEVtHRqpVKkEQBH7wYMgeQuyKDfonNx5KlDQAlKNh37IBQOo_uHZOCSY3DWJwJRV0uREClXG8j2fywhml4PT1m9iZW8aS_0Z2NX8AncoMzj-aLl_V0FpsxJMml7sZmcbfJYUwPNLOk_Lgz8F0mvRLtOCPLVZGItqPVMethWtS85iQXsDpBXLL8Vj7CHtIifumNf&name=4-modulation&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

L'atelier complet sur la widget modulation, en 7 étapes : <a href="https://effractionmusicale.fr/modulation" target="_faust">https://effractionmusicale.fr/modulation</a>

---

## Démo : une IA, un DSL et une corne de brume

Claude Code, connecté à faustcode par son serveur MCP, cherche à reproduire en Faust l'enregistrement d'une corne de brume. Un modèle de langage n'entend pas : il travaille par mesures (enveloppe par phase, f₀, harmoniques, rapport harmoniques/bruit), compare son rendu à la cible à chaque étape, et demande l'oreille humaine quand il en a besoin.

La consigne donnée à l'IA :

> Model this foghorn in Faust using the faustcode MCP. Do not fall into the trap of static additive synthesis — instead, faithfully reproduce the full spectral evolution, especially during the attack that gives a ship's foghorn its brassy, broad, and very present sound. Work by measurement: first extract the target's characteristics (envelope by phase, f₀ with sub-harmonic correction, harmonic profile, HNR, roughness), then iterate by comparing your rendering to the target on these same metrics at every step. Decide on the synthesis approach based on what the measurements say, and let me know when you need my ear.

La version obtenue lors de la démo à l'IFC 2026 (appuyer sur `gate` pour la faire sonner) :

<a href="https://orlarey.github.io/faustcode/?code=pVbNbttGEL7rKQY-tPwTvaRESbabAApqwIfGQR33FAjCilxZ25BcZpdU0hyCPkQfoFdd0ofQm_RJOrNL2ZKDnmIYlDScb-bbmdlvV1aN0q13ZtpizTvTxqVcnflXg8H5Obz4jj_Cw6s383u4eXN3C9uEwb9__gXbKYSQK61F3kpVGygENBtuBHi8bXn-Hn4ALUqBFh9D2Cg_S_5QK9PKHHhXSLWsRKtlbpbblOJtDeRyVQq4tN4wBIPr4LKGYr_7ff83rFQN3ppFkIu61Wr_TyEiuLm9g5yX-53xYfgSKdVG6O1-d4hxd_3L9fztNSCgwbedbjEBjGeVoYQXbFr1aSNoMKyA4eginjk0kMswYXEKxatzQ_H7NcH87R2k8Wj4chRnBkuh97ut0CsBYanqh04c0s_v7-e__nYNDTfAjRGfYaVlWfLa0tCqLNV6DaNkklCucTYdR4fcT6uEGbOvE5akRGKlsIq4Il4b2SqpBRQ_cvnQwZckY5X57pYP1swygBewMaUshPbO3rEFWr21qgteITNeCv9dV8v28ubz4iyCZMTiWQQTbM-I4YPFCU5foeVWPAuULKwVMeM4QyD-pwd_02jBi1P_dOGsLhtVxVDCCWIoF0EzhK7Qp92cQkcLZz0jJ5amFoLtzOxvRjBTqo_z16ew8cJZLSyZ9KixBSU95ubzKSZbOOtxTbKY2fWlRyTlw6adnyAnC7djXtl34O13eclP2utbIpnlkTyywFG8f96k6aIfUEfDFmpkkfSYHMr8QLvqGXS2IKvNNDvJhHNqZGwqpa4GH0X7zWBcYE6affCQ8v5rjUKASuQ4j9P_DfXAW-FCrbq2VTVNBluQ1coWrxqD7zwWTxKaktjWcDS1o5KO7ZKSzDXyws2bM6YJiwbQ_5GPSz6zi2duXtjYffT4jD3NB9KcHOMZm_XDcvLhjAlDqrdIM01wKrqKGmsJh8g3tHRDyza0ZEPLNbRUQ8u0T2RfJ6GlGVqWoSUZWo72ab-nFA4JPsGQiX1mR09rSRgWsWtsgRv10UupgOB20nmSMnSh_VmfOgx7h3TcO2yVzIVXdWXrox8u0ZMR3Eaw4nHL3wtPhlhe6pUPASgTK5N7ZPSDNQssDINgdwX10gXD0viomO5H1zx9L2rfh3PwRjELqJj96SXqrShV05Bg0k750AnQvJGk_ocTosEdEz1qPS9JhPc7MUAsJhZ1zI3GUUqm_STR3omAhu2bJM9ktU94CbJqutLgWQcfOklHUo7i_LVFCvqgu-h8_ZiQ8jEnbNlTKhKJ16pAH-SBK3dCE_SVcxKCflxqdKlVXCtpKPtaxiteF3iMGC8lxcRFpBljtKWWgVO5ABdBKXjrfaJuVdSjeuNZuQ0-UW1PTKRHqvjDToBnexQCJra7FAXIJi3yVany90K7n8jvQGGMM9QXr1es42rlCu8jxh5zBBDDDe_Qo6M7Q2Mid4RRhxB-VHE6WcDToi6gfIzWlJ05OjbJhLeEvvV-r6mkI7QYS3ODlsdSZZan2fBGFAevEHpUAAdJDqBvX4CtyaiOeFnIaW57aACH5gU0Lvhk8YUrQH_673ea023IMXYXgSdVLJwwwpfHS4S9d_iDXj5foD2uVK2Way2sCSfoIj1If2xbPsKlVPKTsGdkz_CnS_CWgZcMUZ192k6eixjQ76tBo1UuDImpAwZg5Z96hJfESrZCL5NkOlnejZeUnuIto-XV4D8&name=boat_horn_v10&view=run" target="_faust">Ouvrir dans faustcode &rarr;</a>

---

## Jam : Kisana

Un instrument à cordes pincées (Karplus-Strong) et à boucles, pour jouer tous ensemble sur nos téléphones : <a href="https://effractionmusicale.fr/kisana" target="_faust">https://effractionmusicale.fr/kisana</a>

<img src="is2/qr-kisana.png" alt="QR code Kisana" width="30%"/>

---

## Pour aller plus loin

- Site de Faust : <a href="https://faust.grame.fr" target="_faust">https://faust.grame.fr</a>
- Documentation : <a href="https://faustdoc.grame.fr" target="_faust">https://faustdoc.grame.fr</a>
- Bibliothèques : <a href="https://faustlibraries.grame.fr" target="_faust">https://faustlibraries.grame.fr</a>
- faustcode : <a href="https://orlarey.github.io/faustcode/" target="_faust">https://orlarey.github.io/faustcode/</a>
- Powered by Faust : <a href="https://faust.grame.fr/community/powered-by-faust/" target="_faust">https://faust.grame.fr/community/powered-by-faust/</a>
