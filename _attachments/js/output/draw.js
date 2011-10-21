function drawAboutButton() {

    gP.noStroke();
    gP.fill(255,255,255);
    gP.rect($('#globalCanvas').data('canvasWidth')-162,0,
    80,40);

    gP.fill(0);
    gP.text('about',$('#globalCanvas').data('canvasWidth')-148,25)
}
function drawHelpButton() {

    gP.noStroke();
    gP.fill(255,255,255);
    gP.rect($('#globalCanvas').data('canvasWidth')-80,0,
    80,40);

    gP.fill(0);
    gP.text('help',$('#globalCanvas').data('canvasWidth')-62,25)

}


function drawAddNodeButton() {

    gP.noStroke();
    gP.fill(0,255,0);
    gP.triangle(0,0,150,0,0,150);

    gP.strokeWeight(3);
    gP.stroke(255,255,255);
    gP.line(20,40,60,40);
    gP.line(40,20,40,60);

}
function drawRemoveNodeButton() {

    gP.noStroke();
    gP.fill(255,0,0);
    gP.triangle(0,$('#globalCanvas').data('canvasHeight'),
    0,$('#globalCanvas').data('canvasHeight')-150,
    150,$('#globalCanvas').data('canvasHeight'));

    gP.strokeWeight(3);
    gP.stroke(255,255,255);
    gP.line(25,$('#globalCanvas').data('canvasHeight')-60,
    55,$('#globalCanvas').data('canvasHeight')-20);
    gP.line(55,$('#globalCanvas').data('canvasHeight')-60,
    25,$('#globalCanvas').data('canvasHeight')-20);

}
function drawAddSubscriptionButton() {

    gP.noStroke();
    gP.fill(0,0,255);
    gP.triangle($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'),
    $('#globalCanvas').data('canvasWidth')-150,$('#globalCanvas').data('canvasHeight'),
    $('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight')-150);

    gP.strokeWeight(3);
    gP.stroke(255,255,255);
    gP.line($('#globalCanvas').data('canvasWidth')-60,$('#globalCanvas').data('canvasHeight')-30,
    $('#globalCanvas').data('canvasWidth')-20,$('#globalCanvas').data('canvasHeight')-50);

    gP.noFill();
    gP.strokeWeight(8);
    gP.stroke(160,160,160);
    gP.ellipse($('#globalCanvas').data('canvasWidth')-40,$('#globalCanvas').data('canvasHeight')-40,
    20,40);

    gP.strokeWeight(3);
    gP.stroke(255,255,255);
    gP.line($('#globalCanvas').data('canvasWidth')-60,$('#globalCanvas').data('canvasHeight')-30,
    $('#globalCanvas').data('canvasWidth')-40,$('#globalCanvas').data('canvasHeight')-40);

}


function drawCalibrationNodes() {

    gP.noStroke();
    gP.fill(0,0,0);
    gP.ellipse($('#globalCanvas').data('graphCenterX')-($('#globalCanvas').data('graphWidth')/2)+100,
    $('#globalCanvas').data('graphCenterY'),
    200,200);

}


function drawGraphBackground() {

    gP.strokeWeight(1);
    gP.stroke(255,255,255);
    gP.fill(255,255,255);
    gP.ellipse($('#globalCanvas').data('graphCenterX'),
    $('#globalCanvas').data('graphCenterY'),
    $('#globalCanvas').data('graphWidth'), $('#globalCanvas').data('graphHeight'));

/*
    gP.arc($('#globalCanvas').data('graphCenterX'),$('#globalCanvas').data('graphCenterY'),
        $('#globalCanvas').data('graphWidth'),$('#globalCanvas').data('graphHeight'),0,2*Math.PI);
    gP.arc($('#globalCanvas').data('graphCenterX'),$('#globalCanvas').data('graphCenterY'),
        $('#globalCanvas').data('graphWidth'),$('#globalCanvas').data('graphHeight'),-Math.PI,Math.PI);
*/
}

function drawNodes() {

    var keys = nodeGlyphMap.outputs.keys();
    var thisX;
    var thisY;
    var thisWidth;
    var numSignals;
    var numGroups;
    var subNodes;
    for (var i=0;i<nodeGlyphMap.outputs.length();i++) {
        thisX = nodeGlyphMap.outputs.get(keys[i]).layoutX; 
        thisY = nodeGlyphMap.outputs.get(keys[i]).layoutY; 
        thisWidth = nodeGlyphMap.outputs.get(keys[i]).symbolWidth; 

        if (isOutputLeafNode(i)) {
            gP.noStroke();
            gP.fill(0,200,0);
        } else {
            gP.strokeWeight(5);
            gP.stroke(0,200,0);
            gP.noFill();
        }

        if (nodeGlyphMap.outputs.get(keys[i]).selected && nodeGlyphMap.outputs.get(keys[i]).mouseOver) {
            gP.fill(255,100,130,230);
        } else if (nodeGlyphMap.outputs.get(keys[i]).selected) {
            gP.fill(255,0,0,230);
        } else if (nodeGlyphMap.outputs.get(keys[i]).mouseOver) {
            gP.fill(0,200,130,230);
        }
        gP.ellipse(thisX,thisY,thisWidth,thisWidth);

        subNodes = nodeGlyphMap.outputs.get(keys[i]).subNodes.keys();
        if (nodeGlyphMap.outputs.get(keys[i]).visible) {
        for (var j=0;j<subNodes.length;j++) {
            if (nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).isSignal) {
                gP.noStroke();
                gP.fill(0,150,0);
            } else {
                gP.strokeWeight(3);
                gP.stroke(0,150,0);
                gP.noFill();
            }
            gP.ellipse(nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).layoutX,
                    nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).layoutY,
                    nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth,
                    nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth);
        }
        }
    }
    keys = nodeGlyphMap.inputs.keys();
    for (var i=0;i<nodeGlyphMap.inputs.length();i++) {
        thisX = nodeGlyphMap.inputs.get(keys[i]).layoutX; 
        thisY = nodeGlyphMap.inputs.get(keys[i]).layoutY; 
        thisWidth = nodeGlyphMap.inputs.get(keys[i]).symbolWidth; 

        if (isInputLeafNode(i)) {
            gP.noStroke();
            gP.fill(200,200,0);
        } else {
            gP.strokeWeight(5);
            gP.stroke(200,200,0);
            gP.noFill();
        }

        if (nodeGlyphMap.inputs.get(keys[i]).selected && nodeGlyphMap.inputs.get(keys[i]).mouseOver) {
            gP.fill(255,100,130,230);
        } else if (nodeGlyphMap.inputs.get(keys[i]).selected) {
            gP.fill(255,0,0,230);
        } else if (nodeGlyphMap.inputs.get(keys[i]).mouseOver) {
            gP.fill(180,180,100,230);
        }
        gP.ellipse(thisX,thisY,thisWidth,thisWidth);

        subNodes = nodeGlyphMap.inputs.get(keys[i]).subNodes.keys();
        if (nodeGlyphMap.inputs.get(keys[i]).visible) {
        for (var j=0;j<subNodes.length;j++) {
            if (nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).isSignal) {
                gP.noStroke();
                gP.fill(150,150,0);
            } else {
                gP.strokeWeight(3);
                gP.stroke(150,150,0);
                gP.noFill();
            }
            gP.ellipse(nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).layoutX,
                    nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).layoutY,
                    nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth,
                    nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth);
        }
        }
    }

}

function drawEdges() {

    var keys = edgeGlyphMap.keys();
    var x1, y1, x2, y2;
    var cx1, cy1, cx2, cy2;
    gP.strokeWeight(3);
    gP.noFill();
    for (var i=0;i<keys.length;i++) {
        if (edgeGlyphMap.get(keys[i]).input != undefined) {
            x1 = edgeGlyphMap.get(keys[i]).x1;
            y1 = edgeGlyphMap.get(keys[i]).y1;
            x2 = edgeGlyphMap.get(keys[i]).x2;
            y2 = edgeGlyphMap.get(keys[i]).y2;
            cx1 = edgeGlyphMap.get(keys[i]).cx1;
            cy1 = edgeGlyphMap.get(keys[i]).cy1;
            cx2 = edgeGlyphMap.get(keys[i]).cx2;
            cy2 = edgeGlyphMap.get(keys[i]).cy2;

            gP.stroke(0);
            if (edgeGlyphMap.get(keys[i]).selected) {
                gP.stroke(255,0,0);
            }
            if (edgeGlyphMap.get(keys[i]).mouseOver) {
                gP.stroke(0,0,255);
            }
            gP.bezier(x1,y1,cx1,cy1,cx2,cy2,x2,y2);
        }
    }

}

function drawListBackground() {

    if ($('#globalCanvas').data('currentTab')=='view') {
        gP.noStroke();
        gP.fill(215);
        gP.rect(10,150,180,$('#globalCanvas').data('canvasHeight')+150);

        gP.noStroke();
        gP.fill(215);
        gP.rect($('#globalCanvas').data('canvasWidth')-190,150,180,$('#globalCanvas').data('canvasHeight')+150);
    }

}

function drawListGlyphs() {

    var outputSet = getCurrentOutputLevelSet();
    var inputSet = getCurrentInputLevelSet();

    gP.textAlign(gP.LEFT);
    gP.textSize(12);
    gP.noStroke();
    for (var i=0;i<outputSet.length;i++) {
        gP.fill(0,200,130,230);
        if (nodeGlyphMap.outputs.get(outputSet[i]).mouseOver) {
            gP.rect(0,150+(i*32),200,28);
        }
        gP.fill(0);
        gP.text(outputSet[i],10,170+(i*32));
    }
    for (var i=0;i<inputSet.length;i++) {
        gP.fill(180,180,100,230);
        if (nodeGlyphMap.inputs.get(inputSet[i]).mouseOver) {
            gP.rect($('#globalCanvas').data('canvasWidth')-200,150+(i*32),200,28);
        }
        gP.fill(0);
        gP.text(inputSet[i],$('#globalCanvas').data('canvasWidth')+10-200,170+(i*32));
    }

}

function drawTraversalGlyphs() {

    traversalGlyphMap = [[],[]];

    gP.textAlign(gP.LEFT);
    gP.textSize(16);
    gP.noStroke();
    for (var i=0;i<outputLabelTrace.length;i++) {
        gP.fill(0,230,0,230);
        gP.rect($('#globalCanvas').data('centerX1')+80-200,$('#globalCanvas').data('centerY1')-120+(i*32),200,28);
        gP.fill(0);
        gP.text(outputLabelTrace[i],
                $('#globalCanvas').data('centerX1')+90-200,$('#globalCanvas').data('centerY1')-100+(i*32));
        traversalGlyphMap[0].push([[$('#globalCanvas').data('centerX1')+80-200,$('#globalCanvas').data('centerY1')-120+(i*32),200,28],
                outputLabelTrace[i]]);
    }

    for (var i=0;i<inputLabelTrace.length;i++) {
        gP.fill(230,230,0,230);
        gP.rect($('#globalCanvas').data('centerX2')-80,$('#globalCanvas').data('centerY2')-120+(i*32),200,28);
        gP.fill(0);
        gP.text(inputLabelTrace[i],
                $('#globalCanvas').data('centerX2')-70,$('#globalCanvas').data('centerY2')-100+(i*32));
        traversalGlyphMap[1].push([[$('#globalCanvas').data('centerX2')-80,$('#globalCanvas').data('centerY2')-120+(i*32),200,28],
            inputLabelTrace[i]]);
    }

}
