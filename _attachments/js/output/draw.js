function drawLogo() {
    with ($('#globalCanvas')) {
        gP.fill(102,85,119);
        gP.textFont(data('font'),24);
        gP.text('toimawb',data('canvasWidth')-120,74);

        var x = data('canvasWidth')-50;
        var y = 120;

        var width = 70;
        var smallWidth = 13;

        gP.fill(102,85,119);
        gP.noStroke();
        gP.ellipse(x,y,width,width);

        // eyes
        gP.fill(0,0,0);
        gP.ellipse(x-16,y-12,smallWidth,smallWidth);
        gP.ellipse(x+16,y-12,smallWidth,smallWidth);

        gP.fill(102,85,119);
        gP.ellipse(x-16,y-8,smallWidth-3,smallWidth-3);
        gP.ellipse(x+16,y-8,smallWidth-3,smallWidth-3);

        // third eye
        gP.fill(0,0,0);
        gP.ellipse(x,y-21,smallWidth,smallWidth);

        gP.fill(102,85,119);
        gP.ellipse(x,y-25,smallWidth-3,smallWidth-3);

        // mouth
        gP.fill(0,0,0);
        gP.arc(x,y,width-20,width-20,0,gP.PI);
        gP.fill(102,85,119);
        gP.arc(x,y,width-20,width-40,0,gP.PI);

        // teeth
        gP.stroke(102,85,119);
        gP.line(x,y+19,x,y+30);
        gP.line(x-8,y+14,x-8,y+21);
        gP.line(x+8,y+14,x+8,y+21);
    }
}

function drawAboutButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['about'];

        gP.textFont(data('font'),24);

        gP.noStroke();
        gP.fill(255,255,255);
        gP.rect(pointer['x'],pointer['y'],
        pointer['width'],pointer['height']);

        gP.fill(0);
        gP.text('about',pointer['x']+10,pointer['y']+28);
    }
}
function drawHelpButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['help'];

        gP.textFont(data('font'),24);

        gP.noStroke();
        gP.fill(255,255,255);
        gP.rect(pointer['x'],pointer['y'],
        pointer['width'],pointer['height']);

        gP.fill(0);
        gP.text('help',pointer['x']+18,pointer['y']+28);
    }
}


function drawAscendButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['ascend'];

        gP.noStroke();
        gP.fill(255,255,255);
        gP.triangle(pointer['x'],pointer['y'],
            pointer['x']+pointer['width'],pointer['y'],
        pointer['x'],pointer['y']+pointer['height']);

        gP.strokeWeight(3);
        gP.stroke(0,0,0);
        gP.line(pointer['x']+50,pointer['y']+10,
        pointer['x']+50,pointer['y']+60);
        gP.line(pointer['x']+50,pointer['y']+10,pointer['x']+60,pointer['y']+20);
        gP.line(pointer['x']+50,pointer['y']+10,pointer['x']+40,pointer['y']+20);

        gP.textFont(data('font'),24);

        gP.fill(0);
        if (data('views')['root']['left']['active']) {
            gP.fill(255,0,0);
        } 
        if (data('views')['root']['left']['position'] > 1) {
            gP.text(data('views')['root']['left']['position']-1,pointer['x']+20,pointer['y']+50);
        }

        gP.fill(0);
        if (data('views')['root']['right']['active']) {
            gP.fill(255,0,0);
        }
        if (data('views')['root']['right']['position'] > 1) {
            gP.text(data('views')['root']['right']['position']-1,pointer['x']+70,pointer['y']+50);
        }
    }
}
function drawDescendButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['descend'];

        gP.noStroke();
        gP.fill(255,255,255);
        gP.triangle(pointer['x'],pointer['y']+pointer['height'],
        pointer['x'],pointer['y'],
        pointer['x']+pointer['width'],pointer['y']+pointer['height']);

        gP.strokeWeight(3);
        gP.stroke(0,0,0);
        gP.line(pointer['x']+50,pointer['y']+140,
        pointer['x']+50,pointer['y']+90);
        gP.line(pointer['x']+50,pointer['y']+140,
        pointer['x']+60,pointer['y']+130);
        gP.line(pointer['x']+50,pointer['y']+140,
        pointer['x']+40,pointer['y']+130);

        gP.textFont(data('font'),24);

        gP.fill(0);
        if (data('views')['root']['left']['active']) {
            gP.fill(255,0,0);
        } 
        if (data('views')['root']['left']['position'] < 3) {
            gP.text(data('views')['root']['left']['position']+1,pointer['x']+20,pointer['y']+pointer['height']-30);
        }

        gP.fill(0);
        if (data('views')['root']['right']['active']) {
            gP.fill(255,0,0);
        }
        if (data('views')['root']['right']['position'] < 3) {
            gP.text(data('views')['root']['right']['position']+1,pointer['x']+70,pointer['y']+pointer['height']-30);
        }
    }
}
function drawSignalButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['signal'];

        gP.noStroke();
        gP.fill(255,255,255);
        gP.triangle(pointer['x']+pointer['width'],pointer['y']+pointer['height'],
        pointer['x'],pointer['y']+pointer['height'],
        pointer['x']+pointer['width'],pointer['y']);

        gP.fill(0,0,0);
        gP.arc(pointer['x']+110,pointer['y']+110,
        60,60,0,2*2*Math.PI/3);
    }
}



function drawBigNode() {
    with ($('#globalCanvas')) {

        // choose fill
        gP.fill(255,255,255);

        // choose left stroke
        /*
        if (data('layouts')['root']['left']['moused']) {
            gP.strokeWeight(6);
            gP.stroke(127,127,127);
        } 
        */
        gP.strokeWeight(6);
        if (data('views')['root']['left']['active']) {
            gP.stroke(127,0,0);
        } else {
            gP.noStroke();
        }

        // paint left arc
        gP.arc(data('graphCenterX'),
        data('graphCenterY'),
        data('graphWidth'),
        data('graphHeight'),
        2*Math.PI/3-Math.PI/3,
        2*2*Math.PI/3);

        // choose right stroke
        /*
        if (data('layouts')['root']['right']['moused']) {
            gP.strokeWeight(6);
            gP.stroke(127,127,127);
        } 
        */
        if (data('views')['root']['right']['active']) {
            gP.stroke(127,0,0);
        } else {
            gP.noStroke();
        }

        // paint right arc
        gP.arc(data('graphCenterX'),
        data('graphCenterY'),
        data('graphWidth'),
        data('graphHeight'),
        -Math.PI/2-Math.PI/6,
        Math.PI-2*Math.PI/3);
    }
}
function drawBigBisect() {
    with ($('#globalCanvas')) {
        //paint bisecting line
        gP.strokeWeight(1);
        gP.stroke(0,0,0);
        gP.line(data('graphCenterX')-(data('graphWidth')/2/2),
        data('graphCenterY')-(data('graphHeight')/2*Math.sqrt(3)/2), 
        data('graphCenterX')+(data('graphWidth')/2/2),
        data('graphCenterY')+(data('graphHeight')/2*Math.sqrt(3)/2));
    }
}
function drawNodes(side) {
    gP.strokeWeight(1);
    gP.fill(0,0,0);

    with ($('#globalCanvas')) {
        var nodesPointer;
        var layoutsPointer;

        // set 0 pointers
        nodesPointer = data('nodes')['root'][side]['main'];
        layoutsPointer = data('layouts')['root'][side]['main'];

        // choose stroke
        gP.strokeWeight(6);
        if (data('views')['root'][side]['main']['active']) {
            gP.stroke(127,0,0);
        } else if (layoutsPointer['moused']) {
            gP.stroke(127,127,127);
        } else {
            gP.noStroke();
        }

        //choose fill
        switch (nodesPointer['color']) {
            case 'none':
                gP.fill(0,0,0);
                break;
            case 'red':
                gP.fill(255,0,0);
                break;
            case 'green':
                gP.fill(0,255,0);
                break;
            case 'blue':
                gP.fill(0,0,255);
                break;
        }

        // draw level 0 main arcs
        if (side === 'left') {
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width'),
                data('mainNode0Height'),
                (Math.PI/3)+(Math.PI/3/4),
                (2*Math.PI/3)-(Math.PI/3/4));
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width'),
                data('mainNode0Height'),
                (2*Math.PI/3)+(Math.PI/3/4),
                (3*Math.PI/3)-(Math.PI/3/4));
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width'),
                data('mainNode0Height'),
                (3*Math.PI/3)+(Math.PI/3/4),
                (4*Math.PI/3)-(Math.PI/3/4));

            gP.noStroke();
            gP.fill(255);
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width')/2,
                data('mainNode0Height')/2,
                2*Math.PI/3-Math.PI/3,
                2*2*Math.PI/3
            );
        } else if (side === 'right') {
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width'),
                data('mainNode0Height'),
                (4*Math.PI/3)+(Math.PI/3/4),
                (5*Math.PI/3)-(Math.PI/3/4));
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width'),
                data('mainNode0Height'),
                (5*Math.PI/3)+(Math.PI/3/4),
                (6*Math.PI/3)-(Math.PI/3/4));
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width'),
                data('mainNode0Height'),
                (6*Math.PI/3)+(Math.PI/3/4),
                (7*Math.PI/3)-(Math.PI/3/4));

            gP.noStroke();
            gP.fill(255);
            gP.arc(layoutsPointer['x'],
                layoutsPointer['y'],
                data('mainNode0Width')/2,
                data('mainNode0Height')/2,
                -Math.PI/2-Math.PI/6,
                Math.PI-2*Math.PI/3
            );
        }

        for(var currentNode in data('nodes')['root'][side]) {
            // set 1 pointers
            nodesPointer = data('nodes')['root'][side][currentNode];
            layoutsPointer = data('layouts')['root'][side][currentNode];
            // skip simple nodes
            if (nodesPointer['complex'] === undefined || nodesPointer['complex'] === false) {
                continue;
            }

            // choose stroke
            gP.strokeWeight(6);
            if (data('views')['root'][side][currentNode]['active']) {
                gP.stroke(127,0,0);
            } else if (layoutsPointer['moused']) {
                gP.stroke(127,127,127);
            } else {
                gP.noStroke();
            }


            // choose fill
            switch (nodesPointer['color']) {
                case 'none':
                    gP.fill(0,0,0);
                    break;
                case 'red':
                    gP.fill(255,0,0);
                    break;
                case 'green':
                    gP.fill(0,255,0);
                    break;
                case 'blue':
                    gP.fill(0,0,255);
                    break;
            }

            // paint node
            gP.ellipse(layoutsPointer['x'],
                layoutsPointer['y'],
                data('node0Width'),
                data('node0Height')
            );
            // half circle
            if (side == 'left') {
                gP.fill(255);
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    9*data('node0Width')/10,
                    9*data('node0Height')/10,
                    -Math.PI/2-Math.PI/6,
                    Math.PI-2*Math.PI/3
                );
            } else if (side == 'right') {
                gP.fill(255);
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    9*data('node0Width')/10,
                    9*data('node0Height')/10,
                    Math.PI/2-Math.PI/6,
                    Math.PI+Math.PI/3
                );
            }

            gP.strokeWeight(1);
            gP.stroke(255,255,255);
            // paint bisector
            gP.line(layoutsPointer['x']-(data('node0Width')/2/2),
            layoutsPointer['y']-(data('node0Height')/2*Math.sqrt(3)/2), 
            layoutsPointer['x']+(data('node0Width')/2/2),
            layoutsPointer['y']+(data('node0Height')/2*Math.sqrt(3)/2)
            );
        }
    }
}
function drawSmallNodes(side) {
    gP.strokeWeight(1);
    gP.fill(255,255,255);

    with ($('#globalCanvas')) {
        var nodesPointer;
        var layoutsPointer;

        for (var currentBranch in data('nodes')['root'][side]) {
            // set 1 pointers
            nodesPointer = data('nodes')['root'][side][currentBranch];
            // skip simple nodes
            if (nodesPointer['complex'] === undefined || nodesPointer['complex'] === false) {
                continue;
            }
            layoutsPointer = data('layouts')['root'][side][currentBranch]['main'];

            // paint left and right main nodes
            if (side === 'left') {
                gP.noStroke();
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width'),
                    data('mainNode1Height'),
                    (Math.PI/3)+(Math.PI/3/4),
                    (2*Math.PI/3)-(Math.PI/3/4)
                );
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width'),
                    data('mainNode1Height'),
                    (2*Math.PI/3)+(Math.PI/3/4),
                    (3*Math.PI/3)-(Math.PI/3/4)
                );
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width'),
                    data('mainNode1Height'),
                    (3*Math.PI/3)+(Math.PI/3/4),
                    (4*Math.PI/3)-(Math.PI/3/4)
                );

                gP.noStroke();
                gP.fill(0);
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width')/2,
                    data('mainNode1Height')/2,
                    2*Math.PI/3-Math.PI/3,
                2*2*Math.PI/3);
                gP.fill(255);
            } else if (side === 'right') {
                gP.noStroke();
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width'),
                    data('mainNode1Height'),
                    (4*Math.PI/3)+(Math.PI/3/4),
                    (5*Math.PI/3)-(Math.PI/3/4)
                );
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width'),
                    data('mainNode1Height'),
                    (5*Math.PI/3)+(Math.PI/3/4),
                    (6*Math.PI/3)-(Math.PI/3/4)
                );
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width'),
                    data('mainNode1Height'),
                    (6*Math.PI/3)+(Math.PI/3/4),
                    (7*Math.PI/3)-(Math.PI/3/4)
                );

                gP.noStroke();
                gP.fill(0);
                gP.arc(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('mainNode1Width')/2,
                    data('mainNode1Height')/2,
                    -Math.PI/2-Math.PI/6,
                Math.PI-2*Math.PI/3);
                gP.fill(255);
            }

            for(var currentNode in data('nodes')['root'][side][currentBranch]) {
                // set 2 pointers
                nodesPointer = data('nodes')['root'][side][currentBranch][currentNode];
                layoutsPointer = data('layouts')['root'][side][currentBranch][currentNode];
                // skip simple nodes
                if (nodesPointer['complex'] === undefined || nodesPointer['complex'] === false) {
                    continue;
                }
                // paint node
                gP.noStroke();
                gP.ellipse(layoutsPointer['x'],
                    layoutsPointer['y'],
                    data('node1Width'),
                    data('node1Height')
                );

                // half circle
                if (side == 'left') {
                    gP.fill(0);
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        9*data('node1Width')/10,
                        9*data('node1Height')/10,
                        -Math.PI/2-Math.PI/6,
                        Math.PI-2*Math.PI/3
                    );
                } else if (side == 'right') {
                    gP.fill(0);
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        9*data('node1Width')/10,
                        9*data('node1Height')/10,
                        Math.PI/2-Math.PI/6,
                        Math.PI+Math.PI/3
                    );
                }
                gP.fill(255);

                // paint bisector 
                gP.stroke(0,0,0);
                gP.line(layoutsPointer['x']-(data('node1Width')/2/2),
                layoutsPointer['y']-(data('node1Height')/2*Math.sqrt(3)/2), 
                layoutsPointer['x']+(data('node1Width')/2/2),
                layoutsPointer['y']+(data('node1Height')/2*Math.sqrt(3)/2));
            }
        }
    }
}
function drawSmallerNodes(side) {
    gP.noStroke();
    gP.fill(0,0,0);

    with ($('#globalCanvas')) {
        var nodesPointer;
        var layoutsPointer;

        for (var currentBranch in data('nodes')['root'][side]) {
            // set 1 pointer
            nodesPointer = data('nodes')['root'][side][currentBranch];
            // skip simple nodes
            if (nodesPointer['complex'] === undefined || nodesPointer['complex'] === false) {
                continue;
            }

            for (var currentNode in data('nodes')['root'][side][currentBranch]) {
                // set 2 pointers
                nodesPointer = data('nodes')['root'][side][currentBranch][currentNode];
                // skip simple nodes
                if (nodesPointer['complex'] === undefined || nodesPointer['complex'] === false) {
                    continue;
                }
                layoutsPointer = data('layouts')['root'][side][currentBranch][currentNode]['main'];

                // left and right main nodes
                if (side === 'left') {
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width'),
                        data('mainNode2Height'),
                        (Math.PI/3)+(Math.PI/3/4),
                        (2*Math.PI/3)-(Math.PI/3/4)
                    );
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width'),
                        data('mainNode2Height'),
                        (2*Math.PI/3)+(Math.PI/3/4),
                        (3*Math.PI/3)-(Math.PI/3/4)
                    );
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width'),
                        data('mainNode2Height'),
                        (3*Math.PI/3)+(Math.PI/3/4),
                        (4*Math.PI/3)-(Math.PI/3/4)
                    );

                    gP.noStroke();
                    gP.fill(255);
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width')/2,
                        data('mainNode2Height')/2,
                        2*Math.PI/3-Math.PI/3,
                    2*2*Math.PI/3);
                    gP.fill(0);
                } else if (side === 'right') {
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width'),
                        data('mainNode2Height'),
                        (4*Math.PI/3)+(Math.PI/3/4),
                        (5*Math.PI/3)-(Math.PI/3/4)
                    );
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width'),
                        data('mainNode2Height'),
                        (5*Math.PI/3)+(Math.PI/3/4),
                        (6*Math.PI/3)-(Math.PI/3/4)
                    );
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width'),
                        data('mainNode2Height'),
                        (6*Math.PI/3)+(Math.PI/3/4),
                        (7*Math.PI/3)-(Math.PI/3/4)
                    );

                    gP.noStroke();
                    gP.fill(255);
                    gP.arc(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('mainNode2Width')/2,
                        data('mainNode2Height')/2,
                        -Math.PI/2-Math.PI/6,
                    Math.PI-2*Math.PI/3);
                    gP.fill(0);
                }

                for (var currentPoint in data('nodes')['root'][side][currentBranch][currentNode]) {
                    // set 3 pointers
                    nodesPointer = data('nodes')['root'][side][currentBranch][currentNode][currentPoint];
                    layoutsPointer = data('layouts')['root'][side][currentBranch][currentNode][currentPoint];
                    // skip simple nodes
                    if (nodesPointer['complex'] === undefined || nodesPointer['complex'] === false) {
                        continue;
                    }

                    gP.ellipse(layoutsPointer['x'],
                        layoutsPointer['y'],
                        data('node2Width'),
                        data('node2Height'));
                }
            }
        }
    }
}

/*
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
*/
