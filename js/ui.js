let ui = {

    // Keep track of which keys are pressed (stops re-triggering)
    keysDown: [],

    init: function() {
        this.eventListeners();
        this.handlebarHelpers();
    },

    eventListeners: function() {
        let self = this;

        $(document)
            .onkeydown(function(e) {
                self.keyDown(e);
            })
            .onkeyup(function(e) {
                self.keyUp(e);
            })
    },

    handlebarsHelpers: function() {

    },

    keyDown: function(e) {
        let keyCode = e.which;
        if (this.keysDown[keyCode]) {
            return;
        }

        this.keysDown[keyCode] = true;

        let midiNote = this.keyCodeToMidiNote(keyCode);
        console.log(midiNote);
    },

    keyUp: function(e) {
        let keyCode = e.which;
        if (this.keysDown[keyCode]) {
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
        };

        if (mappings[keyCode] !== undefined) {
            return mappings[keyCode];
        } else {
            return false;
        }
    },
};
