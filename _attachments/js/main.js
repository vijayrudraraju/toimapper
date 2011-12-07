// vijay rudraraju

var gP;
$(document).ready(function() {
        $(document).evently({
            _init: function() {
                $('#feedback1').text('hello1');
                $('#feedback2').text('hello2');
                $('#feedback3').text('hello3');
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
                    $('#canvas').trigger("enter");
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
                            value:0,
                            x:0,
                            y:0,
                            width:0,
                            height:0,
                            r:0,
                            g:0,
                            b:0
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
                        one:1,
                        two:1,
                        three:1,
                        four:1,
                    },
                    stems:{
                        one:3,
                        two:3
                    },
                    roots:{
                        data:{
                            mapWidth:640,
                            mapHeight:640,
                            mapCenterX:320,
                            mapCenterY:320,
                            mapR:255,
                            mapG:255,
                            mapB:255,
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

        $('#canvas').evently({
            _init: function() {
                $(this).data('canvasWidth',640);
                $(this).data('canvasHeight',640);
            
                gP = new Processing($('#canvas')[0],gPFunc);
                $(this).trigger('redraw');
                gP.noLoop();
            },
            setup: function() {
            },
            draw: function() {
                gP.textSize(24);
                gP.background(0*16+11,0*16+9,0*16+11);
                drawLogo();
                paintPaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout']);
            },
            mousemoved: function() {
            },
            mouseclicked: function(thisEvent,thisX,thisY) {
                $('#feedback1').text('touchstart: ' + thisX + ' ' + thisY);
                monitorPaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout'],thisX,thisY);
            },
            updatebackground: function() {
            },
            updategraph: function() {
                //console.log('updategraph triggered');
            },
            redraw: function() {
                gP.redraw();
            },
            tab: function() {
            },
            enter: function() {
            }
        });

        $(this).trigger('updatebackground');
        $(this).trigger('updategraph');
        $(this).trigger('redraw');
});
function gPFunc(p) {
	p.mouseMoved = function() {
        //$('#canvas').trigger('mousemoved');
        //$('#canvas').trigger('redraw');
	};

	p.mouseClicked = function() {
        $('#canvas').trigger('mouseclicked',[gP.mouseX,gP.mouseY]);
        $('#canvas').trigger('redraw');
	};

    p.touchStart = function(touchEvent) {
        $('#canvas').trigger('mouseclicked',[touchEvent.touches[0].offsetX,touchEvent.touches[0].offsetY]);
        //touchEvent.preventDefault();
        $('#canvas').trigger('redraw');
    }

    p.touchEnd = function(touchEvent) {
        //$('#canvas').trigger('mouseclicked');
        //$('#canvas').trigger('draw');
        $('#feedback1').text('touchend: ' + touchEvent.changedTouches.length);
    }

	p.setup = function() {
		console.log(p.PFont.list());
		p.size($('#canvas').data('canvasWidth'),$('#canvas').data('canvasHeight'));
		$('#canvas').data('font',p.loadFont('sans-serif'));

        $('#canvas').trigger('setup');
	};

	p.draw = function() {
        $('#canvas').trigger('draw');
	};
}
