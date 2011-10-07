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
        $(document).evently({
            keypress: function(e) {
                //e.preventDefault();
                //console.log('key press: '+e.which);
            },
            keydown: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                    //console.log('keydown: '+e.which);
                    //$('#globalCanvas').trigger("tab");
                } else if(e.which=='13') {
                    e.preventDefault();
                }
            },
            keyup: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                    //console.log('keyup: '+e.which);
                } else if(e.which=='13') {
                    e.preventDefault();
                    $('#globalCanvas').trigger("enter");
                }
                console.log('keyup: '+e.which);
            }
        });

		globalP = new Processing($('#globalCanvas')[0],globalP);
        $('#globalCanvas').evently({
            redraw: function() {
                gUpdateGraph = true;
                globalP.redraw();
                gUpdateGraph = true;
                globalP.redraw();
                console.log('redraw triggered');
            },
            tab: function() {
                if(!$(this).data('currentTab')==0) {
                    $('#globalCanvas').trigger('enableview');
                } else if(!$(this).data('currentTab')==1) {
                    $('#globalCanvas').trigger('enableedit');
                } else {

                }
            },
            enter: function() {
                if($('#objectMenu').val()==0) {
                    $('#createSourceButton').trigger('click');
                } else if($('#objectMenu').val()==1) {
                    $('#createSinkButton').trigger('click');
                }
            },
            enableview: function() {
                $(this).data('currentTab',0);    

                $('#filterForm').toggle(false);
                $('#addObjectForm').toggle(false);

                $('#viewTab').toggleClass('active',true);
                $('#viewTab').toggleClass('inactive',false);
                $('#editTab').toggleClass('active',false);
                $('#editTab').toggleClass('inactive',true);
                $('#filterTab').toggleClass('active',false);
                $('#filterTab').toggleClass('inactive',true);

                $('#globalCanvas').trigger("redraw");
            },
            enableedit: function() {
                $(this).data('currentTab',1);    

                $('#filterForm').toggle(false);
                $('#addObjectForm').toggle(true);

                $('#viewTab').toggleClass('active',false);
                $('#viewTab').toggleClass('inactive',true);
                $('#editTab').toggleClass('active',true);
                $('#editTab').toggleClass('inactive',false);
                $('#filterTab').toggleClass('active',false);
                $('#filterTab').toggleClass('inactive',true);

                $('#globalCanvas').trigger("redraw");
            },
            enablefilter: function() {
                $(this).data('currentTab',2);

                $('#filterForm').toggle(true);
                $('#addObjectForm').toggle(false);

                $('#viewTab').toggleClass('active',false);
                $('#viewTab').toggleClass('inactive',true);
                $('#editTab').toggleClass('active',false);
                $('#editTab').toggleClass('inactive',true);
                $('#filterTab').toggleClass('active',true);
                $('#filterTab').toggleClass('inactive',false);

                $('#globalCanvas').trigger("redraw");
            }
        });

        addHelpHandlers();
        addEditObjectHandlers();

        $('#updateConnection').evently({
            click: function() {
                if (selectedSource != "none" &&
                    selectedDestination != "none") {
                    if (selectedEdge == null) {
                        doConnect();
                    } else {
                        doModifyConnection();
                    }
                }
                $('#globalCanvas').trigger("redraw");
            }
        });
        $('#removeConnection').evently({
            click: function() {
                if (selectedSource != "none" &&
                    selectedDestination != "none") {
                    doDisconnect();
                }
                $('#globalCanvas').trigger("redraw");
            }
        });

		$('#viewTab').evently({
            click: function() {
                $('#globalCanvas').trigger('enableview');
            }
		});
		$('#editTab').evently({
            click: function() {
                $('#globalCanvas').trigger('enableedit');
            }
		});
		$('#filterTab').evently({
            click: function() {
                $('#globalCanvas').trigger('enablefilter');
            }
		});

		$('#filterInput').evently({
            click: function(event) {
                event.preventDefault();
                $('#globalCanvas').trigger("redraw");
            }
		});

        $('#globalCanvas').trigger('enableview');
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

//var screenWidth = 1280;
//var screenHeight = 800;

var screenWidth = 1280;
var screenHeight = 800;

var centerX1 = 550;
var centerY1 = 45+(760/2);
var centerX2 = screenWidth-550;
var centerY2 = 45+(760/2);

var mouseX = globalP.mouseX;
var mouseY = globalP.mouseY;

var drawCounter = 0;
var gUpdateGraph = true;

function globalP(p) {
	p.mouseMoved = function() {
		mouseX = p.mouseX;
		mouseY = p.mouseY;
        $('#globalCanvas').trigger("redraw");
	};

	p.mouseClicked = function() {
		if($('#globalCanvas').data('currentTab')==0) {
            detectNodeClick(false);
            detectTraversalClick();
		} else if($('#globalCanvas').data('currentTab')==1) {
            detectNodeClick(true);
            detectEdgeClick();
        } else {
        }
        $('#globalCanvas').trigger("redraw");
	};

	p.setup = function() {
		//p.println(p.PFont.list());

		p.size(screenWidth,screenHeight);
		var font = p.loadFont("monospace");
		p.textFont(font);
	};

	p.draw = function() {

        if(gUpdateGraph) {
            clearConnectionForm();
            updateActiveFilter();
            updateSignalMatches();
            updateLevelStructure();

            if($('#globalCanvas').data('currentTab')==0) {
                updateNodeGlyphMap(false);
                updateEdgeGlyphMap(false);
            } else if($('#globalCanvas').data('currentTab')==1) {
                updateNodeGlyphMap(false);
                updateEdgeGlyphMap(false);
            } else {
            }

            if (gUpdateGraph == 2) {
                gUpdateGraph = false;
                p.redraw();
            } else {
                gUpdateGraph = 2;
                p.redraw();
            }
        }

        if($('#globalCanvas').data('currentTab')==0) {
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
        } else if($('#globalCanvas').data('currentTab')==1) {
            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);
            $('html').toggleClass('rawColor',false);

            p.background(230);
            drawBackground();
            updateNodeMouseState();
            updateEdgeMouseState();
            drawNodes();
            drawEdges();
        } else {

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
/*devices = new Assoc();
signals = new Assoc();
links = new Assoc();
connections = new Assoc();

connectionModes = ["None", "Byp", "Line", "Expr", "Calib"];
connectionModeCommands = {"Byp": 'bypass',
                          "Line": 'linear',
                          "Calib": 'calibrate',
                          "Expr": 'expression'};
                          */
