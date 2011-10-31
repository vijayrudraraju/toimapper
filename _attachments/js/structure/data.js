function initializeViewBranches(pointer,even,terminal) {
    pointer['main'] = {active:false,even:even};
    pointer['top'] = {active:false,even:even};
    pointer['middle'] = {active:false,even:even};
    pointer['bottom'] = {active:false,even:even};
}
function initializeLayoutBranches(pointer,terminal) {
    pointer['main'] = {x:0,y:0,moused:false};
    pointer['top'] = {x:0,y:0,moused:false};
    pointer['middle'] = {x:0,y:0,moused:false};
    pointer['bottom'] = {x:0,y:0,moused:false};
}
function initializeNodeBranches(pointer,side,terminal,level) {
    pointer['main'] = {level:level,color:'red',side:side,signal:[0.0],complex:false,terminal:true};
    pointer['top'] = {level:level,color:'red',side:side,signal:[0.0],complex:true,terminal:terminal};
    pointer['middle'] = {level:level,color:'red',side:side,signal:[0.0],complex:true,terminal:terminal};
    pointer['bottom'] = {level:level,color:'red',side:side,signal:[0.0],complex:true,terminal:terminal};
}

function applyFunctionToStructure(nodePointer,layoutPointer,viewPointer,operationPointer) {
    var thisNode;
    var thisLayout;
    var thisView;
    with ($('#globalCanvas')) {
        for (var currentBranch in nodePointer) {
            thisNode = nodePointer[currentBranch];
            if (thisNode['complex'] === undefined) {
                continue;
            }
            thisLayout = layoutPointer[currentBranch];
            thisView = viewPointer[currentBranch];

            if (thisNode['complex'] && !thisNode['terminal']) {
                operationPointer(thisNode,thisLayout,thisView);
                applyFunctionToStructure(thisNode,thisLayout,thisView,operationPointer); 
            } else {
                operationPointer(thisNode,thisLayout,thisView);
            }
        }
    }
}

function initializeViewStructures() {
    // view data
    with ($('#globalCanvas')) {
        data('views',{});
        data('views')['root'] = {left:{},right:{}};

        var pointer;
        var thisNode;
        for (var currentSide in data('views')['root']) {
            // pointer
            thisNode = data('nodes')['root'][currentSide];
            pointer = data('views')['root'][currentSide];
            pointer['position'] = 1;
            pointer['level'] = 1;
            pointer['trace'] = '';
            pointer['active'] = false;
            pointer['complex'] = true;
            pointer['terminal'] = false;

            // skip simple layouts
            if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                continue;
            }
            initializeViewBranches(pointer,true,false);

            for(var currentBranch in data('views')['root'][currentSide]) {
                // set 1 pointer
                thisNode = data('nodes')['root'][currentSide][currentBranch];
                pointer = data('views')['root'][currentSide][currentBranch];

                // skip simple layouts
                if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                    continue;
                }
                initializeViewBranches(pointer,false,false);

                for(var currentNode in data('views')['root'][currentSide][currentBranch]) {
                    thisNode = data('nodes')['root'][currentSide][currentBranch][currentNode];
                    pointer = data('views')['root'][currentSide][currentBranch][currentNode];

                    if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                        continue;
                    }
                    initializeViewBranches(pointer,true,true);
                }
            }
        }
    }
}
function initializeLayoutStructures() {
    // temp layout data

    with ($('#globalCanvas')) {
        data('layouts',{});
        data('layouts')['root'] = {};

        data('layouts')['root']['buttons'] = {};
        data('layouts')['root']['buttons']['about'] = {x:0,y:0,width:0,height:0,moused:false};
        data('layouts')['root']['buttons']['help'] = {x:0,y:0,width:0,height:0,moused:false};
        data('layouts')['root']['buttons']['ascend'] = {x:0,y:0,width:0,height:0,moused:false};
        data('layouts')['root']['buttons']['descend'] = {x:0,y:0,width:0,height:0,moused:false};
        data('layouts')['root']['buttons']['signal'] = {x:0,y:0,width:0,height:0,moused:false};

        data('layouts')['root']['left'] = {moused:false};
        data('layouts')['root']['right'] = {moused:false};

        var thisNode;
        var pointer;
        for (var currentSide in data('layouts')['root']) {
            // set 0 pointer
            thisNode = data('nodes')['root'][currentSide];
            pointer = data('layouts')['root'][currentSide];
            // skip simple layouts
            if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                continue;
            }
            initializeLayoutBranches(pointer,false);

            for(var currentBranch in data('layouts')['root'][currentSide]) {
                // set 1 pointer
                thisNode = data('nodes')['root'][currentSide][currentBranch];
                pointer = data('layouts')['root'][currentSide][currentBranch];

                // skip simple layouts
                if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                    continue;
                }
                initializeLayoutBranches(pointer,false);

                for(var currentNode in data('layouts')['root'][currentSide][currentBranch]) {
                    thisNode = data('nodes')['root'][currentSide][currentBranch][currentNode];
                    pointer = data('layouts')['root'][currentSide][currentBranch][currentNode];
                    if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                        continue;
                    }
                    initializeLayoutBranches(pointer,true);
                }
            }
        }
    }
}
function initializeNodeStructures() {
    // persistent data

    with ($('#globalCanvas')) {
        data('nodes',{});
        data('nodes')['root'] = {};
        data('nodes')['root']['left'] = {active:false,complex:true,terminal:false};
        data('nodes')['root']['right'] = {active:false,complex:true,terminal:false};

        var pointer;
        for (var currentSide in data('nodes')['root']) {
            // set 0 pointer
            pointer = data('nodes')['root'][currentSide];
            initializeNodeBranches(pointer,currentSide,false,1);

            for(var currentBranch in data('nodes')['root'][currentSide]) {
                // set 1 pointer
                pointer = data('nodes')['root'][currentSide][currentBranch];
                // skip simple nodes
                if (pointer['complex'] === undefined || pointer['complex'] === false) {
                    continue;
                }
                initializeNodeBranches(pointer,currentSide,false,2);

                for(var currentNode in data('nodes')['root'][currentSide][currentBranch]) {
                    pointer = data('nodes')['root'][currentSide][currentBranch][currentNode];
                    if (pointer['complex'] === undefined || pointer['complex'] === false) {
                        continue;
                    }
                    initializeNodeBranches(pointer,currentSide,true,3);
                }
            }
        }
    }
}


function flipNodeColor(node) {
    switch (node['color']) {
        case 'none':
            node['color'] = 'red';
            break;
        case 'red':
            node['color'] = 'green';
            break;
        case 'green':
            node['color'] = 'blue';
            break;
        case 'blue':
            node['color'] = 'none';
            break;
    }
}
