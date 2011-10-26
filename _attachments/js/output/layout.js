function layoutCalibrationNodes() {
    with ($('#globalCanvas')) {
        data('node0Width',data('graphWidth')/3.6);
        data('node0Height',data('graphHeight')/3.6);
        data('mainNode0Width',data('node0Width')*1.4);
        data('mainNode0Height',data('node0Height')*1.4);

        var pointer;

        // set 0 pointer to left side
        pointer = data('layouts')['root']['left'];
        pointer['main']['x'] = data('graphCenterX');
        pointer['main']['y'] = data('graphCenterY');

        pointer['top']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
        pointer['top']['y'] = data('graphCenterY')-(data('graphHeight')/3)+(data('node0Height')/2+data('node0Height')/10);

        pointer['middle']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
        pointer['middle']['y'] = data('graphCenterY')+(data('graphHeight')/3)-(data('node0Height')/2+data('node0Height')/10);

        pointer['bottom']['x'] = data('graphCenterX');
        pointer['bottom']['y'] = data('graphCenterY')+(data('graphHeight')/2)-(data('node0Height')/2);

        // set 0 pointer to right side
        pointer = data('layouts')['root']['right'];
        pointer['main']['x'] = data('graphCenterX');
        pointer['main']['y'] = data('graphCenterY');

        pointer['top']['x'] = data('graphCenterX');
        pointer['top']['y'] = data('graphCenterY')-(data('graphHeight')/2)+(data('node0Height')/2);

        pointer['middle']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
        pointer['middle']['y'] = data('graphCenterY')-(data('graphHeight')/3)+(data('node0Height')/2+data('node0Height')/10);

        pointer['bottom']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
        pointer['bottom']['y'] = data('graphCenterY')+(data('graphHeight')/3)-(data('node0Height')/2+data('node0Height')/10);
    }
}
function layoutSmallCalibrationNodes() {
    with ($('#globalCanvas')) {
        data('node1Width',data('node0Width')/3.6);
        data('node1Height',data('node0Width')/3.6);
        data('mainNode1Width',data('node1Width')*1.4);
        data('mainNode1Height',data('node1Height')*1.4);

        var pointer;
        for (var currentSide in data('layouts')['root']) {
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

                    pointer['top']['x'] =
                    pointer['x']-
                    data('node0Width')/2.2+
                        data('node1Width')/2;
                    pointer['top']['y'] =
                    pointer['y']-
                    data('node0Height')/3+
                        data('node1Height')/2+
                        data('node1Height')/10;

                    pointer['middle']['x'] =
                    pointer['x']-
                    data('node0Width')/2.2+
                        data('node1Width')/2;
                    pointer['middle']['y'] =
                    pointer['y']+
                        data('node0Height')/3-
                    data('node1Height')/2-
                    data('node1Height')/10;

                    pointer['bottom']['x'] =
                    pointer['x'];
                    pointer['bottom']['y'] =
                    pointer['y']+
                        data('node0Height')/2-
                    data('node1Height')/2;
                } else if (currentSide === 'right') {
                    pointer['main']['x'] = pointer['x'];
                    pointer['main']['y'] = pointer['y'];

                    pointer['top']['x'] =
                    pointer['x'];
                    pointer['top']['y'] =
                    pointer['y']-
                    data('node0Height')/2+
                        data('node1Height')/2;

                    pointer['middle']['x'] =
                    pointer['x']+
                        data('node0Width')/2.2-
                    data('node1Width')/2;
                    pointer['middle']['y'] =
                    pointer['y']-
                    data('node0Height')/3+
                        data('node1Height')/2+
                        data('node1Height')/10;

                    pointer['bottom']['x'] =
                    pointer['x']+
                        data('node0Width')/2.2-
                    data('node1Width')/2;
                    pointer['bottom']['y'] =
                    pointer['y']+
                        data('node0Height')/3-
                    data('node1Height')/2-
                    data('node1Height')/10;
                }
            }
        }
    }
}
function layoutSmallerCalibrationNodes() {
    with ($('#globalCanvas')) {
        data('node2Width',data('node1Width')/3.6);
        data('node2Height',data('node1Width')/3.6);
        data('mainNode2Width',data('node2Width')*1.4);
        data('mainNode2Height',data('node2Height')*1.4);

        var pointer;
        for (var currentSide in data('layouts')['root']) {
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

                        pointer['top']['x'] =
                        pointer['x']-
                        data('node1Width')/2.2+
                            data('node2Width')/2;
                        pointer['top']['y'] =
                        pointer['y']-
                        data('node1Height')/3+
                            data('node2Height')/2+
                            data('node2Height')/10;

                        pointer['middle']['x'] =
                        pointer['x']-
                        data('node1Width')/2.2+
                            data('node2Width')/2;
                        pointer['middle']['y'] =
                        pointer['y']+
                            data('node1Height')/3-
                        data('node2Height')/2-
                        data('node2Height')/10;

                        pointer['bottom']['x'] =
                        pointer['x'];
                        pointer['bottom']['y'] =
                        pointer['y']+
                            data('node1Height')/2-
                        data('node2Height')/2;

                    } else if (currentSide === 'right') {
                        pointer['main']['x'] = pointer['x'];
                        pointer['main']['y'] = pointer['y'];

                        pointer['top']['x'] =
                        pointer['x'];
                        pointer['top']['y'] =
                        pointer['y']-
                        data('node1Height')/2+
                            data('node2Height')/2;

                        pointer['middle']['x'] =
                        pointer['x']+
                            data('node1Width')/2.2-
                        data('node2Width')/2;
                        pointer['middle']['y'] =
                        pointer['y']-
                        data('node1Height')/3+
                            data('node2Height')/2+
                            data('node2Height')/10;

                        pointer['bottom']['x'] =
                        pointer['x']+
                            data('node1Width')/2.2-
                        data('node2Width')/2;
                        pointer['bottom']['y'] =
                        pointer['y']+
                            data('node1Height')/3-
                        data('node2Height')/2-
                        data('node2Height')/10;
                    }
                }
            }
        }
    }
}
