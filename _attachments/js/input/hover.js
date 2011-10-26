var mousedSource = "";
var mousedDestination = "";

function updateAboutButtonMouseState() {
    if (gP.mouseX > $('#globalCanvas').data('canvasWidth')-160 &&
    gP.mouseX < $('#globalCanvas').data('canvasWidth')-80 &&
    gP.mouseY < 40) {
        $('#aboutSwitch').data('moused',true);
    } else {
        $('#aboutSwitch').data('moused',false);
    }
}

function updateHelpButtonMouseState() {
    if (gP.mouseX > $('#globalCanvas').data('canvasWidth')-80 &&
    gP.mouseY < 40) {
        $('#helpSwitch').data('moused',true);
    } else {
        $('#helpSwitch').data('moused',false);
    }
}

function updateNodeMouseStates() {
    with ($('#globalCanvas')) {
        var pointer;
        var canonX;
        var canonY;
        for (var currentSide in data('layouts')['root']) {
            canonX = gP.mouseX-data('graphCenterX');
            canonY = data('graphCenterY')-gP.mouseY;
            // set 0 pointer
            pointer = data('layouts')['root'][currentSide];
            if (currentSide === 'left') {
                if (canonY > canonX*-1*Math.sqrt(3)) {
                    pointer['moused'] = false;
                } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('graphWidth')/2,2)) {
                    pointer['moused'] = false;
                } else {
                    pointer['moused'] = true;
                }
            } else if (currentSide === 'right') {
                if (canonY < canonX*-1*Math.sqrt(3)) {
                    pointer['moused'] = false;
                } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('graphWidth')/2,2)) {
                    pointer['moused'] = false;
                } else {
                    pointer['moused'] = true;
                }
            }

            for(var currentNode in data('layouts')['root'][currentSide]) {
                // set 1 pointer
                pointer = data('layouts')['root'][currentSide][currentNode];
                // skip simple nodes
                if (pointer['complex'] === undefined) {
                    continue;
                }

                canonX = gP.mouseX-pointer['x'];
                canonY = pointer['y']-gP.mouseY;
                if (currentNode === 'main') {
                    if (currentSide === 'left') {
                        if (canonY > canonX*-1*Math.sqrt(3)) {
                            pointer['moused'] = false;
                        } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('mainNode0Width')/2,2)) {
                            pointer['moused'] = false;
                        } else {
                            pointer['moused'] = true;
                        }
                    } else if (currentSide === 'right') {
                        if (canonY < canonX*-1*Math.sqrt(3)) {
                            pointer['moused'] = false;
                        } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('mainNode0Width')/2,2)) {
                            pointer['moused'] = false;
                        } else {
                            pointer['moused'] = true;
                        }
                    }
                } else {
                    if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('node0Width')/2,2)) {
                        pointer['moused'] = false;
                    } else {
                        pointer['moused'] = true;
                    }
                }
            }
        }
    }
}

function updateNodeMouseState() {

    mousedSource = "";
    mousedDestination = "";

    // hover detection of source nodes and destination nodes 
    if ($('#viewTab').hasClass('active') || $('#editTab').hasClass('active')) {
        var thisX = 0; // input,level,container,drawingNumbers,thisX
        var thisY = 0;
        var thisRadius = 0;

        var keys = nodeGlyphMap.outputs.keys();
        var sourcePaths = getCurrentOutputPathsFromNodes();
        for (var i=0;i<keys.length;i++) {
            if (!nodeGlyphMap.outputs.get(keys[i]).visible) {
                continue;
            }

            thisX = nodeGlyphMap.outputs.get(keys[i]).layoutX;
            thisY = nodeGlyphMap.outputs.get(keys[i]).layoutY;
            thisRadius = nodeGlyphMap.outputs.get(keys[i]).symbolWidth/2;

            // is the mouse within the bounds of the node glyph?
            if (Math.pow(gP.mouseX-thisX,2)+Math.pow(gP.mouseY-thisY,2) < Math.pow(thisRadius,2)) {
                nodeGlyphMap.outputs.get(keys[i]).mouseOver = true;
                mousedSource = sourcePaths[i];
            } else {
                nodeGlyphMap.outputs.get(keys[i]).mouseOver = false;
            }
        }

        keys = nodeGlyphMap.inputs.keys();
        var destinationPaths = getCurrentInputPathsFromNodes();
        for (var i=0;i<keys.length;i++) {
            if (!nodeGlyphMap.inputs.get(keys[i]).visible) {
                continue;
            }

            thisX = nodeGlyphMap.inputs.get(keys[i]).layoutX;
            thisY = nodeGlyphMap.inputs.get(keys[i]).layoutY;
            thisRadius = nodeGlyphMap.inputs.get(keys[i]).symbolWidth/2;

            // is the mouse within the bounds of the node glyph?
            if (Math.pow(gP.mouseX-thisX,2)+Math.pow(gP.mouseY-thisY,2) < Math.pow(thisRadius,2)) {
                nodeGlyphMap.inputs.get(keys[i]).mouseOver = true;
                mousedDestination = destinationPaths[i];
            } else {
                nodeGlyphMap.inputs.get(keys[i]).mouseOver = false;
            }
        }
    }

    if (mousedSource == "") {
        $('#selectedSource').text(selectedSource);
    } else {
        $('#selectedSource').text(mousedSource);
    }
    if (mousedDestination == "") {
        $('#selectedDestination').text(selectedDestination);
    } else {
        $('#selectedDestination').text(mousedDestination);
    }

}

function updateEdgeMouseState() {

    // hover detection of connections
    // check mouse position against where points are on the bezier equation
    // B(t) = ((1-t)^3)*(P0) + (3*(1-t)^2)*(t)*(P1) + (3*(1-t)*t^2)*(P2) + (t^3)*(P3)
    var keys = edgeGlyphMap.keys();
    var x1, y1, x2, y2;
    var cx1, cy1, cx2, cy2;
    var xs;
    var ys;
    for (var i=0;i<keys.length;i++) {
        x1 = edgeGlyphMap.get(keys[i]).x1;
        y1 = edgeGlyphMap.get(keys[i]).y1;
        x2 = edgeGlyphMap.get(keys[i]).x2;
        y2 = edgeGlyphMap.get(keys[i]).y2;
        cx1 = edgeGlyphMap.get(keys[i]).cx1;
        cy1 = edgeGlyphMap.get(keys[i]).cy1;
        cx2 = edgeGlyphMap.get(keys[i]).cx2;
        cy2 = edgeGlyphMap.get(keys[i]).cy2;
        xs = [x1,cx1,cx2,x2];
        ys = [y1,cy1,cy2,y2];
        xs.sort(function(a,b){return a-b;});
        ys.sort(function(a,b){return a-b;});

        if (gP.mouseX<xs[3] && gP.mouseX>xs[0] &&
                gP.mouseY<ys[3] && gP.mouseY>ys[0]) {
            var xLength = Math.abs(Math.round(x1-x2));
            for (var j=0;j<xLength;j++) {
                var t = j/xLength;

                var microX = (Math.pow(1-t,3)*x1) +
                    (3*Math.pow(1-t,2)*t*cx1) +
                    (3*(1-t)*Math.pow(t,2)*cx2) +
                    (Math.pow(t,3)*x2);
                var microY = (Math.pow(1-t,3)*y1) +
                    (3*Math.pow(1-t,2)*t*cy1) +
                    (3*(1-t)*Math.pow(t,2)*cy2) +
                    (Math.pow(t,3)*y2);
                if (gP.mouseX<microX+4 && gP.mouseX>microX-4 &&
                        gP.mouseY<microY+4 && gP.mouseY>microY-4) {
                    edgeGlyphMap.get(keys[i]).mouseOver = true;
                    break;
                }
                if (j==xLength-1) {
                    edgeGlyphMap.get(keys[i]).mouseOver = false;
                }
            }
        } else {
            edgeGlyphMap.get(keys[i]).mouseOver = false;
        }
    }

}

function updateListGlyphMouseState() {

    var outputSet = getCurrentOutputLevelSet();
    var inputSet = getCurrentInputLevelSet();

    var thisX = 0;
    var thisY = 0;
    var thisWidth = 200;
    var thisHeight = 28;

    var keys = nodeGlyphMap.outputs.keys();
    for (var i=0;i<outputSet.length;i++) {
        thisX = 0;
        thisY = 150+(i*32);
        if (gP.mouseX > thisX && gP.mouseX < thisX+thisWidth && gP.mouseY > thisY && gP.mouseY < thisY+thisHeight) {
            nodeGlyphMap.outputs.get(keys[i]).mouseOver = true;
        } else {
            nodeGlyphMap.outputs.get(keys[i]).mouseOver = false;
        }
    }

    keys = nodeGlyphMap.inputs.keys();
    for (var i=0;i<inputSet.length;i++) {
        thisX = screenWidth-200;
        thisY = 150+(i*32);
        if (gP.mouseX > thisX && gP.mouseX < thisX+thisWidth && gP.mouseY > thisY && gP.mouseY < thisY+thisHeight) {
            nodeGlyphMap.inputs.get(keys[i]).mouseOver = true;
        } else {
            nodeGlyphMap.inputs.get(keys[i]).mouseOver = false;

        }
    }

}

