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
            },
            keydown: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                } else if(e.which=='13') {
                    e.preventDefault();
                }
            },
            keyup: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
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
                $(this).data('graphWidth',560);
                $(this).data('graphHeight',560);
                $(this).data('graphCenterX',320);
                $(this).data('graphCenterY',320);

                initializeNodeStructures();
                initializeLayoutStructures();
                initializeViewStructures();
            
                gP = new Processing($('#globalCanvas')[0],gP);
                $(this).trigger('redraw');
                gP.noLoop();
            },
            updatebackground: function() {
            },
            updategraph: function() {
                console.log('updategraph triggered');
            },
            redraw: function() {
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
            },
            ascend: function() {
                var thisView = $(this).data('views')['root'];
                if (thisView['side'] === 'left' && thisView['left']['level'] > 1) {
                    thisView['left']['level']--;
                    thisView['left']['trace'].pop();
                    console.log("levels: " + thisView['left']['level'] + ' ' + thisView['right']['level'] + ' ' + thisView['right']['trace']);
                } else if (thisView['side'] === 'right' && thisView['right']['level'] > 1) {
                    thisView['right']['level']--;
                    thisView['right']['trace'].pop();
                    console.log("levels: " + thisView['left']['level'] + ' ' + thisView['right']['level'] + ' ' + thisView['right']['trace']);
                }

                $('#globalCanvas').trigger('redraw');
            },
            descend: function() {
                var thisView = $(this).data('views')['root'];
                if (thisView['side'] === 'left' && thisView['left']['level'] < 3) {
                    thisView['left']['level']++;
                    thisView['left']['trace'].push(thisView['left']['position']);
                    console.log("levels: " + thisView['left']['level'] + ' ' + thisView['right']['level'] + ' ' + thisView['right']['trace']);
                } else if (thisView['side'] === 'right' && thisView['right']['level'] < 3) {
                    thisView['right']['level']++;
                    thisView['right']['trace'].push(thisView['right']['position']);
                    console.log("levels: " + thisView['left']['level'] + ' ' + thisView['right']['level'] + ' ' + thisView['right']['trace']);
                }

                $('#globalCanvas').trigger('redraw');
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

function gP(p) {
	p.mouseMoved = function() {
        updateNodeMouseStates();

        updateAboutButtonMouseState();
        updateHelpButtonMouseState();

        updateAscendButtonMouseState();
        updateDescendButtonMouseState();

        $('#globalCanvas').trigger('redraw');
	};

	p.mouseClicked = function() {
        detectNodesClick();

        detectAboutButtonClick();
        detectHelpButtonClick();

        detectAscendButtonClick();
        detectDescendButtonClick();

        $('#globalCanvas').trigger('updategraph');
        $('#globalCanvas').trigger('redraw');
	};

	p.setup = function() {
		console.log(p.PFont.list());

		p.size($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'));
		$('#globalCanvas').data('font',p.loadFont('sans-serif'));

        layoutButtons(); 

        layoutNodes();
        layoutSmallNodes();
        layoutSmallerNodes();
	};

	p.draw = function() {
        p.textSize(24);
    
        p.background(0*16+11,0*16+9,0*16+11);

        drawLogo();

        //drawBigNode();

        var trace = $("#globalCanvas").data('views')['root']['left']['trace'];
        drawNodes('left',trace);
        trace = $("#globalCanvas").data('views')['root']['right']['trace'];
        drawNodes('right',trace);

        //drawBigBisect();

        drawAscendButton();
        drawDescendButton();
        drawSignalButton();

        drawAboutButton();
        drawHelpButton();
	};
}
