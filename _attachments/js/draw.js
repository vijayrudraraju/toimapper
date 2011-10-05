function drawBackground() {

    var backgroundWidth = 700;

    if ($('#viewTab').hasClass('active')) {
        centerX1 = 550;
        centerY1 = 45+(760/2);
        centerX2 = screenWidth-550;
        centerY2 = 45+(760/2);

        globalP.noStroke();
        globalP.fill(215);
        globalP.rect(10,150,180,screenHeight+150);

        globalP.noStroke();
        globalP.fill(215);
        globalP.rect(screenWidth-190,150,180,screenHeight+150);
    } else if ($('#editTab').hasClass('active')) {
        centerX1 = 550+190;
        centerY1 = 45+(760/2);
        centerX2 = screenWidth-550+190;
        centerY2 = 45+(760/2);
    }

    globalP.strokeWeight(1);
    globalP.stroke(0,255,0);
    globalP.noFill();
    globalP.arc(centerX1,centerY1,
            backgroundWidth,backgroundWidth,Math.PI/2,3*Math.PI/2);

    globalP.strokeWeight(1);
    globalP.stroke(255,255,0);
    globalP.noFill();
    globalP.arc(centerX2,centerY2,
            backgroundWidth,backgroundWidth,0,Math.PI/2);
    globalP.arc(centerX2,centerY2,
            backgroundWidth,backgroundWidth,3*Math.PI/2,2*Math.PI);

}

function drawListGlyphs() {

    var outputSet = getCurrentOutputLevelSet();
    var inputSet = getCurrentInputLevelSet();

    globalP.textAlign(globalP.LEFT);
    globalP.textSize(12);
    globalP.noStroke();
    for (var i=0;i<outputSet.length;i++) {
        globalP.fill(0,200,130,230);
        if (nodeGlyphMap.outputs.get(outputSet[i]).mouseOver) {
            globalP.rect(0,150+(i*32),200,28);
        }
        globalP.fill(0);
        globalP.text(outputSet[i],10,170+(i*32));
    }
    for (var i=0;i<inputSet.length;i++) {
        globalP.fill(180,180,100,230);
        if (nodeGlyphMap.inputs.get(inputSet[i]).mouseOver) {
            globalP.rect(screenWidth-200,150+(i*32),200,28);
        }
        globalP.fill(0);
        globalP.text(inputSet[i],screenWidth+10-200,170+(i*32));
    }

}

function drawTraversalGlyphs() {

    traversalGlyphMap = [[],[]];

    globalP.textAlign(globalP.LEFT);
    globalP.textSize(16);
    globalP.noStroke();
    for (var i=0;i<outputLabelTrace.length;i++) {
        globalP.fill(0,230,0,230);
        globalP.rect(centerX1+80-200,centerY1-120+(i*32),200,28);
        globalP.fill(0);
        globalP.text(outputLabelTrace[i],
                centerX1+90-200,centerY1-100+(i*32));
        traversalGlyphMap[0].push([[centerX1+80-200,centerY1-120+(i*32),200,28],
                outputLabelTrace[i]]);
    }

    for (var i=0;i<inputLabelTrace.length;i++) {
        globalP.fill(230,230,0,230);
        globalP.rect(centerX2-80,centerY2-120+(i*32),200,28);
        globalP.fill(0);
        globalP.text(inputLabelTrace[i],
                centerX2-70,centerY2-100+(i*32));
        traversalGlyphMap[1].push([[centerX2-80,centerY2-120+(i*32),200,28],
            inputLabelTrace[i]]);
    }

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
            globalP.noStroke();
            globalP.fill(0,200,0);
        } else {
            globalP.strokeWeight(5);
            globalP.stroke(0,200,0);
            globalP.noFill();
        }

        if (nodeGlyphMap.outputs.get(keys[i]).selected && nodeGlyphMap.outputs.get(keys[i]).mouseOver) {
            globalP.fill(255,100,130,230);
        } else if (nodeGlyphMap.outputs.get(keys[i]).selected) {
            globalP.fill(255,0,0,230);
        } else if (nodeGlyphMap.outputs.get(keys[i]).mouseOver) {
            globalP.fill(0,200,130,230);
        }
        globalP.ellipse(thisX,thisY,thisWidth,thisWidth);

        subNodes = nodeGlyphMap.outputs.get(keys[i]).subNodes.keys();
        if (nodeGlyphMap.outputs.get(keys[i]).visible) {
        for (var j=0;j<subNodes.length;j++) {
            if (nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).isSignal) {
                globalP.noStroke();
                globalP.fill(0,150,0);
            } else {
                globalP.strokeWeight(3);
                globalP.stroke(0,150,0);
                globalP.noFill();
            }
            globalP.ellipse(nodeGlyphMap.outputs.get(keys[i]).subNodes.get(subNodes[j]).layoutX,
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
            globalP.noStroke();
            globalP.fill(200,200,0);
        } else {
            globalP.strokeWeight(5);
            globalP.stroke(200,200,0);
            globalP.noFill();
        }

        if (nodeGlyphMap.inputs.get(keys[i]).selected && nodeGlyphMap.inputs.get(keys[i]).mouseOver) {
            globalP.fill(255,100,130,230);
        } else if (nodeGlyphMap.inputs.get(keys[i]).selected) {
            globalP.fill(255,0,0,230);
        } else if (nodeGlyphMap.inputs.get(keys[i]).mouseOver) {
            globalP.fill(180,180,100,230);
        }
        globalP.ellipse(thisX,thisY,thisWidth,thisWidth);

        subNodes = nodeGlyphMap.inputs.get(keys[i]).subNodes.keys();
        if (nodeGlyphMap.inputs.get(keys[i]).visible) {
        for (var j=0;j<subNodes.length;j++) {
            if (nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).isSignal) {
                globalP.noStroke();
                globalP.fill(150,150,0);
            } else {
                globalP.strokeWeight(3);
                globalP.stroke(150,150,0);
                globalP.noFill();
            }
            globalP.ellipse(nodeGlyphMap.inputs.get(keys[i]).subNodes.get(subNodes[j]).layoutX,
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
    globalP.strokeWeight(3);
    globalP.noFill();
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

            globalP.stroke(0);
            if (edgeGlyphMap.get(keys[i]).selected) {
                globalP.stroke(255,0,0);
            }
            if (edgeGlyphMap.get(keys[i]).mouseOver) {
                globalP.stroke(0,0,255);
            }
            globalP.bezier(x1,y1,cx1,cy1,cx2,cy2,x2,y2);
        }
    }

}
