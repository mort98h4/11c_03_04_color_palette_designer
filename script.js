"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    getColor();
}

function getColor() {
    console.log("getColor");
    //const hex = document.querySelector("#colorpicker").value;
    const hex = "#bada55";
    console.log(hex);
    const rgb = hexToRGB(hex);
    console.log(rgb);
    const hsl = rgbToHSL(rgb);
    console.log(hsl);

    calc(hsl);
}

function hexToRGB(hex) {
    console.log("hexToRGB");
    hex = hex.substring(1);
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);
    return {r, g, b};
}

function rgbToHSL(rgb) {
    console.log("rgbToHSL");
    const r = rgb.r /= 255;
    const g = rgb.g /= 255;
    const b = rgb.b /= 255;
 
    let h, s, l;
 
    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
  
    if( max === min ) {
        h = 0;
    } else 
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min) );
    }
  
    if (h < 0) {
        h = h + 360; 
    }
  
    l = (min + max) / 2;
  
    if (max === 0 || min === 1 ) {
        s = 0;
    } else {
        s = (max - l) / ( Math.min(l,1-l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;
    
    //console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return {h, s, l};
}

function calculateHarmony(hsl) {
    console.log("calculateHarmony");
}

function calcAnalogous(hsl) {
    console.log("calcAnalogous");
}

function calcMonochromatic() {
    console.log("calcMonochromatic");
}

function calcTriad() {
    console.log("calcTriad");
}

function calcComplementary() {
    console.log("calcComplementary");
}

function calcCompound() {
    console.log("calcCompound");
}

function calcShades() {
    console.log("calcShades");
}

function displayColorInfo(hsl) {
    console.log("displayColorInfo");
    console.log(hsl);
    const rgb = hslToRGB(hsl);
    console.log(rgb);
    const hex = rgbToHex(rgb);
    console.log(hex);
    const css = rgbToCSS(rgb);
    console.log(css);

    showHex(hex, 3);
    showRGB(rgb, 3);
    showHSL(hsl, 3);
    changeBoxColor(css, 3);
}

function hslToRGB(hsl) {
    console.log("hslToRGB");
    const h = hsl.h;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
 
    let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return {r,g,b};
}

function rgbToHex(rgb) {
    console.log("rgbToHex");
    const hexR = rgb.r.toString(16).padStart(2,"0");
    const hexG = rgb.g.toString(16).padStart(2,"0");
    const hexB = rgb.b.toString(16).padStart(2,"0");

    return "#" + hexR + hexG + hexB;
}

function rgbToCSS(rgb) {
    console.log("rgbToCSS");
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function showHex(hex, index) {
    console.log("showHex");
    hex = hex.toUpperCase();
    document.querySelector(`#colorinfo${index} .hex .value`).textContent = `HEX: ${hex}`;
}

function showRGB(rgb, index) {
    console.log("showRGB");    
    document.querySelector(`#colorinfo${index} .rgb .value`).textContent = `R: ${rgb.r} G: ${rgb.g} B: ${rgb.b}`;
}

function showHSL(hsl, index) {
    console.log("showHSL");
    const h = Math.round(hsl.h);
    const s = Math.round(hsl.s);
    const l = Math.round(hsl.l);

    document.querySelector(`#colorinfo${index} .hsl .value`).textContent = `H: ${h} S: ${s}% L: ${l}%`;
}

function changeBoxColor(css, index) {
    console.log("changeBoxColor");
    document.querySelector(`#colorinfo${index} .colorbox`).style.backgroundColor = css;
}