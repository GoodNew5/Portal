
"use strict"

import Portal from '../src/Portal'

const PortalTop = new Portal({
  target: '.button-5',
  positions: ['top', 'bottom'],
  triangle: true
});

const PortalTopNew = new Portal({
  target: '.button-4',
  positions: ['right', 'bottom'],
  triangle: true
});

const PortalBottom = new Portal({
  target: ".button-3",
  positions: ['left'],
  triangle: false
});

const PortalLeft = new Portal({
  triangle: true,
  positions: ['left', 'right'],
  hover: false,
  target: "#custom-button"
});

const test = new Portal({
  triangle: true,
  positions: ['top', 'bottom'],
  hover: false,
  target: ".button-2"
});

const PortalPreview = new Portal({
  positions: ['top'],
  triangle: true
});


