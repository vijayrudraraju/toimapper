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

var gP;
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

		gP = new Processing($('#globalCanvas')[0],gP);
        $('#globalCanvas').evently({
            updatebackground: function() {
                if ($('#globalCanvas').data('currentTab')=='view') {
                    $(this).data('centerX1',550);
                    $(this).data('centerY1',45+(760/2));
                    $(this).data('centerX2',screenWidth-550);
                    $(this).data('centerY2',45+(760/2));
                } else if ($('#globalCanvas').data('currentTab')=='edit') {
                    $(this).data('centerX1',550+190);
                    $(this).data('centerY1',45+(760/2));
                    $(this).data('centerX2',screenWidth-550+190);
                    $(this).data('centerY2',45+(760/2));
                } else if ($('#globalCanvas').data('currentTab')=='filter') {
                    $(this).data('centerX1',550+190);
                    $(this).data('centerY1',45+(760/2));
                    $(this).data('centerX2',screenWidth-550+190);
                    $(this).data('centerY2',45+(760/2));
                }
            },
            updategraph: function() {
                clearConnectionForm();
                updateActiveFilter();
                updateSignalMatches();
                updateLevelStructure();

                if($('#globalCanvas').data('currentTab')=='view') {
                    updateNodeGlyphMap(false);
                    updateEdgeGlyphMap(false);
                } else if($('#globalCanvas').data('currentTab')=='edit') {
                    updateNodeGlyphMap(false);
                    updateEdgeGlyphMap(false);
                } else if($('#globalCanvas').data('currentTab')=='filter') {
                    updateNodeGlyphMap(false);
                    updateEdgeGlyphMap(false);
                }
            },
            redraw: function() {
                gP.redraw();
                gP.redraw();
                console.log('redraw triggered');
            },
            tab: function() {
                if(!$(this).data('currentTab')=='view') {
                    $('#globalCanvas').trigger('enableview');
                } else if(!$(this).data('currentTab')=='edit') {
                    $('#globalCanvas').trigger('enableedit');
                } else if(!$(this).data('currentTab')=='filter') {
                    $('#globalCanvas').trigger('enablefilter');
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
                $(this).data('currentTab','view');    

                $('#filterForm').toggle(false);
                $('#addObjectForm').toggle(false);

                $('#viewTab').toggleClass('active',true);
                $('#viewTab').toggleClass('inactive',false);
                $('#editTab').toggleClass('active',false);
                $('#editTab').toggleClass('inactive',true);
                $('#filterTab').toggleClass('active',false);
                $('#filterTab').toggleClass('inactive',true);

                $('#globalCanvas').trigger('updatebackground');
                $('#globalCanvas').trigger('updategraph');
                $('#globalCanvas').trigger('redraw');
            },
            enableedit: function() {
                $(this).data('currentTab','edit');    

                $('#filterForm').toggle(false);
                $('#addObjectForm').toggle(true);

                $('#viewTab').toggleClass('active',false);
                $('#viewTab').toggleClass('inactive',true);
                $('#editTab').toggleClass('active',true);
                $('#editTab').toggleClass('inactive',false);
                $('#filterTab').toggleClass('active',false);
                $('#filterTab').toggleClass('inactive',true);

                $('#globalCanvas').trigger('updatebackground');
                $('#globalCanvas').trigger('updategraph');
                $('#globalCanvas').trigger('redraw');
            },
            enablefilter: function() {
                $(this).data('currentTab','filter');

                $('#filterForm').toggle(true);
                $('#addObjectForm').toggle(false);

                $('#viewTab').toggleClass('active',false);
                $('#viewTab').toggleClass('inactive',true);
                $('#editTab').toggleClass('active',false);
                $('#editTab').toggleClass('inactive',true);
                $('#filterTab').toggleClass('active',true);
                $('#filterTab').toggleClass('inactive',false);

                $('#globalCanvas').trigger('updatebackground');
                $('#globalCanvas').trigger('updategraph');
                $('#globalCanvas').trigger('redraw');
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
var traversalGlyphMap = [[],[]];

var selectedSource = "none";
var selectedDestination = "none";
var selectedEdge;

var selectedRemoveOutput = "";
var selectedRemoveInput = "";

var screenWidth = 1280;
var screenHeight = 800;

function gP(p) {
	p.mouseMoved = function() {
		//mouseX = p.mouseX;
		//mouseY = p.mouseY;
        $('#globalCanvas').trigger('redraw');
	};

	p.mouseClicked = function() {
		if($('#globalCanvas').data('currentTab')=='view') {
            detectNodeClick(false);
            detectTraversalClick();
		} else if($('#globalCanvas').data('currentTab')=='edit') {
            detectNodeClick(true);
            detectEdgeClick();
		} else if($('#globalCanvas').data('currentTab')=='filter') {
        }
        $('#globalCanvas').trigger('updategraph');
        $('#globalCanvas').trigger('redraw');
	};

	p.setup = function() {
		//p.println(p.PFont.list());

		p.size(screenWidth,screenHeight);
		var font = p.loadFont("monospace");
		p.textFont(font);
	};

	p.draw = function() {
        if($('#globalCanvas').data('currentTab')=='view') {
            $('html').toggleClass('viewColor',true);
            $('html').toggleClass('editColor',false);

            p.background(11*16+11,10*16+9,12*16+11);
            drawBackground();
            if (gP.mouseX < 200 || gP.mouseX > screenWidth-200) {
                updateListGlyphMouseState();
            } else {
                updateNodeMouseState();
            }
            drawNodes();
            drawEdges();
            drawListGlyphs();
            drawTraversalGlyphs();
        } else if($('#globalCanvas').data('currentTab')=='edit') {
            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);

            p.background(11*16+11,10*16+9,12*16+11);
            drawBackground();
            updateNodeMouseState();
            updateEdgeMouseState();
            drawNodes();
            drawEdges();
        } else if($('#globalCanvas').data('currentTab')=='filter') {
            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);

            p.background(11*16+11,10*16+9,12*16+11);
            drawBackground();
            updateNodeMouseState();
            updateEdgeMouseState();
            drawNodes();
            drawEdges();
        }

        gP.noLoop();
	};
}
