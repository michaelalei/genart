
function getBackColor()
{
  var cRam = fxrand()*(2);
  if( cRam < 1)
  {
    bColor = 100 ;
    return "White 白色";
  }
  bColor = 0 ;
  return "Black 黑色";
}

function getFlowerNum()
{
	  //random
  gNums = parseInt(fxrand()*3+1) ;

  return gNums ;
}

function getPalleteStyle()
{
	var sum = 0 ;
	for(var i = 0 ; i < gNums ; i++)
	{
		paletteIndex[i] = parseInt(fxrand()*6) ;
		var num = paletteIndex[i];
		if(paletteIndex[i] == 5 || paletteIndex[i] == 4)
		{
			num = 4 ;
		}
		sum = sum*10+(num+1);
	}

	//console.log("sum:"+sum);
	if( sum < 10 )
	{
		return sum + "00" ;
	}
	else if( sum < 100)
	{
		return sum + "0" ;
	}
	return ""+sum;


}

function getCanvasStyle()
{
	pColor = parseInt(fxrand()*(360));

	var numStyle = parseInt(pColor / 52) + 1;
	//console.log("cStyle:"+numStyle)
	return numStyle ;
}


// this code writes the values to the DOM as an examp


// function for making rounded triangles
function roundedPoly(ctx, points, radiusAll) {
  var i,x,y,len,p1,p2,p3,v1,v2,sinA,sinA90,radDirection,drawDirection,angle,halfAngle,cRadius,lenOut,radius;
  
  // convert 2 points into vector form, polar form, and normalised
  var asVec = function (p, pp, v) {
    v.x = pp.x - p.x;
    v.y = pp.y - p.y;
    v.len = Math.sqrt(v.x * v.x + v.y * v.y);
    v.nx = v.x / v.len;
    v.ny = v.y / v.len;
    v.ang = Math.atan2(v.ny, v.nx);
  };
  radius = radiusAll;
  v1 = {};
  v2 = {};
  len = points.length;
  p1 = points[len - 1];
  // for each point
  for (i = 0; i < len; i++) {
    p2 = points[i % len];
    p3 = points[(i + 1) % len];

    asVec(p2, p1, v1);
    asVec(p2, p3, v2);
    sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);

    radDirection = 1;
    drawDirection = false;
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }
    if (p2.radius !== undefined) {
      radius = p2.radius;
    } else {
      radius = radiusAll;
    }

    halfAngle = angle / 2;
 
    lenOut = Math.abs((Math.cos(halfAngle) * radius) / Math.sin(halfAngle));

    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs((lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }

    x = p2.x + v2.nx * lenOut;
    y = p2.y + v2.ny * lenOut;

    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;

    ctx.arc(
      x,
      y,
      cRadius,
      v1.ang + (Math.PI / 2) * radDirection,
      v2.ang - (Math.PI / 2) * radDirection,
      drawDirection
    );

    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
}

function createPalette(url) {
  let slashIndex = url.lastIndexOf("/"); 
  let colStr = url.slice(slashIndex + 1);
  let cols = colStr.split("-");
  for (let i = 0; i < cols.length; i++) cols[i] = "#" + cols[i];
  return cols;
}


function keyPressed() {
  if (key.toLowerCase() === "s") save(); //to save screenshot

  if (key === " ") reset(); //to generate variations

}

