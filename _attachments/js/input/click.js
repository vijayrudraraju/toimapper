function detectAboutButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['about']['moused']) {
        if ($('#aboutSwitch').data('isAbouting')) {
            console.log('aboutSwitch deactivated');
            $('#aboutSwitch').trigger('deactivateabout');
        } else {
            $('#aboutSwitch').trigger('activateabout');
        }
    }
}
function detectHelpButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['help']['moused']) {
        if ($('#helpSwitch').data('isHelping')) {
            $('#helpSwitch').trigger('deactivatehelp');
        } else {
            $('#helpSwitch').trigger('activatehelp');
        }
    }
}
function detectAscendButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['ascend']['moused']) {
        $('#globalCanvas').trigger('ascend');
    }
}
function detectDescendButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['descend']['moused']) {
        $('#globalCanvas').trigger('descend');
    }
}

function detectNodesClick() {
    with ($('#globalCanvas')) {
        var thisNode;
        var thisLayout;
        var thisView;
        for (var currentSide in data('nodes')['root']) {
            // set 0 pointer
            thisNode = data('nodes')['root'][currentSide];
            thisLayout = data('layouts')['root'][currentSide];
            thisView = data('views')['root'][currentSide];

            // skip simple layouts
            if (thisNode['complex'] === undefined || thisNode['complex'] === false) {
                continue;
            }

            if (currentSide === 'left') {
                if (thisLayout['moused']) {
                    if (thisView['active']) {
                        flipNodeColor(thisNode);
                    }
                    //thisNode['active'] = true;
                    thisView['active'] = true;
                } else {
                    //thisNode['active'] = false;
                    thisView['active'] = false;
                }
            } else if (currentSide === 'right') {
                if (thisLayout['moused']) {
                    if (thisView['active']) {
                        flipNodeColor(thisNode);
                    }
                    //thisNode['active'] = true;
                    thisView['active'] = true;
                } else {
                    //thisNode['active'] = false;
                    thisView['active'] = false;
                }
            }

            for(var currentNode in data('nodes')['root'][currentSide]) {
                // set 1 pointer
                thisNode = data('nodes')['root'][currentSide][currentNode];
                thisLayout = data('layouts')['root'][currentSide][currentNode];
                thisView = data('views')['root'][currentSide][currentNode];

                // skip property nodes
                if (thisNode['complex'] === undefined) {
                    continue;
                }
                if (thisLayout['moused']) {
                    if (thisView['active']) {
                        flipNodeColor(thisNode);
                    }
                    //thisNode['active'] = true;
                    thisView['active'] = true;
                } else {
                    //thisNode['active'] = false;
                    thisView['active'] = false;
                }
            }
        }
    }
}
