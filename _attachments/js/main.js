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
                $(this).data('canvasWidth',640);
                $(this).data('canvasHeight',640);
                $(this).data('graphWidth',600);
                $(this).data('graphHeight',600);
                $(this).data('graphCenterX',320);
                $(this).data('graphCenterY',320);

                gP = new Processing($('#globalCanvas')[0],gP);
            },
            updatebackground: function() {
            },
            updategraph: function() {
                updateActiveFilter();
                updateSignalMatches();
                updateLevelStructure();
                updateNodeGlyphMap(false);
                updateEdgeGlyphMap(false);
                console.log('updategraph triggered');
            },
            redraw: function() {
                gP.redraw();
                gP.redraw();
                console.log('redraw triggered');
            },
            tab: function() {
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

//var selectedSource = "none";
//var selectedDestination = "none";
//var selectedEdge;

//var selectedRemoveOutput = "";
//var selectedRemoveInput = "";

function gP(p) {
	p.mouseMoved = function() {
        $('#globalCanvas').trigger('redraw');
	};

	p.mouseClicked = function() {
        $('#globalCanvas').trigger('updategraph');
        $('#globalCanvas').trigger('redraw');
        detectAboutButtonClick();
        detectHelpButtonClick();
	};

	p.setup = function() {
		//p.println(p.PFont.list());

		p.size($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'));
		var font = p.loadFont("monospace");
		p.textFont(font);
		p.textSize(20);
	};

	p.draw = function() {
        p.background(0*16+11,0*16+9,0*16+11);

        drawGraphBackground();
        drawCalibrationNodes();

        updateNodeMouseState();
        drawNodes();
        drawEdges();
        drawAddNodeButton();
        drawRemoveNodeButton();
        drawAddSubscriptionButton();

        updateAboutButtonMouseState();
        updateHelpButtonMouseState();

        drawAboutButton();
        drawHelpButton();

        gP.noLoop();
	};
}
