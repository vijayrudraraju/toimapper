function addHelpHandlers() {

    $('span').hover(function() {
            $(this).toggleClass('normalHelp',false);
            $(this).toggleClass('hoverHelp',true);
            globalP.redraw();
            }, function() {
            $(this).toggleClass('normalHelp',true);
            $(this).toggleClass('hoverHelp',false);
            globalP.redraw();
            });
    $('#viewHelpTrigger').click(function() {
            deactivateHelpMode();
            $('#viewHelp').toggle(true);
            globalP.redraw();
            });
    $('#signalHelpTrigger').click(function() {
            deactivateHelpMode();
            $('#signalHelp').toggle(true);
            globalP.redraw();
            });
    $('#mappingHelpTrigger').click(function() {
            deactivateHelpMode();
            $('#mappingHelp').toggle(true);
            globalP.redraw();
            });
    $('#filteringHelpTrigger').click(function() {
            deactivateHelpMode();
            $('#filteringHelp').toggle(true);
            globalP.redraw();
            });

    $('#viewHelp').click(function() {
            $('#viewHelp').toggle(false);
            globalP.redraw();
            });
    $('#signalHelp').click(function() {
            $('#signalHelp').toggle(false);
            globalP.redraw();
            });
    $('#mappingHelp').click(function() {
            $('#mappingHelp').toggle(false);
            globalP.redraw();
            });
    $('#filteringHelp').click(function() {
            $('#filteringHelp').toggle(false);
            globalP.redraw();
            });

    $('#aboutSwitch').click(function() {
            isAbouting = !isAbouting;
            if (isAbouting) {
            activateAboutMode();
            } else {
            deactivateAboutMode();
            }
            globalP.redraw();
            });
    $('#helpSwitch').click(function() {
            isHelping = !isHelping;
            if (isHelping) {
            activateHelpMode();
            } else {
            deactivateHelpMode();
            }
            globalP.redraw();
            });

}

function activateAboutMode() {
	$('#aboutSwitch').toggleClass('aboutClosed',false);
	$('#aboutSwitch').toggleClass('aboutOpen',true);
	$('#aboutAlterText').toggle(false);
	$('#aboutText').toggle(true);

	$('#helpSwitch').toggle(false);
}
function deactivateAboutMode() {
	$('#aboutSwitch').toggleClass('aboutClosed',true);
	$('#aboutSwitch').toggleClass('aboutOpen',false);
	$('#aboutAlterText').toggle(true);
	$('#aboutText').toggle(false);

	$('#helpSwitch').toggle(true);
}
function activateHelpMode() {
	$('#helpSwitch').toggleClass('helpClosed',false);
	$('#helpSwitch').toggleClass('helpOpen',true);
	$('#helpAlterText').toggle(false);
	$('#helpText').toggle(true);

	$('#aboutSwitch').toggle(false);
}
function deactivateHelpMode() {
	$('#helpSwitch').toggleClass('helpClosed',true);
	$('#helpSwitch').toggleClass('helpOpen',false);
	$('#helpAlterText').toggle(true);
	$('#helpText').toggle(false);

	$('#aboutSwitch').toggle(true);
}
