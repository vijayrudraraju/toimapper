/* global audio processing */
var gA;
var gNode;
var gWaveBank;

/* global node data */
sinkNodes = new Assoc();
connections = new Assoc();

/* global audio initialization */
gA = new webkitAudioContext();
gWaveBank = new WaveBank(gA,sinkNodes);
//gWaveBank.play();


/*
var gCircleVel0 = 0.2;
var osc0a = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
var osc0b = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
var osc0c = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
var signal0a = osc0a.signal;
var signal0b = osc0b.signal;
var signal0c = osc0c.signal;
var env0a = new ADSR(0.05, 0.1, 0.6, 0.1, 0.1, 44100);
var env0b = new ADSR(0.05, 0.1, 0.3, 0.1, 0.1, 44100);
var env0c = new ADSR(0.05, 0.1, 1, 0.1, 0.1, 44100);
osc0a.addEnvelope(env0a);
osc0b.addEnvelope(env0b);
osc0c.addEnvelope(env0c);
*/

var WaveBank = function(context,list) {
    var that = this;

    this.context = context;
    this.assocList = list;

    this.sampleRate = this.context.sampleRate;

    this.waveBank = [];
    this.signalBank = [];
    this.length = function() {
        return this.waveBank.length;
    };

    this.node = context.createJavaScriptNode(2048,1,1);
    this.node.onaudioprocess = function(e) { 
        that.process(e)
    };
};
WaveBank.prototype.setBankSize = function(num) {
    if(num > that.waveBank.length) {
        for(var i=that.waveBank.length;i<num;i++) {
            that.waveBank[i] = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
            that.signalBank[i] = that.waveBank[i].signal;
        }
    } else if(num < that.waveBank.length) {
        for(var i=num;i<that.waveBank.length;i++) {
            that.waveBank.pop(); 
            that.signalBank.pop();
        }
    }
};
WaveBank.prototype.setFreq = function() {
    assert(that.length == that.assocList.length(),
            "more waves in bank than audio nodes in system");

    var keys = that.assocList.keys();

    for(var i=0;i<keys.length;i++) {
        that.waveBank[i].setFreq(that.assocList.get(keys[i]).freq); 
    }
};
WaveBank.prototype.setAmp = function() {
    assert(that.length == that.assocList.length(),
            "more waves in bank than audio nodes in system");

    var keys = that.assocList.keys();

    for(var i=0;i<keys.length;i++) {
        that.waveBank[i].setAmp(that.assocList.get(keys[i]).amp); 
    }
};
WaveBank.prototype.generate = function() {
    for(var i=0;i<that.waveBank.length;i++) {
        that.waveBank[i].generate();
    }
};
WaveBank.prototype.process = function(e) {
    var data0 = e.outputBuffer.getChannelData(0);
    var data1 = e.outputBuffer.getChannelData(1);

    assert(that.length == that.assocList.length(),
            "more waves in bank than audio nodes in system");

    for(var i=0;i<that.signalBank.length;i++) {
        for(var j=0;j<data0.length;j++) {
            if(i==0) {
                data0[j] = 0;
            }
            data0[j] += that.signalBank[i][j];
        }
    }

    for(var j=0;j<data1.length;j++) {
        data1[j] = data0[j];
    }
};
WaveBank.prototype.play = function() {
    that.node.connect(that.context.destination);
};
WaveBank.prototype.pause = function() {
    that.node.disconnect();
};


function addSinkNode(key,value) {
    sinkNodes.add(key,value); 
    gWaveBank.setBankSize(sinkNodes.length());
}

function addEditObjectHandlers() {
    $('#audioSinkNodeForm').toggle(true);
    $('#controlSourceNodeForm').toggle(false);
    $('#groupForm').toggle(false);
    $('#connectionForm').toggle(false);

    $('#objectMenu').change(function() {
        if($(this).val() == 0) {
            $('#audioSinkNodeForm').toggle(true);
            $('#controlSourceNodeForm').toggle(false);
            $('#groupForm').toggle(false);
            $('#connectionForm').toggle(false);
        } else if($(this).val() == 1) {
            $('#audioSinkNodeForm').toggle(false);
            $('#controlSourceNodeForm').toggle(true);
            $('#groupForm').toggle(false);
            $('#connectionForm').toggle(false);
        } else if($(this).val() == 2) {
            $('#audioSinkNodeForm').toggle(false);
            $('#controlSourceNodeForm').toggle(false);
            $('#groupForm').toggle(true);
            $('#connectionForm').toggle(false);
        } else if($(this).val() == 3) {
            $('#audioSinkNodeForm').toggle(false);
            $('#controlSourceNodeForm').toggle(false);
            $('#groupForm').toggle(false);
            $('#connectionForm').toggle(true);
        }
    });

    $('createSourceButton').click(function() {
        
    });
}
