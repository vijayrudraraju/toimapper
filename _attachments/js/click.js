function detectNodeClick(selectionEnabled) {
    var sourcePaths = getCurrentOutputPathsFromNodes();
    var destinationPaths = getCurrentInputPathsFromNodes();

    var isSource = null;

    var keys = nodeGlyphMap.outputs.keys();
    for (var i=0;i<keys.length;i++) {
        if (nodeGlyphMap.outputs.get(keys[i]).mouseOver && nodeGlyphMap.outputs.get(keys[i]).visible) {
            isSource = true;
        }
    }

    var keys = nodeGlyphMap.inputs.keys();
    for (var i=0;i<keys.length;i++) {
        if (nodeGlyphMap.inputs.get(keys[i]).mouseOver && nodeGlyphMap.inputs.get(keys[i]).visible) {
            isSource = false;
        }
    }

    if (isSource == null) {
        var keys = nodeGlyphMap.outputs.keys();
        for (var i=0;i<keys.length;i++) {
            selectedSource = "none";
            nodeGlyphMap.outputs.get(keys[i]).selected = false;
        }
        var keys = nodeGlyphMap.inputs.keys();
        for (var i=0;i<keys.length;i++) {
            selectedDestination = "none";
            nodeGlyphMap.inputs.get(keys[i]).selected = false;
        }
    } else if (isSource) {
        var keys = nodeGlyphMap.outputs.keys();
        for (var i=0;i<keys.length;i++) {
            if (nodeGlyphMap.outputs.get(keys[i]).mouseOver) {
                descendOutputTree(keys[i]);
                if (selectionEnabled) {
                    selectedSource = sourcePaths[i];
                    nodeGlyphMap.outputs.get(keys[i]).selected = true;
                }
            } else {
                nodeGlyphMap.outputs.get(keys[i]).selected = false;

            }
        }
    } else {
        var keys = nodeGlyphMap.inputs.keys();
        for (var i=0;i<keys.length;i++) {
            if (nodeGlyphMap.inputs.get(keys[i]).mouseOver) {
                descendInputTree(keys[i]);
                if (selectionEnabled) {
                    selectedDestination = destinationPaths[i];
                    nodeGlyphMap.inputs.get(keys[i]).selected = true;
                }
            } else {
                nodeGlyphMap.inputs.get(keys[i]).selected = false;
            }
        }
    }

    $('#selectedSource').text(selectedSource);
    $('#selectedDestination').text(selectedDestination);
}

function detectEdgeClick() {
    var select = false;

    var keys = edgeGlyphMap.keys();
    for (var i=0;i<keys.length;i++) {
        if (edgeGlyphMap.get(keys[i]).mouseOver) {
            select = true;
        }
    }

    if (select) {
        var keys = edgeGlyphMap.keys();
        for (var i=0;i<keys.length;i++) {
            if (edgeGlyphMap.get(keys[i]).mouseOver) {
                selectedSource = edgeGlyphMap.get(keys[i]).outputChild;
                selectedDestination = edgeGlyphMap.get(keys[i]).inputChild;
                selectedEdge = keys[i];

                $('#selectedSource').text(selectedSource);
                $('#selectedDestination').text(selectedDestination);
                $('#modeMenu').val(connections.get(keys[i]).mode);
                $('#exprInput').val(connections.get(keys[i]).expression);
                $('#mappingSourceMinInput').val(connections.get(keys[i]).range[0]);
                $('#mappingSourceMaxInput').val(connections.get(keys[i]).range[1]);
                $('#mappingDestMinInput').val(connections.get(keys[i]).range[2]);
                $('#mappingDestMaxInput').val(connections.get(keys[i]).range[3]);
                edgeGlyphMap.get(keys[i]).selected = true;
            } else {
                edgeGlyphMap.get(keys[i]).selected = false;
            }
        }
    } else {
        var keys = edgeGlyphMap.keys();
        for (var i=0;i<keys.length;i++) {
            //selectedDestination = "none";
            //selectedSource = "none";
            selectedEdge = null;

            $('#modeMenu').val(0);
            $('#exprInput').val("");
            $('#mappingSourceMinInput').val("");
            $('#mappingSourceMaxInput').val("");
            $('#mappingDestMinInput').val("");
            $('#mappingDestMaxInput').val("");
            edgeGlyphMap.get(keys[i]).selected = false;
        }
    }
}

function detectTraversalClick() {
    var thisX = 0;
    var thisY = 0;
    var thisWidth = 0;
    var thisHeight = 0;

    for (var i=0;i<traversalGlyphMap[0].length;i++) {
        thisX = traversalGlyphMap[0][i][0][0];
        thisY = traversalGlyphMap[0][i][0][1];
        thisWidth = traversalGlyphMap[0][i][0][2];
        thisHeight = traversalGlyphMap[0][i][0][3];
        if (gP.mouseX<thisX+thisWidth && gP.mouseX>thisX &&
                gP.mouseY<thisY+thisHeight && gP.mouseY>thisY) {
            climbOutputTree(i);
        }
    }
    for (var i=0;i<traversalGlyphMap[1].length;i++) {
        thisX = traversalGlyphMap[1][i][0][0];
        thisY = traversalGlyphMap[1][i][0][1];
        thisWidth = traversalGlyphMap[1][i][0][2];
        thisHeight = traversalGlyphMap[1][i][0][3];
        if (gP.mouseX<thisX+thisWidth && gP.mouseX>thisX &&
                gP.mouseY<thisY+thisHeight && gP.mouseY>thisY) {
            climbInputTree(i);
        }
    }
}
