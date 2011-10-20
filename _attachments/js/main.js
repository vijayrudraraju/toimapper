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
            _init: function() {
                $('#viewTab').toggle(false);
                $('#editTab').toggle(false);
                $('#filterTab').toggle(false);
            },
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

        $('#globalCanvas').evently({
            _init: function() {
                $(this).data('canvasWidth',700);
                $(this).data('canvasHeight',700);
                $(this).data('graphWidth',680);
                $(this).data('graphHeight',680);
                $(this).data('graphCenterX',350);
                $(this).data('graphCenterY',350);

                gP = new Processing($('#globalCanvas')[0],gP);
            },
            updatebackground: function() {
            /*
                if ($(this).data('currentTab')=='view') {
                    $(this).data('centerX1',550);
                    $(this).data('centerY1',45+(760/2));
                    $(this).data('centerX2',$(this).data('canvasWidth')-550);
                    $(this).data('centerY2',45+(760/2));
                } else if ($(this).data('currentTab')=='edit') {
                    $(this).data('centerX1',550+190);
                    $(this).data('centerY1',45+(760/2));
                    $(this).data('centerX2',$(this).data('canvasWidth')-550+190);
                    $(this).data('centerY2',45+(760/2));
                } else if ($(this).data('currentTab')=='filter') {
                    $(this).data('centerX1',550+190);
                    $(this).data('centerY1',45+(760/2));
                    $(this).data('centerX2',$(this).data('canvasWidth')-550+190);
                    $(this).data('centerY2',45+(760/2));
                }
                */
            },
            updategraph: function() {
                updateActiveFilter();
                updateSignalMatches();
                updateLevelStructure();

                if($(this).data('currentTab')=='view') {
                    updateNodeGlyphMap(false);
                    updateEdgeGlyphMap(false);
                } else if($(this).data('currentTab')=='edit') {
                    updateNodeGlyphMap(false);
                    updateEdgeGlyphMap(false);
                } else if($(this).data('currentTab')=='filter') {
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
                    $(this).trigger('enableview');
                } else if(!$(this).data('currentTab')=='edit') {
                    $(this).trigger('enableedit');
                } else if(!$(this).data('currentTab')=='filter') {
                    $(this).trigger('enablefilter');
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

                $(this).trigger('updatebackground');
                $(this).trigger('updategraph');
                $(this).trigger('redraw');
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

                $(this).trigger('updatebackground');
                $(this).trigger('updategraph');
                $(this).trigger('redraw');
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

                $(this).trigger('updatebackground');
                $(this).trigger('updategraph');
                $(this).trigger('redraw');
            }
        });

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

        addHelpHandlers();
        addEditObjectHandlers();
        $('#globalCanvas').trigger('enableview');
});

// output labels, input labels
var traversalGlyphMap = [[],[]];

var selectedSource = "none";
var selectedDestination = "none";
var selectedEdge;

var selectedRemoveOutput = "";
var selectedRemoveInput = "";

function gP(p) {
	p.mouseMoved = function() {
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

		p.size($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'));
		var font = p.loadFont("monospace");
		p.textFont(font);
		p.textSize(16);
	};

	p.draw = function() {
        $('html').toggleClass('viewColor',true);
        $('html').toggleClass('editColor',false);

        p.background(11*16+11,10*16+9,12*16+11);
        drawGraphBackground();
        updateNodeMouseState();
        drawNodes();
        drawEdges();
        drawAddNodeButton();
        drawRemoveNodeButton();
        drawAddSubscriptionButton();
        /*
        if($('#globalCanvas').data('currentTab')=='view') {
            $('html').toggleClass('viewColor',true);
            $('html').toggleClass('editColor',false);

            p.background(11*16+11,10*16+9,12*16+11);
            drawGraphBackground();
            if (gP.mouseX < 200 || gP.mouseX > $(this).data('canvasWidth')-200) {
                //updateListGlyphMouseState();
            } else {
                updateNodeMouseState();
            }
            drawNodes();
            drawEdges();
            //drawListBackground();
            //drawListGlyphs();
            drawTraversalGlyphs();
        } else if($('#globalCanvas').data('currentTab')=='edit') {
            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);

            p.background(11*16+11,10*16+9,12*16+11);
            drawGraphBackground();
            updateNodeMouseState();
            updateEdgeMouseState();
            drawNodes();
            drawEdges();
        } else if($('#globalCanvas').data('currentTab')=='filter') {
            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);

            p.background(11*16+11,10*16+9,12*16+11);
            drawGraphBackground();
            updateNodeMouseState();
            updateEdgeMouseState();
            drawNodes();
            drawEdges();
        }
        */

        gP.noLoop();
	};
}
