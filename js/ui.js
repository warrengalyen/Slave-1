let ui = {

    // Keep track of which keys are pressed (stops re-triggering)
    keysDown: [],

    init: function() {
        this.eventListeners();
        this.handlebarsHelpers();
    },

    eventListeners: function() {
        let self = this;

        $(document)
            .keydown(function(e) {
                self.keyDown(e);
            })
            .keyup(function(e) {
                self.keyUp(e);
            })
    },

    handlebarsHelpers: function() {

    },

    // Capture all press events
    keyDown: function(e) {
        //e.preventDefault();

        let keyCode = e.which;
        if (this.keysDown[keyCode]) {
            return;
        }

        let midiNote = this.keyCodeToMidiNote(keyCode);

        if (midiNote) {
            this.keysDown[keyCode] = midiNote;
            app.instruments[app.currentInstrumentID].noteOn(midiNote, 127);
        }
    },

    keyUp: function(e) {
        let keyCode = e.which;
        if (this.keysDown[keyCode]) {
            let midiNote = this.keysDown[keyCode];
            app.instruments[app.currentInstrumentID].noteOff(midiNote);
            this.keysDown[keyCode] = false;
        }
    },

    keyCodeToMidiNote: function(keyCode) {
        let mappings = {
            90: 0,
            83: 1,
            88: 2,
            68: 3,
            67: 4,
            86: 5,
            71: 6,
            66: 7,
            72: 8,
            78: 9,
            74: 10,
            77: 11,
            //Next octave
            81: 12,
            50: 13,
            87: 14,
            51: 15,
            69: 16,
            82: 17,
            53: 18,
            84: 19,
            54: 20,
            89: 21,
            55: 22,
            85: 23,
            //Next octave
            73: 24,
            57: 25,
            79: 26,
            48: 27,
            80: 28
        };

        if (mappings[keyCode] !== undefined) {
            let midiNote = mappings[keyCode] + (app.keyboardOctave*12);
            return midiNote;
        } else {
            return false;
        }
    },
};
