
//base Var
//huakuang width
var cavWidth = 0 ;
//canvas w
var ww = 1000 ;
//canvas h
var wh = 1000 ;
//background color
var backColor ;

//huakuang color
var pColor ;

var palettes ;
//Flower Var
var palette ;
//flower R
var radius = 25 ;
//flower Num
var fNums   = 9;
//flower circle Angle
var fDegree = 360;
//draw context
var ctx ;
//translate center
var cx = 500 ;
var cy = 900 ;

//flower center 
var fCtx = 0;
var fCty = 500 ;
//every flower off
var xOffs = [];
//flower num
var gNums = 1 ;

var stemW = 1 ;
var triAngle = 15 ;

var paletteIndex = [];

var pg ;
var pgBack ;

var cavWidth = 0 ;
var cavRS = 0;
var cavRW = 0 ;

var startAnim = 0 ;
var animStep = 255 ;
var animFlip = 0 ;

var animOutNum = 0.04 ;
var animInNum = 0.009 ;

function setup() {

  if( windowWidth < 1000 || windowHeight < 1000)
  {
    var min = windowWidth ;
    if( windowHeight < min )
    {
      min = windowHeight;
    }
    createCanvas(min,min);
  }
  else
  {
    createCanvas(1000,1000);
  }

  pixelDensity(2);
  colorMode(HSB,360,100,100);
  angleMode(DEGREES);
  {
    pg = createGraphics(ww, wh);//1000,1000
    pg.pixelDensity(2);
    pg.colorMode(HSB,360,100,100);
    pg.angleMode(DEGREES);
  }
    pgBack = createGraphics(ww, wh);//1000,1000
    pgBack.pixelDensity(2);
    pgBack.colorMode(HSB,360,100,100);
    pgBack.angleMode(DEGREES);

  ctx = pgBack.canvas.getContext("2d");
  reset();
  renderBack();
  //frameRate(1);
  //noLoop();
}

var bColor = 0 ;
var arrPos = [];
var arrStemR1 = [];
var step = 25 ;//stem step

var arrFlowerPRTT = [];
function reset()
{
  //white
  //could white, yellow, black?

  cavWidth = fxrand()*240+(550);
  cavRS = fxrand();
  cavRW = fxrand()*0.5+0.5;

  backColor = color(0,0,bColor);
  //backColor = color(0,0,0);
  setupPalettes();

  pg.background(backColor);

  //stem weight
  stemW = fxrand()*(radius/8-1) + 1;

  if( gNums == 1 )
  {
    arrPos.push({x: 0, y:0, index:0, fR: (fxrand()*15+15)});
  }
  else if( gNums == 2 )
  {
    //duiceng
    arrPos.push({x: 60,   y:-120, index:0, fR: (fxrand()*15+10)});
    arrPos.push({x: -100, y:60,   index:1, fR: (fxrand()*20+10)});
  }
  else
  {
    arrPos.push({x: (fxrand()*30-150), y:(fxrand()*100-200), 
              index:0, fR: (fxrand()*15+10)});
    arrPos.push({x: (fxrand()*50+100), y:(fxrand()*100-200), 
              index:1, fR: (fxrand()*15+10)});
    arrPos.push({x: 0, y:(fxrand()*100+50), index:2, fR: (fxrand()*20+10)});
  }

  //palette = palettes[int(fxrand()*6)];
  //choice palette depends on backColor
  // if(pColor < 120){   }
  // else if(pColor < 240){}
  // else{}

  fCirNum = int( fxrand()*4+3 );
  triAngle = fxrand()*50+10;
  choicePalRC = fxrand();
  fLineWR = fxrand();

  for(var i = 0 ; i < arrPos.length ; i++)
  {

    var arrFlowerPR = [];
    xOffs.push(i);
    var fInfo = arrPos[i] ;
    //renderStem2(fInfo.x, fInfo.y, fInfo.index);

    var yMax = fCty + fInfo.y;

    for(var y = 10 ; y < yMax; y+= step)
    {
      var randOfst = fxrand()*30-15;
      arrStemR1.push(randOfst);
    }

    var nRadius = fInfo.fR;
    for( var cir = fCirNum ; cir > 0 ; cir-- )
    {
      var RR = (cir+1) * nRadius ;
      var arr1 = [];
      var arr2 = [];
      var arrColor = [];
      parts = getParts(fDegree);
      
      console.log(parts.length);
      //flower part creating
      for( var n = 0 ; n < parts.length - 1 ; n++ )
      {
        var divOff = fxrand()*20-10;
        arr1.push(divOff);
        
        var rad = fxrand()*(RR/8) + RR*7/8;
        arr2.push(rad);

        arrColor.push(fxrand());
      }
      arrFlowerPR.push(arr1);
      arrFlowerPR.push(arr2);
      arrFlowerPR.push(arrColor);
    }
    arrFlowerPRTT.push(arrFlowerPR);

  }
}

function draw()
{

  image(pg, 0, 0, width ,height);

  pgBack.clear();
  renderPlant();

  image(pgBack, 0, 0, width, height);
}

function renderPlant()
{
  //origin: cx, xy
  //x --> left, y --> up
  pgBack.push()
  pgBack.translate(cx, cy);
  pgBack.rotate(180);
  pgBack.noFill();
  
  for(var i = 0 ; i < arrPos.length ; i++)
  {
    xOffs.push(i);
    var fInfo = arrPos[i] ;
    renderStem(fInfo.x, fInfo.y, fInfo.index);
  }

  for(var i =0 ;i < arrPos.length ; i++)
  {
    var fInfo = arrPos[i] ;
    var nPal = palettes[paletteIndex[i]];
    renderFlower(fInfo.x, fInfo.y, fInfo.fR, nPal,arrFlowerPRTT[i]);
  }
  pgBack.pop()
}


var fCirNum = 3;
var choicePalRC = 0 ;
var fLineWR = 0 ;
var arrFlowerPart = [] ;
function renderFlower(xOff,yOff,newR, newPalette, arrRom)
{
  if(newR)
  {
    radius = newR ;
  }

  palette = newPalette ;
  
  pgBack.fill(palette[int(choicePalRC*palette.length)]);

  var c = palette[int(cR*palette.length)];
  colorMode(RGB);
  if(startAnim)
  {
    pgBack.fill(color(red(c),green(c),blue(c),animStep));

    if(animFlip == 0)
    {
      animStep -= 0.01;
      //console.log(animStep);
      if(animStep <= -20)
      {
        animFlip = 1 ;
      }
    }
    else
    {
      animStep  += 0.01 ;
      if( animStep >230 )
      {
        animFlip = 0 ;
      }
    }
  }
  else
  {
      ctx.fillStyle = color(red(c),green(c),blue(c));
  }

  pgBack.noStroke();
  pgBack.ellipse(xOff,fCty+10+yOff,radius*1.5);
  //pgBack.pop();
  //return ;
  pgBack.strokeWeight(fLineWR*(3));

  arrFlowerPR = arrRom;

  var iR = 0 ;
  for( var cir = fCirNum ; cir > 0 ; cir-- )
  {
    radius = (cir+1) * newR ;
    var vArrayFill = [];
    var vArrayLine = [];
    
    parts = getParts(fDegree);

    var arr1 = arrFlowerPR[iR];
    iR++ ;
    var arr2 = arrFlowerPR[iR];
    iR++ ;
    var arr3 = arrFlowerPR[iR];
    iR++ ;
    var a = 0 ;
    var div = 1 ;
    //flower part creating
    for( var n = 0 ; n < parts.length - 1 ; n++ )
    {
      //var divOff = fxrand()*20-10;
      var divOff = arr1[n];
      a += parts[n] + divOff;
      div = parts[n+1] + divOff ;
      
      //var rad = fxrand()*(radius/8) + radius*7/8;
  
      var rad = arr2[n];
      var x1 = rad * cos(a) + fCtx + xOff;
      var y1 = rad * sin(a) + fCty + yOff;
      
      var x2 = rad * cos( a + div * 6/8) + fCtx + xOff;
      var y2 = rad * sin( a + div * 6/8) + fCty + yOff;
      
      cVxs = [] ;
      cVxs.push({x: x1, y: y1});
      cVxs.push({x: x2, y: y2});
      cVxs.push({x: fCtx + xOff, y: fCty + yOff});
      
      vArrayFill.push(cVxs);
      
      var ofst = 5 ;
      
      cVxs = [] ;
      cVxs.push({x: x1-ofst, y: y1-ofst});
      cVxs.push({x: x2-ofst, y: y2-ofst});
      cVxs.push({x: fCtx+ xOff-ofst, y: fCty+ yOff-ofst});
      
      vArrayLine.push(cVxs);
    }
    
    for( var n = 0 ; n < vArrayFill.length ; n++)
    {
      var cR = arr3[n];
      var c = palette[int(cR*palette.length)];
      pgBack.push()
      colorMode(RGB);
      if(startAnim)
      {
        ctx.fillStyle = color(red(c),green(c),blue(c),animStep);

        if(animFlip == 0)
        {
          animStep -= animOutNum;
          //console.log(animStep);
          if(animStep <= -20)
          {
            animFlip = 1 ;
          }
        }
        else
        {
          animStep  += animInNum ;
          if( animStep >230 )
          {
            animFlip = 0 ;
          }
        }
      }
      else
      {
        ctx.fillStyle = color(red(c),green(c),blue(c));
      }

      //ctx.fillStyle = color(palette[int(fxrand()*palette.length)]);
      ctx.beginPath();
      roundedPoly(ctx,vArrayFill[n],triAngle);
      ctx.fill();
      pgBack.pop();
    }
    for( var n = 0 ; n < vArrayLine.length ; n++)
    {
      ctx.fillStyle = color(0,0,100);
      pgBack.noFill();
      pgBack.stroke(0);
      ctx.beginPath();
      roundedPoly(ctx,vArrayLine[n],triAngle);
      ctx.stroke();
    }
  }
  //pop();
}

function mouseClicked() {
  console.log('clikc')
  startAnim = !startAnim;
  //console.log(startAnim);
  animStep = 255 ;
}

function renderStem(xOffMax,yOffMax,nIndex)
{ 
  var xOff = xOffs[nIndex] ;
  var cVxs = [];
  pgBack.stroke(0);
  //stroke(random(palette));
  pgBack.strokeWeight(stemW);
  pgBack.noFill();
  
  var yMax = fCty + yOffMax;
  pgBack.beginShape();
  pgBack.curveVertex(0,10);
  cVxs.push([0,10]);
  for(var y = 10, i = 0 ; y < yMax; y+= step, i++)
  {
    //var randOfst = fxrand()*10-5;
    randOfst = arrStemR1[i];
    if(y > 100 )
    {

    curveVertex(xOff+ randOfst,y);
      cVxs.push([xOff+ randOfst,y]);

      if( xOffMax > 0 )
      {
        if( xOff < xOffMax )
        {
          xOff += 20 ;
        }
      }
      else
      {
        if( xOff > xOffMax )
        {
          xOff -= 20 ;
        }
      }
    }
    else
    {
      curveVertex(randOfst,y);
      cVxs.push([randOfst,y]);
    }
  }
  curveVertex(xOff,yMax);
  curveVertex(xOff,yMax);
  cVxs.push([xOff,yMax]);
  cVxs.push([xOff,yMax]);
  pgBack.endShape();
  
  for(var t = 0 ; t < 3 ; t++)
  {
    pgBack.beginShape();
    for(var n = 0 ;n < cVxs.length ;n++)
    {
      curveVertex(cVxs[n][0]+ t ,cVxs[n][1]);
    }
    pgBack.endShape();
  }
  
  //xOffs[nIndex] = xOff;
}



///////////////////////////////////////////////////////
//huakuang render
function renderBack()
{

  var sX = (ww-cavWidth)/2;
  var sY = 100;
  var eX = sX+cavWidth;
  var eY = 900;
  //whiteBorder
  pg.stroke(0, 0, 100);
  pg.strokeWeight(10);
  //noFill();
  pg.fill(0);
  
  pg.rect(sX, sY, eX-sX, eY-sY);
  for (var y = sY-2; y < eY+4; y += 2)
  {
    for (var x = sX-2; x < eX+4; x += 2)
    {
      var r =  map(y+cavRS*40-20, 0, eY-sY, 60, 28);
  
      pg.stroke(pColor, r, r);
      pg.strokeWeight(cavRW*1.8+0.2);
      pg.point(x, y);
    }
  }
}


// divides 360 degress into randomly partitioned angles
// these make up the angles of the leaves
function getParts(max) {
  partitions = [0];
  numP = abs(fNums)
 while (
    partitions.reduce(function (a, b) {
      return a + b;
    }, 0) < max
  ) {
    var radPart = 0.5*(max / numP - max / (numP * 3))+max / (numP * 3);
    //var radPart = fxrand()*(max / numP - max / (numP * 3))+max / (numP * 3);
    partitions.push(radPart); //random(max / (numP * 3), max / numP)
  }

  // if last partition larger than max
  // we remove it and add one that fills the circle exactly
  if (
    partitions.reduce(function (a, b) {
      return a + b;
    }, 0) > max
  ) {
    partitions.pop();
    partitions.push(
      max -
        partitions.reduce(function (a, b) {
          return a + b;
        }, 0)
    );
  }

  return partitions;
}

function setupPalettes()
{
  palettes = [] ;
  var pal = createPalette("https://coolors.co/006d77-83c5be-edf6f9-ffddd2-e29578");
  palettes.push(pal);
  pal = createPalette("https://coolors.co/03045e-0077b6-00b4d8-90e0ef-caf0f8");
  palettes.push(pal);
  pal = createPalette("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51");
  palettes.push(pal);
  pal = createPalette("https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500");
  palettes.push(pal);
  pal = createPalette("https://coolors.co/6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08");
  palettes.push(pal);
  palettes.push(pal);
}

