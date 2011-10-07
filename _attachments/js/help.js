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
            $(this).data('isAbouting',false);
        },
        click: function() {
            $(this).data('isAbouting',!$(this).data('isAbouting'));
            if($(this).data('isAbouting')) {
                $(this).trigger('activateabout');
            } else {
                $(this).trigger('deactivateabout');
            }
            $('#globalCanvas').trigger("redraw");
        },
        activateabout: function() {
            $('#aboutSwitch').toggleClass('aboutClosed',false);
            $('#aboutSwitch').toggleClass('aboutOpen',true);
            $('#aboutAlterText').toggle(false);
            $('#aboutText').toggle(true);

            $('#helpSwitch').toggle(false);
        },
        deactivateabout: function() {
            $('#aboutSwitch').toggleClass('aboutClosed',true);
            $('#aboutSwitch').toggleClass('aboutOpen',false);
            $('#aboutAlterText').toggle(true);
            $('#aboutText').toggle(false);

            $('#helpSwitch').toggle(true);
        }
    });

    $('#helpSwitch').evently({
        _init: function() {
            $(this).data('isHelping',false);
        },
        click: function() {
            $(this).data('isHelping',!$(this).data('isHelping'));
            if($(this).data('isHelping')) {
                $(this).trigger('activatehelp');
            } else {
                $(this).trigger('deactivatehelp');
            }
            $('#globalCanvas').trigger("redraw");
        },
        activatehelp: function() {
            $('#helpSwitch').toggleClass('helpClosed',false);
            $('#helpSwitch').toggleClass('helpOpen',true);
            $('#helpAlterText').toggle(false);
            $('#helpText').toggle(true);

            $('#aboutSwitch').toggle(false);
        },
        deactivatehelp: function() {
            $('#helpSwitch').toggleClass('helpClosed',true);
            $('#helpSwitch').toggleClass('helpOpen',false);
            $('#helpAlterText').toggle(true);
            $('#helpText').toggle(false);

            $('#aboutSwitch').toggle(true);
        }
    });
}
