var activeFilter = "";
var latestQuery = [];
var filterMatches = [[],[],[]]; // outputs,inputs,mappings

function updateActiveFilter() {
	signalPagePointer = 0;
	mappingPagePointer = 0;

	activeFilter = $('#filterInput').val();
	activeFilter = activeFilter+'';
	activeFilter = activeFilter.replace(/^\s*(.*?)\s*$/,"$1").toLowerCase();

	/*
	    namespace matching
	*/
    latestQuery = activeFilter.match(/\S+/ig);
	if (latestQuery != null) {
	} else {
        latestQuery = [""];
	}
}

function updateSignalMatches() {
	filterMatches = [[],[],[]];

    var keys = signals.keys();
    for (var i=0;i<keys.length;i++) {
		o: for (var j=0;j<latestQuery.length;j++) {
               //namespace matching
               if (keys[i].match(new RegExp(latestQuery[j],"ig")) == null) {
                   continue o;
               }

               if (signals.get(keys[i]).direction  == 1) {	
                   filterMatches[0].push([signals.get(keys[i]).device_name,signals.get(keys[i]).name]);
                   break;
               } else if (signals.get(keys[i]).direction == 0) {	
                   filterMatches[1].push([signals.get(keys[i]).device_name,signals.get(keys[i]).name]);
                   break;
               }
        }
    }
}
