function layoutCalibrationNodes() {
    with ($('#globalCanvas')) {
        data('node0Width',data('graphWidth')/3.6);
        data('node0Height',data('graphHeight')/3.6);
        data('mainNode0Width',data('node0Width')*1.4);
        data('mainNode0Height',data('node0Height')*1.4);

        for (var currentSide in data('nodes')['root']) {
            var pointer = data('nodes')['root'][currentSide];
            //with (pointer) {
                pointer['main']['x'] = data('graphCenterX');
                pointer['main']['y'] = data('graphCenterY');

                pointer['top']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
                pointer['top']['y'] = data('graphCenterY')-(data('graphHeight')/3)+(data('node0Height')/2+data('node0Height')/10);

                pointer['middle']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
                pointer['middle']['y'] = data('graphCenterY')+(data('graphHeight')/3)-(data('node0Height')/2+data('node0Height')/10);

                pointer['bottom']['x'] = data('graphCenterX');
                pointer['bottom']['y'] = data('graphCenterY')+(data('graphHeight')/2)-(data('node0Height')/2);
            //}

            pointer = data('nodes')['root']['right'];
            //with (pointer) {
                pointer['main']['x'] = data('graphCenterX');
                pointer['main']['y'] = data('graphCenterY');

                pointer['top']['x'] = data('graphCenterX');
                pointer['top']['y'] = data('graphCenterY')-(data('graphHeight')/2)+(data('node0Height')/2);

                pointer['middle']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
                pointer['middle']['y'] = data('graphCenterY')-(data('graphHeight')/3)+(data('node0Height')/2+data('node0Height')/10);

                pointer['bottom']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
                pointer['bottom']['y'] = data('graphCenterY')+(data('graphHeight')/3)-(data('node0Height')/2+data('node0Height')/10);
            //}
        }
    }
}
function layoutSmallCalibrationNodes() {
    with ($('#globalCanvas')) {
        data('node1Width',data('node0Width')/3.6);
        data('node1Height',data('node0Width')/3.6);
        data('mainNode1Width',data('node1Width')*1.4);
        data('mainNode1Height',data('node1Height')*1.4);

        for (var currentSide in data('nodes')['root']) {

            for(var currentNode in data('nodes')['root'][currentSide]) {
                var pointer = data('nodes')['root'][currentSide][currentNode];
                if (pointer['terminal'] === undefined || pointer['terminal'] === true) {
                    continue;
                }
                //with (pointer) { 
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
                //}
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

        for (var currentSide in data('nodes')['root']) {

            for(var currentBranch in data('nodes')['root'][currentSide]) {
                if (data('nodes')['root'][currentSide][currentBranch]['terminal'] === undefined || data('nodes')['root'][currentSide][currentBranch]['terminal'] === true) {
                    continue;
                }

                for(var currentNode in data('nodes')['root'][currentSide][currentBranch]) {
                    var pointer = data('nodes')['root'][currentSide][currentBranch][currentNode];
                    if (pointer['terminal'] === undefined || pointer['terminal'] === true) {
                        continue;
                    }
                    //console.log(currentSide+' '+currentBranch+' '+currentNode);
                    //with (pointer) { 
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
                    //}
                }
            }
        }
    }
}
