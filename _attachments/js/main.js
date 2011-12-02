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
                $('#canvas').data('toimawbBag')['symbiotes'] = {};
                $('#canvas').data('toimawbBag')['symbiotes']['paintSymbiote'] = {
                    
                };
                $('#canvas').data('toimawbBag')['symbiotes']['colorFlipperSymbiote'] = {
                };
                $('#canvas').data('toimawbBag')['seeds'] = {};
                $('#canvas').data('toimawbBag')['seeds']['dataSeed'] = {
                    label:'data',
                    leaves:{
                        data:{
                            signal:'',
                            color:'red'
                        },
                    },
                    branches:{
                        center:1,
                        top:1,
                        middle:1,
                        bottom:1
                    },
                    stems:{
                        left:3,
                        right:3
                    },
                    roots:{
                    }
                };
                $('#canvas').data('toimawbBag')['seeds']['paintSeed'] = {
                    label:'paint',
                    leaves:{
                        data:{
                            shapeType:0,
                            x:0,
                            y:0,
                            width:0,
                            height:0
                        },
                        func:{
                            arrange: function(thisX,thisY,thisWidth,thisHeight) {
                            },
                            returnSelf: function() {
                                return this;
                            }
                        }
                    },
                    branches:{
                        topMiddle:1,
                        top:1,
                        bottomMiddle:1,
                        bottom:1
                    },
                    stems:{
                        left:3,
                        right:3
                    },
                    roots:{
                        data:{
                            mapWidth:640,
                            mapHeight:640,
                            mapCenterX:320,
                            mapCenterY:320,
                            rootNodeWidth:50,
                            rootNodeHeight:50
                        }
                    }
                };
                $('#canvas').data('toimawbBag')['seeds']['soundSeed'] = {
                    label:'sound',
                    leaves:{
                    },
                    branches:{
                    },
                    stems:{
                    },
                    roots:{
                    }
                };
                $('#canvas').data('toimawbBag')['seeds']['touchSeed'] = {
                    label:'touch',
                    leaves:{
                        data:{
                            moused:false
                        },
                    },
                    branches:{
                        center:1,
                        top:1,
                        middle:1,
                        bottom:1
                    },
                    stems:{
                        left:3,
                        right:3
                    },
                    roots:{
                    }
                };

                $('#canvas').data('toimawbBag')['sprouts'] = {};
                $('#canvas').data('toimawbBag')['sprouts']['dataSprout'] = 
                sproutSeed($('#canvas').data('toimawbBag')['seeds']['dataSeed']);
                $('#canvas').data('toimawbBag')['sprouts']['paintSprout'] = 
                sproutSeed($('#canvas').data('toimawbBag')['seeds']['paintSeed']);
                $('#canvas').data('toimawbBag')['sprouts']['soundSprout'] = 
                sproutSeed($('#canvas').data('toimawbBag')['seeds']['soundSeed']);
                $('#canvas').data('toimawbBag')['sprouts']['touchSprout'] = 
                sproutSeed($('#canvas').data('toimawbBag')['seeds']['touchSeed']);

                arrangePaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout']);
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
            
                gP = new Processing($('#globalCanvas')[0],gPFunc);
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
                paintPaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout']);

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
function gPFunc(p) {
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
