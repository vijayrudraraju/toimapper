function initializeNodesStructure() {
    with ($('#globalCanvas')) {
        data('nodes',{});
        data('nodes')['root'] = {};
        data('nodes')['root']['left'] = {};
        data('nodes')['root']['right'] = {};

        for (var currentSide in data('nodes')['root']) {
            if (currentSide === 'main') {
                continue;
            }

            var pointer = data('nodes')['root'][currentSide];
            with (pointer) {
                pointer['main'] = {color:'none',signal:[0.0]};
                pointer['top'] = {color:'none',signal:[0.0]};
                pointer['middle'] = {color:'none',signal:[0.0]};
                pointer['bottom'] = {color:'none',signal:[0.0]};
            }
            for(var currentBranch in data('nodes')['root'][currentSide]) {
                if (currentBranch === 'x' || currentBranch === 'y' || currentBranch === 'main') {
                    continue;
                }

                data('nodes')['root'][currentSide][currentBranch] = {};
                pointer = data('nodes')['root'][currentSide][currentBranch];
                with (pointer) { 
                    pointer['main'] = {color:'none',signal:[0.0]};
                    pointer['top'] = {color:'none',signal:[0.0]};
                    pointer['middle'] = {color:'none',signal:[0.0]};
                    pointer['bottom'] = {color:'none',signal:[0.0]};
                }
                for(var currentNode in data('nodes')['root'][currentSide][currentBranch]) {
                    if (currentNode === 'x' || currentNode === 'y' || currentNode === 'main') {
                        continue;
                    }

                    data('nodes')['root'][currentSide][currentBranch][currentNode] = {};
                    pointer = data('nodes')['root'][currentSide][currentBranch][currentNode];
                    with (pointer) { 
                        pointer['main'] = {color:'none',signal:[0.0]};
                        pointer['top'] = {color:'none',signal:[0.0]};
                        pointer['middle'] = {color:'none',signal:[0.0]};
                        pointer['bottom'] = {color:'none',signal:[0.0]};
                    }
                }
            }
        }
    }
}

var outputBranchTrace = [];
var inputBranchTrace = [];
var outputLabelTrace = ["output signals"];
var inputLabelTrace = ["input signals"];

function resetToRootLevel() {
    outputBranchTrace = [];
    inputBranchTrace = [];
    outputLabelTrace = ["output signals"];
    inputLabelTrace = ["input signals"];
}

function isOutputLeafNode(index) {
    var keys = nodeGlyphMap.outputs.keys();
    if (nodeGlyphMap.outputs.get(keys[index]).subNodes.length() == 0) {
        return true;
    } else {
        return false;
    }
}
function getSubnodesForOutputLevel() {
    var numbers = [];
    var outputPointer = levels[0][1];
    var outputPaths = getCurrentOutputPaths();

    for (var i=0;i<outputBranchTrace.length;i++) {
        if (outputPointer.length == 0) {
            outputPointer = [];
            break;
        }
        outputPointer = outputPointer[outputBranchTrace[i]][1];
    }
    var isSignal = [];
    for (var i=0;i<outputPointer.length;i++) {
        if (outputPointer[i] != 0) {
            for (var j=0;j<outputPointer[i][1].length;j++) {
                if (outputPointer[i][1][j] == 0) {
                    isSignal.push({name:outputPaths[i]+"/"+outputPointer[i][0][j],isSignal:1});
                    //isSignal.push(1);
                } else {
                    isSignal.push({name:outputPaths[i]+"/"+outputPointer[i][0][j],isSignal:0});
                    //isSignal.push(0);
                }
            }
        }
        numbers.push(isSignal.slice());
        isSignal = [];
    }
    return numbers;
}
function getCurrentOutputLevelSet() {
    var outputSet = levels[0][0];
    var outputPointer = levels[0][1];

    for (var i=0;i<outputBranchTrace.length;i++) {
        if (outputPointer.length == 0) {
            outputSet = [];
            break;
        }
        outputSet = outputPointer[outputBranchTrace[i]][0]; 
        outputPointer = outputPointer[outputBranchTrace[i]][1];
    }

    outputSet = outputSet.slice();

    return outputSet;
}
function getCurrentOutputPaths() {
    var outputSet = getCurrentOutputLevelSet();
    var prefixString = "";

    for (var i=1;i<outputLabelTrace.length;i++) {
        if (outputLabelTrace[i][0] == "/") {
            prefixString = outputLabelTrace[i];
        } else {
            prefixString += "/"+outputLabelTrace[i];
        }
    }

    for (var i=0;i<outputSet.length;i++) {
        if (outputSet[i][0] != "/") {
            outputSet[i] = prefixString+"/"+outputSet[i];
        }
    }

    return outputSet;
}
function getCurrentOutputPathsFromNodes() {
    var outputSet = nodeGlyphMap.outputs.keys();
    var prefixString = "";

    for (var i=1;i<outputLabelTrace.length;i++) {
        if (outputLabelTrace[i][0] == "/") {
            prefixString = outputLabelTrace[i];
        } else {
            prefixString += "/"+outputLabelTrace[i];
        }
    }

    for (var i=0;i<outputSet.length;i++) {
        if (outputSet[i][0] != "/") {
            outputSet[i] = prefixString+"/"+outputSet[i];
        }
    }

    return outputSet;
}
function descendOutputTree(key) {
    var keyPointer = levels[0][0];
    var outputPointer = levels[0][1];
    for (var i=0;i<outputBranchTrace.length;i++) {
        keyPointer = outputPointer[outputBranchTrace[i]][0];
        outputPointer = outputPointer[outputBranchTrace[i]][1];
    }

    var index = 0; 
    for (var i=0;i<keyPointer.length;i++) {
        if (key == keyPointer[i]) {
            index = i;
        }
    }
    if (outputPointer[index] == 0) {
        return;
    } else {
        outputBranchTrace.push(index); 
        outputLabelTrace.push(key);
        updateGraph = true;
    }
}
function climbOutputTree(level) {
    if (level == 0) {
        outputBranchTrace = [];
        outputLabelTrace = ["output signals"];
    } else {
        outputBranchTrace = outputBranchTrace.slice(0,level);   
        outputLabelTrace = outputLabelTrace.slice(0,level+1);
    }
    updateGraph = true;
}
function isInputLeafNode(index) {
    var keys = nodeGlyphMap.inputs.keys();
    if (nodeGlyphMap.inputs.get(keys[index]).subNodes.length() == 0) {
        return true;
    } else {
        return false;
    }
}
function getSubnodesForInputLevel() {
    var numbers = [];
    var inputPointer = levels[1][1];
    var inputPaths = getCurrentInputPaths();

    for (var i=0;i<inputBranchTrace.length;i++) {
        if (inputPointer.length == 0) {
            inputPointer = [];
            break;
        }
        inputPointer = inputPointer[inputBranchTrace[i]][1];
    }
    var isSignal = [];
    for (var i=0;i<inputPointer.length;i++) {
        if (inputPointer[i] != 0) {
            for (var j=0;j<inputPointer[i][1].length;j++) {
                if (inputPointer[i][1][j] == 0) {
                    isSignal.push({name:inputPaths[i]+"/"+inputPointer[i][0][j],isSignal:1});
                } else {
                    isSignal.push({name:inputPaths[i]+"/"+inputPointer[i][0][j],isSignal:0});
                }
            }
        }
        numbers.push(isSignal.slice());
        isSignal = [];
    }
    return numbers;
}
function getCurrentInputLevelSet() {
    var inputSet = levels[1][0];
    var inputPointer = levels[1][1];
    for (var i=0;i<inputBranchTrace.length;i++) {
        if (inputPointer.length == 0) {
            inputSet = [];
            break;
        }
        inputSet = inputPointer[inputBranchTrace[i]][0]; 
        inputPointer = inputPointer[inputBranchTrace[i]][1];
    }
    inputSet = inputSet.slice();
    return inputSet;
}
function getCurrentInputPaths() {
    var inputSet = getCurrentInputLevelSet();
    var prefixString = "";

    for (var i=1;i<inputLabelTrace.length;i++) {
        if (inputLabelTrace[i][0] == "/") {
            prefixString = inputLabelTrace[i];
        } else {
            prefixString += "/"+inputLabelTrace[i];
        }
    }

    for (var i=0;i<inputSet.length;i++) {
        if (inputSet[i][0] != "/") {
            inputSet[i] = prefixString+"/"+inputSet[i];
        }
    }

    return inputSet;
}
function getCurrentInputPathsFromNodes() {
    var inputSet = nodeGlyphMap.inputs.keys();
    var prefixString = "";

    for (var i=1;i<inputLabelTrace.length;i++) {
        if (inputLabelTrace[i][0] == "/") {
            prefixString = inputLabelTrace[i];
        } else {
            prefixString += "/"+inputLabelTrace[i];
        }
    }

    for (var i=0;i<inputSet.length;i++) {
        if (inputSet[i][0] != "/") {
            inputSet[i] = prefixString+"/"+inputSet[i];
        }
    }

    return inputSet;
}
function descendInputTree(key) {
    var keyPointer = levels[1][0];
    var inputPointer = levels[1][1];
    for (var i=0;i<inputBranchTrace.length;i++) {
        keyPointer = inputPointer[inputBranchTrace[i]][0];
        inputPointer = inputPointer[inputBranchTrace[i]][1];
    }

    var index = 0;
    for (var i=0;i<keyPointer.length;i++) {
        if (key == keyPointer[i]) {
            index = i;
        }
    }
    if (inputPointer[index] == 0) {
        return;
    } else {
        inputBranchTrace.push(index); 
        inputLabelTrace.push(key);
        updateGraph = true;
    }
}
function climbInputTree(level) {
    if (level == 0) {
        inputBranchTrace = [];
        inputLabelTrace = ["input signals"];
    } else {
        inputBranchTrace = inputBranchTrace.slice(0,level);   
        inputLabelTrace = inputLabelTrace.slice(0,level+1);
    }
    updateGraph = true;
}

