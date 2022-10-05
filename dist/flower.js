var backColor,pColor,palettes,palette,ctx,pg,pgBack,cavWidth=0,ww=1e3,wh=1e3,radius=25,fNums=9,fDegree=360,cx=500,cy=900,fCtx=0,fCty=500,xOffs=[],gNums=1,stemW=1,triAngle=15,paletteIndex=[],cavRS=(cavWidth=0,0),cavRW=0,startAnim=0,animStep=255,animFlip=0,animOutNum=.04,animInNum=.009;function setup(){if(windowWidth<1e3||windowHeight<1e3){var e=windowWidth;windowHeight<e&&(e=windowHeight),createCanvas(e,e)}else createCanvas(1e3,1e3);pixelDensity(2),colorMode(HSB,360,100,100),angleMode(DEGREES),(pg=createGraphics(ww,wh)).pixelDensity(2),pg.colorMode(HSB,360,100,100),pg.angleMode(DEGREES),(pgBack=createGraphics(ww,wh)).pixelDensity(2),pgBack.colorMode(HSB,360,100,100),pgBack.angleMode(DEGREES),ctx=pgBack.canvas.getContext("2d"),reset(),renderBack()}var bColor=0,arrPos=[],arrStemR1=[],step=25,arrFlowerPRTT=[];function reset(){cavWidth=240*fxrand()+550,cavRS=fxrand(),cavRW=.5*fxrand()+.5,backColor=color(0,0,bColor),setupPalettes(),pg.background(backColor),stemW=fxrand()*(radius/8-1)+1,1==gNums?arrPos.push({x:0,y:0,index:0,fR:15*fxrand()+15}):2==gNums?(arrPos.push({x:60,y:-120,index:0,fR:15*fxrand()+10}),arrPos.push({x:-100,y:60,index:1,fR:20*fxrand()+10})):(arrPos.push({x:30*fxrand()-150,y:100*fxrand()-200,index:0,fR:15*fxrand()+10}),arrPos.push({x:50*fxrand()+100,y:100*fxrand()-200,index:1,fR:15*fxrand()+10}),arrPos.push({x:0,y:100*fxrand()+50,index:2,fR:20*fxrand()+10})),fCirNum=int(4*fxrand()+3),triAngle=50*fxrand()+10,choicePalRC=fxrand(),fLineWR=fxrand();for(var e=0;e<arrPos.length;e++){var r=[];xOffs.push(e);for(var t=arrPos[e],a=fCty+t.y,n=10;n<a;n+=step){var o=30*fxrand()-15;arrStemR1.push(o)}for(var s=t.fR,p=fCirNum;p>0;p--){var c=(p+1)*s,i=[],l=[],f=[];parts=getParts(fDegree),console.log(parts.length);for(var d=0;d<parts.length-1;d++){var u=20*fxrand()-10;i.push(u);var g=fxrand()*(c/8)+7*c/8;l.push(g),f.push(fxrand())}r.push(i),r.push(l),r.push(f)}arrFlowerPRTT.push(r)}}function draw(){image(pg,0,0,width,height),pgBack.clear(),renderPlant(),image(pgBack,0,0,width,height)}function renderPlant(){pgBack.push(),pgBack.translate(cx,cy),pgBack.rotate(180),pgBack.noFill();for(var e=0;e<arrPos.length;e++)xOffs.push(e),renderStem((r=arrPos[e]).x,r.y,r.index);for(e=0;e<arrPos.length;e++){var r=arrPos[e],t=palettes[paletteIndex[e]];renderFlower(r.x,r.y,r.fR,t,arrFlowerPRTT[e])}pgBack.pop()}var fCirNum=3,choicePalRC=0,fLineWR=0,arrFlowerPart=[];function renderFlower(e,r,t,a,n){t&&(radius=t),palette=a,pgBack.fill(palette[int(choicePalRC*palette.length)]);var o=palette[int(R*palette.length)];colorMode(RGB),startAnim?(pgBack.fill(color(red(o),green(o),blue(o),animStep)),0==animFlip?(animStep-=.01)<=-20&&(animFlip=1):(animStep+=.01)>230&&(animFlip=0)):ctx.fillStyle=color(red(o),green(o),blue(o)),pgBack.noStroke(),pgBack.ellipse(e,fCty+10+r,1.5*radius),pgBack.strokeWeight(3*fLineWR),arrFlowerPR=n;for(var s=0,p=fCirNum;p>0;p--){radius=(p+1)*t;var c=[],i=[];parts=getParts(fDegree);var l=arrFlowerPR[s];s++;var f=arrFlowerPR[s];s++;var d=arrFlowerPR[s];s++;for(var u=0,g=1,h=0;h<parts.length-1;h++){var x=l[h];u+=parts[h]+x,g=parts[h+1]+x;var v=f[h],m=v*cos(u)+fCtx+e,k=v*sin(u)+fCty+r,P=v*cos(u+6*g/8)+fCtx+e,B=v*sin(u+6*g/8)+fCty+r;cVxs=[],cVxs.push({x:m,y:k}),cVxs.push({x:P,y:B}),cVxs.push({x:fCtx+e,y:fCty+r}),c.push(cVxs),cVxs=[],cVxs.push({x:m-5,y:k-5}),cVxs.push({x:P-5,y:B-5}),cVxs.push({x:fCtx+e-5,y:fCty+r-5}),i.push(cVxs)}for(h=0;h<c.length;h++){var R=d[h];o=palette[int(R*palette.length)],pgBack.push(),colorMode(RGB),startAnim?(ctx.fillStyle=color(red(o),green(o),blue(o),animStep),0==animFlip?(animStep-=animOutNum)<=-20&&(animFlip=1):(animStep+=animInNum)>230&&(animFlip=0)):ctx.fillStyle=color(red(o),green(o),blue(o)),ctx.beginPath(),roundedPoly(ctx,c[h],triAngle),ctx.fill(),pgBack.pop()}for(h=0;h<i.length;h++)ctx.fillStyle=color(0,0,100),pgBack.noFill(),pgBack.stroke(0),ctx.beginPath(),roundedPoly(ctx,i[h],triAngle),ctx.stroke()}}function mouseClicked(){console.log("clikc"),startAnim=!startAnim,animStep=255}function renderStem(e,r,t){var a=xOffs[t],n=[];pgBack.stroke(0),pgBack.strokeWeight(stemW),pgBack.noFill();var o=fCty+r;pgBack.beginShape(),pgBack.curveVertex(0,10),n.push([0,10]);for(var s=10,p=0;s<o;s+=step,p++)randOfst=arrStemR1[p],s>100?(curveVertex(a+randOfst,s),n.push([a+randOfst,s]),e>0?a<e&&(a+=20):a>e&&(a-=20)):(curveVertex(randOfst,s),n.push([randOfst,s]));curveVertex(a,o),curveVertex(a,o),n.push([a,o]),n.push([a,o]),pgBack.endShape();for(var c=0;c<3;c++){pgBack.beginShape();for(var i=0;i<n.length;i++)curveVertex(n[i][0]+c,n[i][1]);pgBack.endShape()}}function renderBack(){var e=(ww-cavWidth)/2,r=e+cavWidth;pg.stroke(0,0,100),pg.strokeWeight(10),pg.fill(0),pg.rect(e,100,r-e,800);for(var t=98;t<904;t+=2)for(var a=e-2;a<r+4;a+=2){var n=map(t+40*cavRS-20,0,800,60,28);pg.stroke(pColor,n,n),pg.strokeWeight(1.8*cavRW+.2),pg.point(a,t)}}function getParts(e){for(partitions=[0],numP=abs(fNums);partitions.reduce((function(e,r){return e+r}),0)<e;){var r=.5*(e/numP-e/(3*numP))+e/(3*numP);partitions.push(r)}return partitions.reduce((function(e,r){return e+r}),0)>e&&(partitions.pop(),partitions.push(e-partitions.reduce((function(e,r){return e+r}),0))),partitions}function setupPalettes(){palettes=[];var e=createPalette("https://coolors.co/006d77-83c5be-edf6f9-ffddd2-e29578");palettes.push(e),e=createPalette("https://coolors.co/03045e-0077b6-00b4d8-90e0ef-caf0f8"),palettes.push(e),e=createPalette("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"),palettes.push(e),e=createPalette("https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500"),palettes.push(e),e=createPalette("https://coolors.co/6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08"),palettes.push(e),palettes.push(e)}