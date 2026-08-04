(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var stageNodes = Array.prototype.slice.call(document.querySelectorAll(".stage-node"));
  var chip = document.getElementById("packetChip");
  var readout = document.getElementById("readout");

  if (!stageNodes.length || !chip || !readout || prefersReduced) return;

  // Frames pulled from the pipeline's real terminal output style.
  var frames = [
    { hex: "AA AA 5D E6", text: "> occ=1000 seq=1/4 bytes=32 fragmented" },
    { hex: "2A 7E 4D DA", text: "> forwarding occ=1000 seq=1/4 -> Queue 2" },
    { hex: "57 17 03 E8", text: "> occ=1000 seq=1/4 -> NGHam packet (90 bytes)" },
    { hex: "9A 28 DB 7B", text: "> Q1=0 Q2=0 gen_rate=9/s tx_rate=9/s" }
  ];

  var CYCLE_MS = 4500;
  var STEP_MS = CYCLE_MS / 4;

  function setActiveStage(index) {
    stageNodes.forEach(function (node, i) {
      node.classList.toggle("is-active", i === index);
    });
    var frame = frames[index];
    if (frame) {
      chip.textContent = frame.hex;
      readout.textContent = frame.text;
    }
  }

  var current = 0;
  setActiveStage(0);

  setInterval(function () {
    current = (current + 1) % frames.length;
    setActiveStage(current);
  }, STEP_MS);

})();
