/*
function initializeViewBranches(pointer,even,terminal) {
    pointer['main'] = {even:even};
    pointer['top'] = {even:even};
    pointer['middle'] = {even:even};
    pointer['bottom'] = {even:even};
}
function initializeLayoutBranches(pointer,terminal) {
    pointer['main'] = {x:0,y:0,width:0,height:0,moused:false};
    pointer['top'] = {x:0,y:0,width:0,height:0,moused:false};
    pointer['middle'] = {x:0,y:0,width:0,height:0,moused:false};
    pointer['bottom'] = {x:0,y:0,width:0,height:0,moused:false};
}
function initializeNodeBranches(pointer,side,terminal,level) {
    pointer['main'] = {position:0,level:level,color:'red',side:side,signal:[0.0],complex:false,terminal:true};
    pointer['top'] = {position:1,level:level,color:'red',side:side,signal:[0.0],complex:true,terminal:terminal};
    pointer['middle'] = {position:2,level:level,color:'red',side:side,signal:[0.0],complex:true,terminal:terminal};
    pointer['bottom'] = {position:3,level:level,color:'red',side:side,signal:[0.0],complex:true,terminal:terminal};
}

function applyFunctionToStructure(nodePointer,layoutPointer,viewPointer,trace,operationPointer) {
    var thisNode;
    var thisLayout;
    var thisView;
    with ($('#globalCanvas')) {
        if (trace.length === 0) {
            for (var currentBranch in nodePointer) {
                thisNode = nodePointer[currentBranch];
                if (thisNode['complex'] === undefined) {
                    continue;
                }
                thisLayout = layoutPointer[currentBranch];
                thisView = viewPointer[currentBranch];

                if (thisNode['complex'] && !thisNode['terminal']) {
                    operationPointer(thisNode,thisLayout,thisView);
                    applyFunctionToStructure(thisNode,thisLayout,thisView,trace,operationPointer); 
                } else {
                    operationPointer(thisNode,thisLayout,thisView);
                }
            }
        } else if (trace.length === 1) {
            for (var currentBranch in nodePointer) {
                thisNode = nodePointer[currentBranch];
                if (thisNode['position'] === trace[0]) {
                    if (thisNode['complex'] === undefined) {
                        continue;
                    }
                    thisLayout = layoutPointer;
                    thisView = viewPointer;

                    if (thisNode['complex'] && !thisNode['terminal']) {
                        operationPointer(thisNode,thisLayout,thisView);
                        applyFunctionToStructure(thisNode,thisLayout,thisView,trace.slice(1),operationPointer); 
                    } else {
                        operationPointer(thisNode,thisLayout,thisView);
                    }
                }
            }
        } else if (trace.length === 2) {
            for (var currentBranch in nodePointer) {
                thisNode = nodePointer[currentBranch];
                if (thisNode['position'] === trace[1]) {
                    if (thisNode['complex'] === undefined) {
                        continue;
                    }
                    thisLayout = layoutPointer;
                    thisView = viewPointer;

                    if (thisNode['complex'] && !thisNode['terminal']) {
                        operationPointer(thisNode,thisLayout,thisView);
                        applyFunctionToStructure(thisNode,thisLayout,thisView,trace.slice(1),operationPointer); 
                    } else {
                        operationPointer(thisNode,thisLayout,thisView);
                    }
                }
            }
        }
    }
}

function initializeViewStructures() {
    // view data
    with ($('#globalCanvas')) {
        data('views',{});
        data('views')['root'] = {left:{},right:{},side:'left'};

        var pointer;
        var thisNode;
        for (var currentSide in data('views')['root']) {
            // pointer
            thisNode = data('nodes')['root'][currentSide];
            pointer = data('views')['root'][currentSide];
            pointer['position'] = 1;
            pointer['level'] = 1;
            pointer['trace'] = [];

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
*/

// toimawb properties
// _toi_functions:
//  _toi_type:
//      bag
//      seed
//      sprout
//      branch
//      root
// _toi_properties:
//  _toi_type:
//      bag
//      seed
//      sprout
//      branch
//      root
//  _toi_nominal:
//      (trace)
//  _toi_ordinal:
//      (level)
//      (inter-level)
//  _toi_cardinal:
//      (branch distribution per level)
//      (leaf distribution per level)
// instance
// data('toimawbBag')['preludeSeed']
// data('toimawbBag')['preludeSeed']['_toi_propertyBranch']
// data('toimawbBag')['preludeSeed']['_toi_functionBranch']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['_toi_propertyBranch']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['_toi_functionBranch']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['leaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['_toi_propertyBranch']['_toi_typeLeaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['paintBranch']['_toi_propertyBranch']['_toi_nominalLeaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['soundBranch']['_toi_propertyBranch']['_toi_ordinalLeaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['dataRoot']['oneTip']
// model
// data('bag')['seed']['sprout']['branch']
// data('bag')['seed']['sprout']['branch']['leaf']
// data('bag')['seed']['sprout']['root']
// data('bag')['seed']['sprout']['root']['tip']

// what defines a tree?
// words that are simultaneously nouns and verbs
//           
//                      branches -> branches...
//                      branches -> leafs
// seeds -> sprouts ->
//                      roots -> tips
//                      roots -> roots... 


function sproutSeed(oldSeed) {
    var newSprouts = {};
    for (var thisPrimarySproutKey in oldSeed['sprouts']) {
        if (oldSeed['sprouts'].hasOwnProperty(thisPrimarySproutKey)) {
            console.log(thisPrimarySproutKey);
            newSprouts[thisPrimarySproutKey] = {};
            for (var thisSecondarySproutKey in oldSeed['sprouts'][thisPrimarySproutKey]) {
                if (oldSeed['sprouts'][thisPrimarySproutKey].hasOwnProperty(thisSecondarySproutKey)) {
                    console.log(thisSecondarySproutKey);
                    newSprouts[thisPrimarySproutKey][thisSecondarySproutKey] = 
                    branchSprout(
                        oldSeed['sprouts'][thisPrimarySproutKey][thisSecondarySproutKey],
                        oldSeed['branches'][thisPrimarySproutKey],
                        oldSeed['leaves'][thisPrimarySproutKey]
                    );
                }
            }
        }
    }
    return newSprouts;
}

function branchSprout(level,branchSchema,leafSchema) {
    var newBranches = {};
    for (var thisBranchKey in branchSchema) {
        if (branchSchema.hasOwnProperty(thisBranchKey)) {
            console.log(thisBranchKey);
            if (level > 0) {
                newBranches[thisBranchKey] = branchSprout(level-1,branchSchema,leafSchema);
                newBranches[thisBranchKey]['_leaves'] = leafBranch(leafSchema);
            }
        }
    }
    return newBranches;
}

function leafBranch(leafSchema) {
    return leafSchema.clone();
}

/*
function branchBranch(oldBranch) {
    var newBranches;
    return newBranches;
}

function leafBranch(oldBranch) {
    var newLeaves;
    return newLeaves;
}
*/

// input: seed
// output: sprout
function seedSprout() {
}
// input: sprout
// output: branch
function sproutBranch() {
}
function sproutRoot() {

}

function sproutTouchTree() {
    // create seed
    $('#globalCanvas').data('touch',{});
    $('#globalCanvas').data('touch')['root'] = {left:{},right:{}};

    var startingDepth = 1;
    var endingDepth = 1;
    recursiveBranchSprouter(
        ['center','top','middle','bottom'],
        {
            moused:false
        }, 
        ['touch','root'],
        ['properties','clone'],
        startingDepth,
        endingDepth
    );
}
function sproutPaintTree() {
    // create seed
    $('#globalCanvas').data('paint',{});
    $('#globalCanvas').data('paint')['root'] = {left:{},right:{}};

    var startingDepth = 1;
    var endingDepth = 3;
    recursiveBranchSprouter(
        ['center','top','middle','bottom'],
        {
            x:0,
            y:0,
            width:0,
            height:0
        }, 
        ['paint','root'],
        ['properties','clone'],
        startingDepth,
        endingDepth
    );
}
function sproutMainTree() {
    // create seed
    $('#globalCanvas').data('main',{});
    $('#globalCanvas').data('main')['root'] = {left:{},right:{}};

    var startingDepth = 1;
    var endingDepth = 3;
    recursiveBranchSprouter(
        ['center','top','middle','bottom'],
        {
            ordinal:0,
            color:'red',
            level:0,
            signal:[]
        }, 
        ['main','root'],
        ['properties','clone'],
        startingDepth,
        endingDepth
    );
}
function sproutBranches(newBranches,newProperties,thisPointer,thisTrace,thisLevel) {
    for (var i=0;i<newBranches.length;i++) {
        var finalTrace = thisTrace.slice(0);
        finalTrace.push(newBranches[i]);
        console.log("finalTrace:"+finalTrace);

        thisPointer[newBranches[i]] = 
        {
            properties:newProperties.clone()
        };
        thisPointer[newBranches[i]]['properties']['level'] = thisLevel;
        thisPointer[newBranches[i]]['properties']['trace'] = finalTrace.slice(0);
        console.log('thisPointer['+newBranches[i]+'][\'properties\'][\'trace\']:'+thisPointer[newBranches[i]]['properties']['trace']);
    }
}
function recursiveBranchSprouter(newBranches,newProperties,thisStartTrace,ignoredBranches,startDepth,endDepth) {
    var thisStartBranch;
    for (var i=0;i<thisStartTrace.length;i++) {
        if (i == 0) {
            thisStartBranch = $('#globalCanvas').data(thisStartTrace[i]);
        } else {
            thisStartBranch = thisStartBranch[thisStartTrace[i]];
        }
    }
    console.log("thisStartTrace:"+thisStartTrace);

    var thisPointer;
    o: for (var thisSubBranch in thisStartBranch) {
        // skip ignored branches
        for (var i=0;i<ignoredBranches.length;i++) {
            if (thisSubBranch === ignoredBranches[i]) {
                continue o;
            }
        }
        // set pointer
        thisPointer = thisStartBranch[thisSubBranch]; 

        // sprout nodes
        var thisEndTrace = thisStartTrace.slice(0);
        thisEndTrace.push(thisSubBranch);
        console.log("thisEndTrace:"+thisEndTrace);
        sproutBranches(newBranches,newProperties,thisPointer,thisEndTrace,startDepth);

        // continue recursive branching
        if (startDepth < endDepth) {
            recursiveBranchSprouter(newBranches,newProperties,thisEndTrace,ignoredBranches,startDepth+1,endDepth);
        }
    }
}

function treeRecursionFunctionApplier(treePointer,treeFunction,thisStartTrace,ignoredBranches,startDepth,endDepth) {
    var thisStartBranch;
    for (var i=0;i<thisStartTrace.length;i++) {
        if (i == 0) {
            thisStartBranch = $('#globalCanvas').data(thisStartTrace[i]);
        } else {
            thisStartBranch = thisStartBranch[thisStartTrace[i]];
        }
    }
    console.log("thisStartTrace:"+thisStartTrace);

    var thisPointer;
    o: for (var thisSubBranch in thisStartBranch) {
        // skip ignored branches
        for (var i=0;i<ignoredBranches.length;i++) {
            if (thisSubBranch === ignoredBranches[i]) {
                continue o;
            }
        }
        // set pointer
        thisPointer = thisStartBranch[thisSubBranch]; 

        // sprout nodes
        var thisEndTrace = thisStartTrace.slice(0);
        thisEndTrace.push(thisSubBranch);
        console.log("thisEndTrace:"+thisEndTrace);
        sproutBranches(newBranches,newProperties,thisPointer,thisEndTrace,startDepth);

        // continue recursive branching
        if (startDepth < endDepth) {
            recursiveBranchSprouter(newBranches,newProperties,thisEndTrace,ignoredBranches,startDepth+1,endDepth);
        }
    }
}

/*
function initializeNodeStructures() {
    // persistent data

    with ($('#globalCanvas')) {
        data('nodes',{});
        data('nodes')['root'] = {};
        data('nodes')['root']['left'] = {complex:true,terminal:false};
        data('nodes')['root']['right'] = {complex:true,terminal:false};

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
*/


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
            node['color'] = 'red';
            break;
    }
}
