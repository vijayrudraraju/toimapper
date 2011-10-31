function layoutButtons() {
    with ($('#globalCanvas')) {
        var pointer = data('layouts')['root']['buttons']; 

        pointer['about']['x'] = data('canvasWidth')-162;
        pointer['about']['y'] = 0;
        pointer['about']['width'] = 80;
        pointer['about']['height'] = 40;

        pointer['help']['x'] = data('canvasWidth')-80;
        pointer['help']['y'] = 0;
        pointer['help']['width'] = 80;
        pointer['help']['height'] = 40;
        
        pointer['ascend']['x'] = 0;
        pointer['ascend']['y'] = 0;
        pointer['ascend']['width'] = 150;
        pointer['ascend']['height'] = 150;
        
        pointer['descend']['x'] = 0;
        pointer['descend']['y'] = data('canvasHeight')-150;
        pointer['descend']['width'] = 150;
        pointer['descend']['height'] = 150;
        
        pointer['signal']['x'] = data('canvasWidth')-150;
        pointer['signal']['y'] = data('canvasHeight')-150;
        pointer['signal']['width'] = 150;
        pointer['signal']['height'] = 150;
    }
}

function layoutNodes() {
    with ($('#globalCanvas')) {
        data('node0Width',data('graphWidth')*0.3);
        data('node0Height',data('graphHeight')*0.3);
        data('mainNode0Width',data('node0Width')*1.0);
        data('mainNode0Height',data('node0Height')*1.0);

        var pointer;

        // set 0 pointer to left side
        pointer = data('layouts')['root']['left'];
        pointer['main']['x'] = data('graphCenterX');
        pointer['main']['y'] = data('graphCenterY');
        pointer['main']['width'] = data('mainNode0Width');
        pointer['main']['height'] = data('mainNode0Height');

        pointer['top']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
        pointer['top']['y'] = data('graphCenterY')-(data('graphHeight')*0.32)+(data('node0Height')*0.5);
        pointer['top']['width'] = data('node0Width');
        pointer['top']['height'] = data('node0Height');

        pointer['middle']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
        pointer['middle']['y'] = data('graphCenterY')+(data('graphHeight')*0.32)-(data('node0Height')*0.5);
        pointer['middle']['width'] = data('node0Width');
        pointer['middle']['height'] = data('node0Height');

        pointer['bottom']['x'] = data('graphCenterX');
        pointer['bottom']['y'] = data('graphCenterY')+(data('graphHeight')*0.5)-(data('node0Height')*0.5);
        pointer['bottom']['width'] = data('node0Width');
        pointer['bottom']['height'] = data('node0Height');

        // set 0 pointer to right side
        pointer = data('layouts')['root']['right'];
        pointer['main']['x'] = data('graphCenterX');
        pointer['main']['y'] = data('graphCenterY');
        pointer['main']['width'] = data('mainNode0Width');
        pointer['main']['height'] = data('mainNode0Height');

        pointer['top']['x'] = data('graphCenterX');
        pointer['top']['y'] = data('graphCenterY')-(data('graphHeight')/2)+(data('node0Height')/2);
        pointer['top']['width'] = data('node0Width');
        pointer['top']['height'] = data('node0Height');

        pointer['middle']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
        pointer['middle']['y'] = data('graphCenterY')-(data('graphHeight')*0.32)+(data('node0Height')*0.5);
        pointer['middle']['width'] = data('node0Width');
        pointer['middle']['height'] = data('node0Height');

        pointer['bottom']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
        pointer['bottom']['y'] = data('graphCenterY')+(data('graphHeight')*0.32)-(data('node0Height')*0.5);
        pointer['bottom']['width'] = data('node0Width');
        pointer['bottom']['height'] = data('node0Height');
    }
}
function layoutSmallNodes() {
    with ($('#globalCanvas')) {
        data('node1Width',data('node0Width')*0.3);
        data('node1Height',data('node0Width')*0.3);
        data('mainNode1Width',data('node1Width')*1);
        data('mainNode1Height',data('node1Height')*1);

        var pointer;
        for (var currentSide in data('layouts')['root']) {
            pointer = data('layouts')['root'][currentSide];
            // skip simple layouts
            if (pointer['complex'] === undefined || pointer['complex'] === false) {
                continue;
            }
            for(var currentNode in data('layouts')['root'][currentSide]) {
                // set 1 pointer
                pointer = data('layouts')['root'][currentSide][currentNode];
                // skip simple layouts
                if (pointer['complex'] === undefined || pointer['complex'] === false) {
                    continue;
                }
                if (currentSide === 'left') {
                    pointer['main']['x'] = pointer['x'];
                    pointer['main']['y'] = pointer['y'];
                    pointer['main']['width'] = data('mainNode1Width');
                    pointer['main']['height'] = data('mainNode1Height');

                    pointer['top']['x'] =
                    pointer['x']-
                    data('node0Width')/2.2+
                        data('node1Width')/2;
                    pointer['top']['y'] =
                    pointer['y']-
                    data('node0Height')*0.32+
                        data('node1Height')*0.5;
                    pointer['top']['width'] = data('node1Width');
                    pointer['top']['height'] = data('node1Height');

                    pointer['middle']['x'] =
                    pointer['x']-
                    data('node0Width')/2.2+
                        data('node1Width')/2;
                    pointer['middle']['y'] =
                    pointer['y']+
                        data('node0Height')*0.32-
                    data('node1Height')*0.5;
                    pointer['middle']['width'] = data('node1Width');
                    pointer['middle']['height'] = data('node1Height');

                    pointer['bottom']['x'] =
                    pointer['x'];
                    pointer['bottom']['y'] =
                    pointer['y']+
                        data('node0Height')/2-
                    data('node1Height')/2;
                    pointer['bottom']['width'] = data('node1Width');
                    pointer['bottom']['height'] = data('node1Height');
                } else if (currentSide === 'right') {
                    pointer['main']['x'] = pointer['x'];
                    pointer['main']['y'] = pointer['y'];
                    pointer['main']['width'] = data('mainNode1Width');
                    pointer['main']['height'] = data('mainNode1Height');

                    pointer['top']['x'] =
                    pointer['x'];
                    pointer['top']['y'] =
                    pointer['y']-
                    data('node0Height')/2+
                        data('node1Height')/2;
                    pointer['top']['width'] = data('node1Width');
                    pointer['top']['height'] = data('node1Height');

                    pointer['middle']['x'] =
                    pointer['x']+
                        data('node0Width')/2.2-
                    data('node1Width')/2;
                    pointer['middle']['y'] =
                    pointer['y']-
                    data('node0Height')*0.32+
                        data('node1Height')*0.5;
                    pointer['middle']['width'] = data('node1Width');
                    pointer['middle']['height'] = data('node1Height');

                    pointer['bottom']['x'] =
                    pointer['x']+
                        data('node0Width')/2.2-
                    data('node1Width')/2;
                    pointer['bottom']['y'] =
                    pointer['y']+
                        data('node0Height')*0.32-
                    data('node1Height')*0.5;
                    pointer['bottom']['width'] = data('node1Width');
                    pointer['bottom']['height'] = data('node1Height');
                }
            }
        }
    }
}
function layoutSmallerNodes() {
    with ($('#globalCanvas')) {
        data('node2Width',data('node1Width')*0.3);
        data('node2Height',data('node1Width')*0.3);
        data('mainNode2Width',data('node2Width')*1);
        data('mainNode2Height',data('node2Height')*1);

        var pointer;
        for (var currentSide in data('layouts')['root']) {
            pointer = data('layouts')['root'][currentSide];
            // skip simple layouts
            if (pointer['complex'] === undefined || pointer['complex'] === false) {
                continue;
            }
            for(var currentBranch in data('layouts')['root'][currentSide]) {
                // set 1 pointer
                pointer = data('layouts')['root'][currentSide][currentBranch];
                // skip simple layouts
                if (pointer['complex'] === undefined || pointer['complex'] === false) {
                    continue;
                }

                for(var currentNode in data('layouts')['root'][currentSide][currentBranch]) {
                    // set 2 pointer
                    pointer = data('layouts')['root'][currentSide][currentBranch][currentNode];
                    // skip simple layouts
                    if (pointer['complex'] === undefined || pointer['complex'] === false) {
                        continue;
                    }

                    if (currentSide === 'left') {
                        pointer['main']['x'] = pointer['x'];
                        pointer['main']['y'] = pointer['y'];
                        pointer['main']['width'] = data('mainNode2Width');
                        pointer['main']['height'] = data('mainNode2Height');

                        pointer['top']['x'] =
                        pointer['x']-
                        data('node1Width')/2.2+
                            data('node2Width')/2;
                        pointer['top']['y'] =
                        pointer['y']-
                        data('node1Height')*0.32+
                            data('node2Height')*0.5;
                        pointer['top']['width'] = data('node2Width');
                        pointer['top']['height'] = data('node2Height');

                        pointer['middle']['x'] =
                        pointer['x']-
                        data('node1Width')/2.2+
                            data('node2Width')/2;
                        pointer['middle']['y'] =
                        pointer['y']+
                            data('node1Height')*0.32-
                        data('node2Height')*0.5;
                        pointer['middle']['width'] = data('node2Width');
                        pointer['middle']['height'] = data('node2Height');

                        pointer['bottom']['x'] =
                        pointer['x'];
                        pointer['bottom']['y'] =
                        pointer['y']+
                            data('node1Height')/2-
                        data('node2Height')/2;
                        pointer['bottom']['width'] = data('node2Width');
                        pointer['bottom']['height'] = data('node2Height');
                    } else if (currentSide === 'right') {
                        pointer['main']['x'] = pointer['x'];
                        pointer['main']['y'] = pointer['y'];
                        pointer['main']['width'] = data('mainNode2Width');
                        pointer['main']['height'] = data('mainNode2Height');

                        pointer['top']['x'] =
                        pointer['x'];
                        pointer['top']['y'] =
                        pointer['y']-
                        data('node1Height')/2+
                            data('node2Height')/2;
                        pointer['top']['width'] = data('node2Width');
                        pointer['top']['height'] = data('node2Height');

                        pointer['middle']['x'] =
                        pointer['x']+
                            data('node1Width')/2.2-
                        data('node2Width')/2;
                        pointer['middle']['y'] =
                        pointer['y']-
                        data('node1Height')*0.32+
                            data('node2Height')*0.5;
                        pointer['middle']['width'] = data('node2Width');
                        pointer['middle']['height'] = data('node2Height');

                        pointer['bottom']['x'] =
                        pointer['x']+
                            data('node1Width')/2.2-
                        data('node2Width')/2;
                        pointer['bottom']['y'] =
                        pointer['y']+
                            data('node1Height')*0.32-
                        data('node2Height')*0.5;
                        pointer['bottom']['width'] = data('node2Width');
                        pointer['bottom']['height'] = data('node2Height');
                    }
                }
            }
        }
    }
}
