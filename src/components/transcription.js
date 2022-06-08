/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//@ts-ignore

import * as mm from '@magenta/music/es6';

// import axios from 'axios';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, writeNoteSeqs, writeTimer} from './common';



const CKPT_URL = `${CHECKPOINTS_DIR}/transcription/onsets_frames_uni`;
const EXPECTED_NS_URL =
    `${CKPT_URL}/MAPS_MUS-mz_331_3_ENSTDkCl.250frames.ns.json`;

// Transcription from a file.
// tslint:disable-next-line


// Audio recording. Only supported natively in Firefox and Safari.
// See https://caniuse.com/#feat=mediarecorder.
// For everything else, we use a polyfill.


const isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined';
export const fetch = isNode ? require('node-fetch') : window.fetch.bind(window);


let expectedNs;
// axios.get(EXPECTED_NS_URL).then((response) => response.json()).then((ns) => {
//   expectedNs = ns;
//   writeNoteSeqs('expected-ns', [expectedNs], true, true);
//   writeNoteSeqs('expected-audio-ns', [expectedNs], true, true);
// });

fetch(EXPECTED_NS_URL).then((response) => response.json()).then((ns) => {
  expectedNs = ns;
  writeNoteSeqs('expected-ns', [expectedNs], true, true);
  writeNoteSeqs('expected-audio-ns', [expectedNs], true, true);
});


async function transcribeFromFile(blob, prefix = 'file') {
  setLoadingMessage(prefix);
  const oafA = new mm.OnsetsAndFrames(CKPT_URL);
  oafA.initialize()
      .then(async () => {
        const start = Date.now();
        const ns = await oafA.transcribeFromAudioFile(blob);
        writeTimer(`${prefix}-time`, start);
        writeNoteSeqs(`${prefix}-results`, [ns], true, true);
      })
      .then(() => oafA.dispose())
}

function setLoadingMessage(className) {
  const els = document.querySelectorAll(`.${className}`);
  for (let i = 0; i < els.length; i++) {
    els[i].textContent = 'Loading...';
  }
}

export {
  transcribeFromFile
}
