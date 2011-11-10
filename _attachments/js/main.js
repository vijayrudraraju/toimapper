// vijay rudraraju

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

        $('#canvas').evently({
            _init: function() {
                $('#canvas').data('toimawbBag',{});
                $('#canvas').data('toimawbBag')['seeds'] = {};
                $('#canvas').data('toimawbBag')['seeds']['testSeed'] = {
                    leaves:{
                        touch:{
                            moused:false
                        },
                        paint:{
                            x:0,
                            y:0,
                            width:0,
                            height:0
                        },
                        sound:{
                        },
                        data:{
                            ordinal:0,
                            color:'red',
                            level:0,
                            signal:[]
                        }
                    },
                    branches:{
                        touch:{
                            center:true,
                            top:true,
                            middle:true,
                            bottom:true
                        },
                        paint:{
                            center:true,
                            top:true,
                            middle:true,
                            bottom:true
                        },
                        sound:{
                            center:true,
                            top:true,
                            middle:true,
                            bottom:true
                        },
                        data:{
                            center:true,
                            top:true,
                            middle:true,
                            bottom:true
                        }
                    },
                    sprouts:{
                        touch:{
                            left:1,
                            right:1
                        },
                        paint:{
                            left:3,
                            right:3
                        },
                        sound:{
                            left:3,
                            right:3
                        },
                        data:{
                            left:3,
                            right:3
                        }
                    }
                };
                $('#canvas').data('toimawbBag')['sprouts'] = {};
                $('#canvas').data('toimawbBag')['sprouts']['testSprout'] = 
                sproutSeed($('#canvas').data('toimawbBag')['seeds']['testSeed']);
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

                //initializeNodeStructures();
                //initializeLayoutStructures();
                //initializeViewStructures();
            
                gP = new Processing($('#globalCanvas')[0],gP);
                $(this).trigger('redraw');
                gP.noLoop();
            },
            setup: function() {
                //layoutButtons(); 
                //layoutNodes();
                //layoutSmallNodes();
                //layoutSmallerNodes();
            },
            draw: function() {
                drawLogo();

                //var trace = $("#globalCanvas").data('views')['root']['left']['trace'];
                //drawNodes('left',trace);
                //trace = $("#globalCanvas").data('views')['root']['right']['trace'];
                //drawNodes('right',trace);

                //drawAscendButton();
                //drawDescendButton();
                //drawSignalButton();

                //drawAboutButton();
                //drawHelpButton();
            },
            mousemoved: function() {
                //updateNodeMouseStates();

                //updateAboutButtonMouseState();
                //updateHelpButtonMouseState();

                //updateAscendButtonMouseState();
                //updateDescendButtonMouseState();
            },
            mouseclicked: function() {
                detectNodesClick();

                detectAboutButtonClick();
                detectHelpButtonClick();

                detectAscendButtonClick();
                detectDescendButtonClick();
            },
            updatebackground: function() {
            },
            updategraph: function() {
                //console.log('updategraph triggered');
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

        addHelpHandlers();
        addEditObjectHandlers();
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
});
function gP(p) {
	p.mouseMoved = function() {
        $('#globalCanvas').trigger('mousemoved');
        $('#globalCanvas').trigger('redraw');
	};

	p.mouseClicked = function() {
        $('#globalCanvas').trigger('mouseclicked');
        $('#globalCanvas').trigger('updategraph');
        $('#globalCanvas').trigger('redraw');
	};

	p.setup = function() {
		console.log(p.PFont.list());
		p.size($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'));
		$('#globalCanvas').data('font',p.loadFont('sans-serif'));

        $('#globalCanvas').trigger('setup');
	};

	p.draw = function() {
        p.textSize(24);
        p.background(0*16+11,0*16+9,0*16+11);

        $('#globalCanvas').trigger('draw');
	};
}
