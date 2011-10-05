//TODO
// stop incessant looping from burning cpu

//libmapper info

//Device
//	name
//  host
//	port
//	user_data

//Signal
//	is_output (is_source)
// 	type
//  length
//	name
//  device_name
//	unit
//	minimum
//	maximum
//	extra
//	user_data

//Mapping
//	src_name
//	dest_name
//	src_type
//	dest_type
//	src_length
//	dest_length
//	CLIP_MAX
//		none
//		mute
//		clamp
//		fold
//		wrap
//	CLIP_MIN
//	RANGE
// 		src_min
//		src_max
//		dest_min
//		dest_max
//		known
//	expression
//	MODE
//		undefined
//		bypass
//		linear
//		expression
//		calibrate
//	muted

//Link
//	src_name
//	dest_name

var globalP;
var isAbouting = false;
var isHelping = false;
$(document).ready(function() {
		globalP = new Processing($('#globalCanvas')[0],globalP);

        addHelpHandlers();
        addEditObjectHandlers();

        $('#updateConnection').click(function() {
                if (selectedSource != "none" &&
                    selectedDestination != "none") {
                    if (selectedEdge == null) {
                        doConnect();
                    } else {
                        doModifyConnection();
                    }
                }
                globalP.redraw();
        });
        $('#removeConnection').click(function() {
                if (selectedSource != "none" &&
                    selectedDestination != "none") {
                    doDisconnect();
                }
                globalP.redraw();
        });

		$('#viewTab').click(function() {
			activateViewMode();
            updateGraph = true;
            globalP.redraw();
            updateGraph = true;
            globalP.redraw();
		});
		$('#editTab').click(function() {
			activateEditMode();
            updateGraph = true;
            globalP.redraw();
            updateGraph = true;
            globalP.redraw();
		});

		$('#filterInput').keyup(function(event) {
			event.preventDefault();
			//updateActiveFilter();
            updateGraph = true;
            globalP.redraw();
		});

        activateViewMode();
        globalP.redraw();
});

// output labels, input labels
var listGlyphMap = [[],[]];
var traversalGlyphMap = [[],[]];

var selectedSource = "none";
var selectedDestination = "none";
var selectedEdge;

var selectedRemoveOutput = "";
var selectedRemoveInput = "";

var xs = [];
var ys = [];

var screenWidth = 1280;
var screenHeight = 800;

var centerX1 = 550;
var centerY1 = 45+(760/2);
var centerX2 = screenWidth-550;
var centerY2 = 45+(760/2);

var mouseX = globalP.mouseX;
var mouseY = globalP.mouseY;

var drawCounter = 0;
var updateGraph = true;

function globalP(p) {
	p.mouseMoved = function() {
		mouseX = p.mouseX;
		mouseY = p.mouseY;
        p.redraw();
	};

	p.mouseClicked = function() {
		if ($('#viewTab').hasClass('active')) {
            detectNodeClick(false);
            detectTraversalClick();
		} else if ($('#editTab').hasClass('active')) {
            detectNodeClick(true);
            detectEdgeClick();
        }
        p.redraw();
	};

	p.setup = function() {
		//p.println(p.PFont.list());

		p.size(screenWidth,screenHeight);
		var font = p.loadFont("monospace");
		p.textFont(font);
	};

	p.draw = function() {

        if (updateGraph) {
            clearConnectionForm();
            updateActiveFilter();
            updateSignalMatches();
            updateLevelStructure();

            if ($('#viewTab').hasClass('active')) {
                updateNodeGlyphMap(false);
                updateEdgeGlyphMap(false);
            } else {
                updateNodeGlyphMap(true);
                updateEdgeGlyphMap(true);
            }

            if (updateGraph == 2) {
                updateGraph = false;
                p.redraw();
            } else {
                updateGraph = 2;
                p.redraw();
            }
        }

        if ($('#viewTab').hasClass('active')) {
            $('html').toggleClass('viewColor',true);
            $('html').toggleClass('editColor',false);
            $('html').toggleClass('rawColor',false);

            p.background(230);
            drawBackground();
            if (mouseX < 200 || mouseX > screenWidth-200) {
                updateListGlyphMouseState();
            } else {
                updateNodeMouseState();
            }
            drawNodes();
            drawEdges();
            drawListGlyphs();
            drawTraversalGlyphs();

        } else {
            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);
            $('html').toggleClass('rawColor',false);

            p.background(230);
            drawBackground();
            updateNodeMouseState();
            updateEdgeMouseState();
            drawNodes();
            drawEdges();

        }

        globalP.noLoop();
	};
}

function clearConnectionForm() {
    selectedDestination = "none";
    selectedSource = "none";
    selectedEdge = null;

    $('#selectedSource').text(selectedSource);
    $('#selectedDestination').text(selectedDestination);
    $('#modeMenu').val(0);
    $('#exprInput').val("");
    $('#mappingSourceMinInput').val("");
    $('#mappingSourceMaxInput').val("");
    $('#mappingDestMinInput').val("");
    $('#mappingDestMaxInput').val("");
}

function activateViewMode() {
    //$('#addMappingForm').toggle(false);
    $('#addObjectForm').toggle(false);

	$('#globalCanvas').toggle(true);

	$('#viewTab').toggleClass('active',true);
	$('#viewTab').toggleClass('inactive',false);
	$('#editTab').toggleClass('active',false);
	$('#editTab').toggleClass('inactive',true);

    updateGraph = true;
}
function activateEditMode() {
    //$('#addMappingForm').toggle(true);
    $('#addObjectForm').toggle(true);

	$('#globalCanvas').toggle(true);

	$('#viewTab').toggleClass('active',false);
	$('#viewTab').toggleClass('inactive',true);
	$('#editTab').toggleClass('active',true);
	$('#editTab').toggleClass('inactive',false);

    updateGraph = true;
}

function doConnect() {
    var sourceDevice = selectedSource.split("/");
    var destinationDevice = selectedDestination.split("/");
    command.send('link', ["/"+sourceDevice[1],"/"+destinationDevice[1]]);
    command.send('connect', [selectedSource,selectedDestination]);

}
function doDisconnect() {
    var sourceDevice = selectedSource.split("/");
    var destinationDevice = selectedDestination.split("/");
    // TODO: check and unlink if no more connection
    //command.send('unlink', ["/"+sourceDevice[1],"/"+destinationDevice[1]]);
    command.send('disconnect', [selectedSource,selectedDestination]);
}
function doModifyConnection() {
    var argCopy = $.extend(true,{},connections.get(selectedEdge));
    argCopy['expression'] = encodeURIComponent($('#exprInput').val());
    argCopy['range'][0] = parseFloat($('#mappingSourceMinInput').val());
    ankrgCopy['range'][1] = parseFloat($('#mappingSourceMaxInput').val());
    argCopy['range'][2] = parseFloat($('#mappingDestMinInput').val());
    argCopy['range'][3] = parseFloat($('#mappingDestMaxInput').val());
    argCopy['mode'] = connectionModeCommands[connectionModes[parseInt($('#modeMenu').val())]];

    command.send('set_connection',argCopy);

    return argCopy;
}

//FIXME all structures seem to have a last element of undefined
devices = new Assoc();
signals = new Assoc();
links = new Assoc();
connections = new Assoc();

connectionModes = ["None", "Byp", "Line", "Expr", "Calib"];
connectionModeCommands = {"Byp": 'bypass',
                          "Line": 'linear',
                          "Calib": 'calibrate',
                          "Expr": 'expression'};
