/* UI wiring: reads the three fields, validates, renders result or error. */
(function () {
  'use strict';

  var calc = window.TipCalculator;

  var config = {
    amount: {
      el: document.getElementById('amount'),
      field: document.getElementById('amount-field'),
      helper: document.getElementById('amount-helper'),
      defaultHelper: 'Betrag in Euro'
    },
    percent: {
      el: document.getElementById('percent'),
      field: document.getElementById('percent-field'),
      helper: document.getElementById('percent-helper'),
      defaultHelper: 'Trinkgeld in Prozent'
    },
    people: {
      el: document.getElementById('people'),
      field: document.getElementById('people-field'),
      helper: document.getElementById('people-helper'),
      defaultHelper: 'Anzahl der Personen'
    }
  };

  var resultPanel = document.getElementById('result-panel');
  var errorBox = document.getElementById('error-box');
  var errorText = document.getElementById('error-box-text');
  var resultTip = document.getElementById('result-tip');
  var resultTotal = document.getElementById('result-total');
  var resultPerPerson = document.getElementById('result-per-person');

  function parseNumber(raw) {
    var s = String(raw).trim().replace(',', '.');
    if (s === '') return null;
    var n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  function describeError(kind, raw) {
    var n = parseNumber(raw);
    if (n === null) {
      if (kind === 'amount') return 'Bitte Betrag eingeben.';
      if (kind === 'percent') return 'Bitte Trinkgeld-Prozent eingeben.';
      return 'Bitte Personenzahl eingeben.';
    }
    if (kind === 'people') {
      return n < 1 ? 'Personenzahl muss mindestens 1 sein.' : null;
    }
    if (n < 0) {
      return kind === 'amount'
        ? 'Betrag darf nicht negativ sein.'
        : 'Trinkgeld-Prozent darf nicht negativ sein.';
    }
    return null;
  }

  function setFieldState(cfg, error) {
    var invalid = !!error;
    cfg.field.classList.toggle('is-invalid', invalid);
    cfg.el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    cfg.helper.textContent = invalid ? error : cfg.defaultHelper;
  }

  function update() {
    var amount = parseNumber(config.amount.el.value);
    var percent = parseNumber(config.percent.el.value);
    var people = parseNumber(config.people.el.value);

    var errAmount = describeError('amount', config.amount.el.value);
    var errPercent = describeError('percent', config.percent.el.value);
    var errPeople = describeError('people', config.people.el.value);

    setFieldState(config.amount, errAmount);
    setFieldState(config.percent, errPercent);
    setFieldState(config.people, errPeople);

    if (errAmount || errPercent || errPeople) {
      resultPanel.hidden = true;
      errorBox.hidden = false;
      errorText.textContent = 'Ungültige Eingabe – bitte korrigieren.';
      return;
    }

    var result = calc.calculateTip(amount, percent, people);
    errorBox.hidden = true;
    resultPanel.hidden = false;
    resultTip.textContent = calc.formatEuro(result.tip);
    resultTotal.textContent = calc.formatEuro(result.total);
    resultPerPerson.textContent = calc.formatEuro(result.perPerson);
  }

  Object.keys(config).forEach(function (key) {
    config[key].el.addEventListener('input', update);
  });

  update();
})();
