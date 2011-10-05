/* global audio processing */
var gA;
var gNode;
var gWave;

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

var SineWave = function(context) {
    var that = this;
    this.x = 0; // initial sample number
    this.n = 0; // initial beat number
    
    this.n = [];
    this.n[0] = [];
    this.n[1] = [];
    this.n[2] = [];

    this.context = context;

    this.sample_rate = this.context.sampleRate;
    this.envelope = new ADSR(0.01, 0.1, 0.5, 0.1, 0.2, 44100);

    this.node = context.createJavaScriptNode(2048,1,1);
    this.node.onaudioprocess = function(e) { 
        that.process(e)
    };
}
SineWave.prototype.process = function(e) {
    var data0 = e.outputBuffer.getChannelData(0);
    var data1 = e.outputBuffer.getChannelData(1);

    var amp0 = 0.30;
    var freq0 = (gCircleVel0*1760.0) + 220.0;
    var a0;

    osc0a.setFreq(freq0);
    osc0a.setAmp(amp0);
    osc0a.generate();
    osc0a.applyEnvelope();
    osc0b.setFreq(freq0);
    osc0b.setAmp(amp0);
    osc0b.generate();
    osc0b.applyEnvelope();
    osc0c.setFreq(freq0);
    osc0c.setAmp(amp0);
    osc0c.generate();
    osc0c.applyEnvelope();

    var beatFlag = false;

    for(var i=0;i<data0.length;++i) {

        data0[i] = signal0a[i];
        data0[i] += signal0b[i];
        data0[i] += signal0c[i];

        data1[i] = data0[i];
        this.x++;

    }

    for(var j=0;j<3;j++) {
        if(this.x % 44100*2 < 2048) {
            this.n++;
            if(j==0) {
                env0a.noteOn();
            }
            if(j==1) {
                env0b.noteOn();
            }
            if(j==2) {
                env0c.noteOn();
            }
        }
    }
}
SineWave.prototype.play = function() {
    this.node.connect(this.context.destination);
}
SineWave.prototype.pause = function() {
    this.node.disconnect();
}


gA = new webkitAudioContext();
gWave = new SineWave(gA);
gWave.play();


nodes = new Assoc();
connections = new Assoc();

function addSinkNode(key,value) {
    nodes.add(key,value); 
}

function addEditObjectHandlers() {
    $('#controlSourceNodeForm').toggle(false);
    $('#audioSinkNodeForm').toggle(false);
    $('#groupForm').toggle(false);
    $('#connectionForm').toggle(false);

    $('#objectMenu').change(function() {
        if($(this).val() == 0) {
            $('#controlSourceNodeForm').toggle(true);
            $('#audioSinkNodeForm').toggle(false);
            $('#groupForm').toggle(false);
            $('#connectionForm').toggle(false);
        } else if($(this).val() == 1) {
            $('#controlSourceNodeForm').toggle(false);
            $('#audioSinkNodeForm').toggle(true);
            $('#groupForm').toggle(false);
            $('#connectionForm').toggle(false);
        } else if($(this).val() == 2) {
            $('#controlSourceNodeForm').toggle(false);
            $('#audioSinkNodeForm').toggle(false);
            $('#groupForm').toggle(true);
            $('#connectionForm').toggle(false);
        } else if($(this).val() == 3) {
            $('#controlSourceNodeForm').toggle(false);
            $('#audioSinkNodeForm').toggle(false);
            $('#groupForm').toggle(false);
            $('#connectionForm').toggle(true);
        }
    });
}
