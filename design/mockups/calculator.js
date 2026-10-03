/* Pure, side-effect-free tip calculation (mirrors the product's module). */
(function () {
  'use strict';

  function round2(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  function formatEuro(value) {
    var n = Number(value);
    if (!Number.isFinite(n)) n = 0;
    var parts = n.toFixed(2).split('.');
    var intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return '€ ' + intPart + ',' + parts[1];
  }

  /* Returns { tip, total, perPerson } or null when inputs are invalid. */
  function calculateTip(amount, percent, people) {
    if (!Number.isFinite(amount) || amount < 0) return null;
    if (!Number.isFinite(percent) || percent < 0) return null;
    if (!Number.isFinite(people) || people < 1) return null;

    var tip = round2((amount * percent) / 100);
    var total = round2(amount + tip);
    var perPerson = round2(total / people);
    return { tip: tip, total: total, perPerson: perPerson };
  }

  window.TipCalculator = {
    round2: round2,
    formatEuro: formatEuro,
    calculateTip: calculateTip
  };
})();
