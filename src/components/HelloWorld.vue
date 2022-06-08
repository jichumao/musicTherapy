<template>
<div class="total">
  <div class="piano">
        <ul>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-black"></li>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-black"></li>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-black"></li>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-black"></li>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-black"></li>
            <li class="keyboard keyboard-white"></li>
            <li class="keyboard keyboard-white"></li>
        </ul>
    </div>
    <div class="func-buttons">
      <ul class="buttons">
        <li>
            <el-button type="primary" @click="randomLow">随机低音</el-button>
        </li>
        <li>
            <el-button type="primary" @click="randomHigh">随机高音</el-button>
        </li>
        <li>
            <el-button type="primary" @click="randomAll">全范围随机</el-button>
        </li>
      </ul>
    </div>
    <div>
        <!-- <i class="el-icon-headset" @click="play">
            <audio src="http://localhost:8888/music/yun.mp3" type="audio/mpeg"></audio>
        </i> -->
        <div class="volume">
          <div @click="isMute = !isMute">
            <i
              v-if="volume == 0"
              class="iconfont icon-shengyinguanbi volume-icon pointer"
            ></i>
            <i v-else class="iconfont icon-shengyin volume-icon pointer"></i>
          </div>

          <div class="volume-slider">
            <el-slider v-model="volume" vertical height="200px"> </el-slider>
          </div>
        </div>
    </div>
    <div>
        <el-dropdown>
        <el-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div>
        <h1>Twinkle Twinkle Little Star:</h1>

        <button id="btn" @click="btnClick" :disabled="btn_disable">{{btn_text}}</button>
        <svg></svg>
    </div>
    <div id="vae">
        <h2 id="soundfonts">SoundFonts</h2>
        <section>
            <p>There are several SoundFonts that you can use with the
            <code>mm.SoundFontPlayer</code>, for more realistic sounding instruments:</p>
            <table>
            <thead>
                <td><b>Instrument</b></td>
                <td><b>Name</b></td>
                <td></td>
                <td>License</td>
            </thead>
            <tbody>
                <tr>
                <td>Piano</td>
                <td>salamander</td>
                <td><button id="playSF_0">Play</button></td>
                <td>Audio samples from <a href="https://archive.org/details/SalamanderGrandPianoV3">Salamander Grand Piano</a></td>
                </tr>
                <tr>
                <td>Multi</td>
                <td>sgm_plus</td>
                <td><select id="select" class="button"></select><button id="playSF_1">Play</button></td>
                <td>Audio samples from <a href="https://www.polyphone-soundfonts.com/en/files/27-instrument-sets/256-sgm-v2-01">SGM</a> by Shan</td>
                </tr>
                <tr>
                <td>Percussion</td>
                <td>jazz_kit</td>
                <td><button id="playSF_2">Play</button></td>
                <td>Audio samples from <a href="https://musical-artifacts.com/artifacts/686">Jazz Kit (EXS)</a> by Lithalean</td>
                </tr>
            </tbody>
            </table>
        </section>
    </div>
    <div>
        <h1>Onsets and Frames</h1>
        <p><code><a href="https://g.co/magenta/onsets-frames">Onsets and Frames</a></code>
            is a deep neural network that transcribes audio of piano performances to
            <code>NoteSequences</code>/<code>MIDI</code>.
        </p>

        <h2>From a local audio file</h2>
        <p>You can use your own piano music file (i.e. actual audio, not midi) for transcription:</p>
        <section>
            <label class="button">
            Load audio file
            <input type="file" id="fileInput">
            </label>
            <br>
            <p><audio id="filePlayer" controls hidden></audio></p>
            <p><b>Actual Transcription:</b> <code id="file-results" class="file"></code></p>
            <p><b>It Took:</b> <code id="file-time" class="file"></code></p>
        </section>
    </div>
</div>
    
</template>


<script>
import * as mm from '@magenta/music/es6';
import {DRUM_SEQS} from './common';
import { transcribeFromFile } from './transcription';

export default{


    data(){
        return{
            ctx: null,
            music_data: null,
            frequencyRatioTempered: 1.059463,
            isMute: false,
            volume: 50,
            saveVolume: 50,
            FULL_TWINKLE: mm.INoteSequence = {
                notes: [
                    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
                    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
                    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
                    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
                    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
                    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, program: 0},
                    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
                    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, program: 0},
                    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, program: 0},
                    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, program: 0},
                    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, program: 0},
                    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, program: 0},
                    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, program: 0},
                    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, program: 0},
                    {pitch: 67, quantizedStartStep: 32, quantizedEndStep: 34, program: 0},
                    {pitch: 67, quantizedStartStep: 34, quantizedEndStep: 36, program: 0},
                    {pitch: 65, quantizedStartStep: 36, quantizedEndStep: 38, program: 0},
                    {pitch: 65, quantizedStartStep: 38, quantizedEndStep: 40, program: 0},
                    {pitch: 64, quantizedStartStep: 40, quantizedEndStep: 42, program: 0},
                    {pitch: 64, quantizedStartStep: 42, quantizedEndStep: 44, program: 0},
                    {pitch: 62, quantizedStartStep: 44, quantizedEndStep: 48, program: 0},
                    {pitch: 67, quantizedStartStep: 48, quantizedEndStep: 50, program: 0},
                    {pitch: 67, quantizedStartStep: 50, quantizedEndStep: 52, program: 0},
                    {pitch: 65, quantizedStartStep: 52, quantizedEndStep: 54, program: 0},
                    {pitch: 65, quantizedStartStep: 54, quantizedEndStep: 56, program: 0},
                    {pitch: 64, quantizedStartStep: 56, quantizedEndStep: 58, program: 0},
                    {pitch: 64, quantizedStartStep: 58, quantizedEndStep: 60, program: 0},
                    {pitch: 62, quantizedStartStep: 60, quantizedEndStep: 64, program: 0},
                    {pitch: 60, quantizedStartStep: 64, quantizedEndStep: 66, program: 0},
                    {pitch: 60, quantizedStartStep: 66, quantizedEndStep: 68, program: 0},
                    {pitch: 67, quantizedStartStep: 68, quantizedEndStep: 70, program: 0},
                    {pitch: 67, quantizedStartStep: 70, quantizedEndStep: 72, program: 0},
                    {pitch: 69, quantizedStartStep: 72, quantizedEndStep: 74, program: 0},
                    {pitch: 69, quantizedStartStep: 74, quantizedEndStep: 76, program: 0},
                    {pitch: 67, quantizedStartStep: 76, quantizedEndStep: 80, program: 0},
                    {pitch: 65, quantizedStartStep: 80, quantizedEndStep: 82, program: 0},
                    {pitch: 65, quantizedStartStep: 82, quantizedEndStep: 84, program: 0},
                    {pitch: 64, quantizedStartStep: 84, quantizedEndStep: 86, program: 0},
                    {pitch: 64, quantizedStartStep: 86, quantizedEndStep: 88, program: 0},
                    {pitch: 62, quantizedStartStep: 88, quantizedEndStep: 90, program: 0},
                    {pitch: 62, quantizedStartStep: 90, quantizedEndStep: 92, program: 0},
                    {pitch: 60, quantizedStartStep: 92, quantizedEndStep: 96, program: 0}
                ],
                tempos: [
                    {time: 0, qpm: 60}
                ],
                quantizationInfo: {stepsPerQuarter: 4},
                totalQuantizedSteps: 96
            },
            player: null,
            btn_text: 'Loading samples...',
            btn_disable: true,
            viz: null,
            vae: null,
            soundFontPlayers: null,
            soundFontMelodies: null
        }
    },
    watch: {
        isMute(val) {
        if (val) {
            this.saveVolume = this.volume
            this.volume = 0
        } else {
            this.volume = this.saveVolume
        }
        },
        /* 监听音量的改变 */
        volume() {
            this.changeVolume()
        },
    },
    mounted() {
        document.getElementById('fileInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            transcribeFromFile(file);
            return false;
        });
        this.soundFontPlayers = []
        this.soundFontMelodies = []
        this.generateSoundFontPlayers()
        this.viz = new mm.PianoRollSVGVisualizer(this.FULL_TWINKLE, document.querySelector('svg'));
        this.player = new mm.SoundFontPlayer(
            'https://storage.googleapis.com/magentadata/js/soundfonts/salamander',
            undefined, undefined, undefined,
            {
            run: (note) => {
                this.viz.redraw(note, true);
            },
            stop: () => {
                this.btn_text = 'Play';
            }
        });
        this.player.loadSamples(this.FULL_TWINKLE).then(() => {
            this.btn_text = 'Play';
            this.btn_disable = false;
        });

      let isSP, xml, data, keyboards, ctx;

      // コンテキストを生成
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioContext();

      // 音源ファイルをバイナリデータとして取得
      xml = new XMLHttpRequest();
      xml.responseType = 'arraybuffer';
      xml.open('GET', 'http://localhost:8888/music/piano.wav', true);
      xml.onload = function() {
          // 音源ファイルをバイナリデータからデコード
          ctx.decodeAudioData(
              xml.response,
              function(_data) {
                  data = _data;
                  this.music_data = data;
              },
              function(e) {
                  alert(e.err);
              }
          );
      };
      xml.send();

      isSP = typeof window.ontouchstart !== 'undefined';

      // 鍵盤要素の集合を配列化する
      keyboards = Array.prototype.slice.call(
          document.getElementsByClassName('keyboard')
      );
      
      let frequencyRatioTempered = 1.059463

      // 高い方から順に、鍵盤要素のクリック/タッチイベントを登録する
      keyboards.reverse().map(function(keyboard, index) {
          let i, frequencyRatio;
          // 基準音から何音はなれているかで、周波数比を求める
          frequencyRatio = 1;
          for (i = 0; i < index; i++) {
              frequencyRatio /= frequencyRatioTempered;
          }
          keyboard.addEventListener(isSP ? 'touchstart' : 'click', function() {
              let bufferSource;
              bufferSource = ctx.createBufferSource();
              bufferSource.buffer = data;
              // 音源再生速度の比率変更で、音源の高さを調整
              bufferSource.playbackRate.value = frequencyRatio;
              bufferSource.connect(ctx.destination);
              bufferSource.start(0);
          });
      });

            
      document.onkeydown = function() {            
        let key = window.event.keyCode;            
        if (key== 48) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[0]
            div.click()
        }
        if (key== 49) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[1]
            div.click()
        }
        if (key== 50) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[2]
            div.click()
        }
        if (key== 51) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[3]
            div.click()
        }
        if (key== 52) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[4]
            div.click()
        }
        if (key== 53) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[5]
            div.click()
        }
        if (key== 54) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[6]
            div.click()
        }
        if (key== 55) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[7]
            div.click()
        }
        if (key== 56) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[8]
            div.click()
        }
        if (key== 57) {//== 83 && event.ctrlKey
            window.event.preventDefault()
            let div = document.getElementsByClassName("keyboard")[9]
            div.click()
        }
    };0

      this.ctx = ctx;
    },
    methods: {
        btnClick(){
            if (this.player.isPlaying()) {
                this.btn_text = 'Play';
                this.player.stop();
            } else {
                this.btn_text = 'Stop';
                this.player.start(this.FULL_TWINKLE);
            }
        },
        randomLow(){
            let i = 0;
            let interval = setInterval(()=>{
                if (i > 5)
                    clearInterval(interval)
                let  index = Math.ceil(Math.random()*4)  
                let div = document.getElementsByClassName("keyboard")[index]
                div.click()
                i++
            }, 1000)
          
        },
        randomHigh(){
            let i = 0;
            let interval2 = setInterval(()=>{
                if (i > 5)
                    clearInterval(interval2)
                let  index = Math.ceil(Math.random()*4 + 4)  
                let div = document.getElementsByClassName("keyboard")[index]
                div.click()
                i++
            }, 1000)
          
        },
        randomAll(){
            let i = 0;
            let interval3 = setInterval(()=>{
                if (i > 5)
                    clearInterval(interval3)
                let  index = Math.ceil(Math.random()*13)  
                let div = document.getElementsByClassName("keyboard")[index]
                div.click()
                i++
            }, 1000)
          
        },
        play(){

        },
        async generateSoundFontPlayers() {
            const baseUrl = 'https://storage.googleapis.com/magentadata/js/soundfonts/';
            this.soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'salamander'));
            this.soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'sgm_plus'));
            this.soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'jazz_kit'));

            this.soundFontMelodies.push(this.FULL_TWINKLE);
            this.soundFontMelodies.push(this.FULL_TWINKLE);
            this.soundFontMelodies.push(DRUM_SEQS[1]);

            // Load the sgm instruments.
            const response =
                await (await fetch(`${baseUrl}sgm_plus/soundfont.json`)).json();
            const instruments = Object.values(response.instruments);
            const select = document.getElementById('select');
            select.innerHTML = instruments.map(i => `<option>${i}</option>`).join('');

            // Preload the samples.
            for (let i = 0; i < this.soundFontPlayers.length; i++) {
                this.soundFontPlayers[i].loadSamples(this.soundFontMelodies[i]).then(() => {
                const el = document.getElementById('playSF_' + i);
                el.removeAttribute('disabled');
                el.textContent = 'Play';
                });
            }

            document.getElementById('playSF_0')
                .addEventListener('click', (event) => this.playSoundFont(event, 0));
            document.getElementById('playSF_1')
                .addEventListener('click', (event) => this.playSoundFont(event, 1));
            document.getElementById('playSF_2')
                .addEventListener('click', (event) => this.playSoundFont(event, 2));
        },
        async playSoundFont(event, index) {
            const player = this.soundFontPlayers[index];
            const button = event.target;

            // If this is the sgm player, use the right instrument.
            if (index === 1) {
                const instrument =
                    (document.getElementById('select')).selectedIndex;
                this.soundFontMelodies[1].notes.forEach(n => n.program = instrument);
            }

            if (player.isPlaying()) {
                player.stop();
                button.textContent = 'Play';
            } else {
                button.textContent = 'Stop';
                player.start(this.soundFontMelodies[index]);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.total {
  width: 100%;
}

.func-buttons{
  width: 100%;
  margin-top: 50px;
  text-align: center;

  .buttons{
    box-sizing: border-box;
    width: 100%;
    display: flex;
    
    margin-left: 400px;

    li{
      box-sizing: border-box;
      margin-left: 100px;
    }
    
  }
}

.piano{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}
.keyboard {
    transition: background-color .1s ease 0s;
}
.keyboard:active {
    background-color: #DFFF30;
}
.keyboard-white {
    float: left;
    width: calc(95% / 8);
    height: 550px;
    border: 1px solid black;
}
.keyboard-black {
    height: 50%;
    position: absolute;
    top: 0;
    width: calc(95% / 12);
    background-color: black;
    border: 2px solid black;
}
.keyboard:nth-of-type(2) {left: 8%}
.keyboard:nth-of-type(4) {left: 21%}
.keyboard:nth-of-type(7) {left: 45%}
.keyboard:nth-of-type(9) {left: 58%}
.keyboard:nth-of-type(11) {left: 71%}

#vae{
    text-align: left;
}

section {
  background: #F2F2F2;
  padding: 14px;
  margin-bottom: 48px;
}

a {
  color: #2a7ae2;
  text-decoration: none;
}
a:visited {
  color: #1756a9;
}
a:hover {
  color: #111;
  text-decoration: none;
}

button, .button {
  font-family: "Roboto", Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  padding: 4px 14px;
  margin-right: 8px;
  background: transparent;
  cursor: pointer;
}
button:hover, .button:hover {
  background: #6FC9C6;
  color: white;
}
button, .button, textarea {
  outline: none;
  border: 3px solid #222;
  color: #222;
  background: white;
}
</style>
