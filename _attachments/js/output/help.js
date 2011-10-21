function addHelpHandlers() {
    $('span').evently({
        mouseenter: function() {
            $(this).toggleClass('normalHelp',false);
            $(this).toggleClass('hoverHelp',true);
            $('#globalCanvas').trigger("redraw");
        }, 
        mouseleave: function() {
            $(this).toggleClass('normalHelp',true);
            $(this).toggleClass('hoverHelp',false);
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#viewHelpTrigger').evently({
        click: function() {
            $('#helpSwitch').trigger('deactivatehelp');
            $('#viewHelp').toggle(true);
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#signalHelpTrigger').evently({
        click: function() {
            $('#helpSwitch').trigger('deactivatehelp');
            $('#signalHelp').toggle(true);
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#mappingHelpTrigger').evently({
        click: function() {
            $('#helpSwitch').trigger('deactivatehelp');
            $('#mappingHelp').toggle(true);
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#filteringHelpTrigger').evently({
        click: function() {
            $('#helpSwitch').trigger('deactivatehelp');
            $('#filteringHelp').toggle(true);
            $('#globalCanvas').trigger("redraw");
        }
    });

    $('#viewHelp').evently({
        click: function() {
            $('#viewHelp').toggle(false);
            $('#helpSwitch').trigger('activatehelp');
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#signalHelp').evently({
        click: function() {
            $('#signalHelp').toggle(false);
            $('#helpSwitch').trigger('activatehelp');
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#mappingHelp').evently({
        click: function() {
            $('#mappingHelp').toggle(false);
            $('#helpSwitch').trigger('activatehelp');
            $('#globalCanvas').trigger("redraw");
        }
    });
    $('#filteringHelp').evently({
        click: function() {
            $('#filteringHelp').toggle(false);
            $('#helpSwitch').trigger('activatehelp');
            $('#globalCanvas').trigger("redraw");
        }
    });

    $('#aboutSwitch').evently({
        _init: function() {
            $(this).toggle(false);
            $(this).data('isAbouting',false);
        },
        click: function() {
            if($(this).data('isAbouting')) {
                $(this).trigger('deactivateabout');
            } else {
                $(this).trigger('activateabout');
            }
            $('#globalCanvas').trigger("redraw");
        },
        activateabout: function() {
            $(this).data('isAbouting',true);

            $('#aboutSwitch').toggleClass('aboutClosed',false);
            $('#aboutSwitch').toggleClass('aboutOpen',true);
            $('#aboutAlterText').toggle(false);
            $('#aboutText').toggle(true);

            $('#helpSwitch').toggle(false);
        },
        deactivateabout: function() {
            $(this).data('isAbouting',false);

            $('#aboutSwitch').toggleClass('aboutClosed',true);
            $('#aboutSwitch').toggleClass('aboutOpen',false);
            $('#aboutAlterText').toggle(true);
            $('#aboutText').toggle(false);

            $('#helpSwitch').toggle(true);
        }
    });

    $('#helpSwitch').evently({
        _init: function() {
            $(this).toggle(false);
            $(this).data('isHelping',false);
        },
        click: function() {
            if($(this).data('isHelping')) {
                console.log('deactivatehelp');
                $(this).trigger('deactivatehelp');
            } else {
                console.log('activatehelp');
                $(this).trigger('activatehelp');
            }
            $('#globalCanvas').trigger("redraw");
        },
        activatehelp: function() {
            $(this).data('isHelping',true);

            $('#helpSwitch').toggleClass('helpClosed',false);
            $('#helpSwitch').toggleClass('helpOpen',true);
            $('#helpAlterText').toggle(false);
            $('#helpText').toggle(true);

            //$('#aboutSwitch').toggle(false);
        },
        deactivatehelp: function() {
            $(this).data('isHelping',false);

            $('#helpSwitch').toggleClass('helpClosed',true);
            $('#helpSwitch').toggleClass('helpOpen',false);
            $('#helpAlterText').toggle(true);
            $('#helpText').toggle(false);

            //$('#aboutSwitch').toggle(true);
        }
    });
}
