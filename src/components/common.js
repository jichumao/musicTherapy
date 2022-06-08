import * as mm from '@magenta/music/es6';
import { sequences } from '@magenta/music';
import {saveAs} from 'file-saver';

export const CHECKPOINTS_DIR =
    'https://storage.googleapis.com/magentadata/js/checkpoints';

export const SOUNDFONT_URL =
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';

export const DRUM_SEQS = [
    {
      notes: [
        {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 2},
        {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
        {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
        {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
        {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
        {pitch: 36, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 30}
      ],
      quantizationInfo: {stepsPerQuarter: 4},
      totalQuantizedSteps: 32,
    },
    {
      notes: [
        {pitch: 36, quantizedStartStep: 0},  {pitch: 38, quantizedStartStep: 0},
        {pitch: 42, quantizedStartStep: 0},  {pitch: 46, quantizedStartStep: 0},
        {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 3},
        {pitch: 42, quantizedStartStep: 4},  {pitch: 50, quantizedStartStep: 4},
        {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
        {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
        {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
        {pitch: 46, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 10},
        {pitch: 48, quantizedStartStep: 10}, {pitch: 50, quantizedStartStep: 10},
        {pitch: 36, quantizedStartStep: 12}, {pitch: 38, quantizedStartStep: 12},
        {pitch: 42, quantizedStartStep: 12}, {pitch: 48, quantizedStartStep: 12},
        {pitch: 50, quantizedStartStep: 13}, {pitch: 42, quantizedStartStep: 14},
        {pitch: 45, quantizedStartStep: 14}, {pitch: 48, quantizedStartStep: 14},
        {pitch: 36, quantizedStartStep: 16}, {pitch: 38, quantizedStartStep: 16},
        {pitch: 42, quantizedStartStep: 16}, {pitch: 46, quantizedStartStep: 16},
        {pitch: 49, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
        {pitch: 42, quantizedStartStep: 19}, {pitch: 42, quantizedStartStep: 20},
        {pitch: 50, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
        {pitch: 38, quantizedStartStep: 22}, {pitch: 42, quantizedStartStep: 22},
        {pitch: 45, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
        {pitch: 42, quantizedStartStep: 24}, {pitch: 46, quantizedStartStep: 24},
        {pitch: 42, quantizedStartStep: 26}, {pitch: 48, quantizedStartStep: 26},
        {pitch: 50, quantizedStartStep: 26}, {pitch: 36, quantizedStartStep: 28},
        {pitch: 38, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 28},
        {pitch: 42, quantizedStartStep: 30}, {pitch: 48, quantizedStartStep: 30}
      ],
      quantizationInfo: {stepsPerQuarter: 4},
      totalQuantizedSteps: 32,
    },
    {
      notes: [
        {pitch: 38, quantizedStartStep: 0},  {pitch: 42, quantizedStartStep: 0},
        {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 4},
        {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
        {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
        {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
        {pitch: 42, quantizedStartStep: 10}, {pitch: 38, quantizedStartStep: 12},
        {pitch: 42, quantizedStartStep: 12}, {pitch: 45, quantizedStartStep: 12},
        {pitch: 36, quantizedStartStep: 14}, {pitch: 42, quantizedStartStep: 14},
        {pitch: 46, quantizedStartStep: 14}, {pitch: 36, quantizedStartStep: 16},
        {pitch: 42, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
        {pitch: 38, quantizedStartStep: 20}, {pitch: 42, quantizedStartStep: 20},
        {pitch: 45, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
        {pitch: 42, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
        {pitch: 42, quantizedStartStep: 24}, {pitch: 38, quantizedStartStep: 26},
        {pitch: 42, quantizedStartStep: 26}, {pitch: 45, quantizedStartStep: 26},
        {pitch: 42, quantizedStartStep: 28}, {pitch: 45, quantizedStartStep: 28},
        {pitch: 36, quantizedStartStep: 30}, {pitch: 42, quantizedStartStep: 30},
        {pitch: 45, quantizedStartStep: 30}
      ],
      quantizationInfo: {stepsPerQuarter: 4},
      totalQuantizedSteps: 32,
    },
    {
      notes: [
        {pitch: 50, quantizedStartStep: 4}, {pitch: 50, quantizedStartStep: 20}
      ],
      quantizationInfo: {stepsPerQuarter: 4},
      totalQuantizedSteps: 32,
    }
  ];
  DRUM_SEQS.map(s => s.notes.map(n => {
    n.isDrum = true;
    n.quantizedEndStep = n.quantizedStartStep + 1;
  }));

  export function writeTimer(elementId, startTime) {
    document.getElementById(elementId).innerHTML =
        ((performance.now() - startTime) / 1000).toString() + 's';
  }
  
  export function writeNoteSeqs(
      elementId, seqs, useSoundFontPlayer = false,
      writeVelocity = false) {
        console.log(elementId)
    const element = document.getElementById(elementId);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    seqs.forEach(seq => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = 'View NoteSequence';
      details.appendChild(summary);
  
      const seqText = document.createElement('span');
      const isQuantized = mm.sequences.isQuantizedSequence(seq);
      seqText.innerHTML = '[' +
          seq.notes
              .map(n => {
                let s = '{p:' + n.pitch + ' s:' +
                    (isQuantized ? n.quantizedStartStep :
                                   n.startTime.toPrecision(2));
                const end =
                    isQuantized ? n.quantizedEndStep : n.endTime.toPrecision(3);
                if (end != null) {
                  s += ' e:' + end;
                }
                if (writeVelocity) {
                  s += ' v:' + n.velocity;
                }
                s += '}';
                return s;
              })
              .join(', ') +
          ']';
      details.appendChild(seqText);
      details.appendChild(createPlayer(seq, useSoundFontPlayer));
      element.appendChild(details);
    });
  }
  
  export function visualizeNoteSeqs(
      elementId, seqs, useSoundFontPlayer = false) {
    const element = document.getElementById(elementId);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    seqs.forEach(seq => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = 'View NoteSequence';
      details.appendChild(summary);
      details.appendChild(createPlayer(seq, useSoundFontPlayer));
      element.appendChild(details);
    });
  }
  
  export function writeMemory(bytes, name = 'leaked-memory') {
    document.getElementById(name).innerHTML = bytes.toString() + ' bytes';
  }

  function createPlayer(seq, useSoundFontPlayer = false) {
    // Visualizer
    const div = document.createElement('div');
    div.classList.add('player-container');
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('visualizer-container');
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    containerDiv.appendChild(el);
  
    const buttonsDiv = document.createElement('div');
    // Regular player.
    buttonsDiv.appendChild(
        createPlayerButton(seq, false, useSoundFontPlayer, el));
  
    // Player with click. Only works for quantized sequences.
    if (!useSoundFontPlayer && sequences.isQuantizedSequence(seq)) {
      buttonsDiv.appendChild(createPlayerButton(seq, true, false, el));
    }
  
    // Download midi.
    buttonsDiv.appendChild(createDownloadButton(seq));
    div.appendChild(buttonsDiv);
    div.appendChild(containerDiv);
    return div;
  }

  function createPlayerButton(
    seq, withClick, useSoundFontPlayer,
    el) {
  const visualizer = new mm.PianoRollSVGVisualizer(seq, el);
  const container = el.parentElement;

  const callbackObject = {
    run: (note) => {
      const currentNotePosition = visualizer.redraw(note);

      // See if we need to scroll the container.
      const containerWidth = container.getBoundingClientRect().width;
      if (currentNotePosition > (container.scrollLeft + containerWidth)) {
        container.scrollLeft = currentNotePosition - 20;
      }
    },
    stop: () => {}
  };

  const button = document.createElement('button');
  const playText = withClick ? 'Play With Click' : 'Play';
  button.textContent = playText;

  // tslint:disable-next-line:no-any
  let player;
  if (useSoundFontPlayer) {
    player = new mm.SoundFontPlayer(
        SOUNDFONT_URL, undefined, undefined, undefined, callbackObject);
    player.loadSamples(seq).then(() => button.disabled = false);
  } else {
    player = new mm.Player(withClick, callbackObject);
  }

  button.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      button.textContent = playText;
    } else {
      player.start(visualizer.noteSequence)
          .then(() => (button.textContent = playText));
      button.textContent = 'Stop';
    }
  });
  return button;
}

function createDownloadButton(seq) {
  const button = document.createElement('button');
  button.textContent = 'Save MIDI';
  button.addEventListener('click', () => {
    saveAs(new File([mm.sequenceProtoToMidi(seq)], 'saved.mid'));
  });
  return button;
}

export function notesMatch(
  aNotes, bNotes) {
if (aNotes.length !== bNotes.length) {
  return false;
}
// This sorts the arrays in place, which messes up the Visualizer that's
// already connected to this sequence. Make a copy first.
const a = JSON.parse(JSON.stringify(aNotes));
const b = JSON.parse(JSON.stringify(bNotes));

a.sort(compareNotes);
b.sort(compareNotes);
for (let i = 0; i < a.length; ++i) {
  if (a[i].startTime !== b[i].startTime || a[i].endTime !== b[i].endTime ||
      a[i].velocity !== b[i].velocity || a[i].pitch !== b[i].pitch) {
    return false;
  }
}
return true;
}

function compareNotes(a, b) {
  if (a.startTime < b.startTime) {
    return -1;
  }
  if (a.endTime < b.endTime) {
    return -1;
  }
  return a.pitch - b.pitch;
}