"use strict";

window.addEventListener("DOMContentLoaded", init);

const hslArr = [];
const Color = {
    h: 0,
    s: 0,
    l: 0
};

function init() {
    console.log("init");
    document.querySelector("#colorpicker").addEventListener("input", getColor);
    //getColor();
}

function getColor() {
    console.log("getColor");
    const hex = document.querySelector("#colorpicker").value;
    //const hex = "#bada55";
    console.log(hex);
    const rgb = hexToRGB(hex);
    //console.log(rgb);
    const hsl = rgbToHSL(rgb);
    //console.log(hsl);

    calculateHarmony(hsl);
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
    console.log(hsl);

    for (let index = 0; index <= 4; index++) {
        const color = Object.create(Color);
        color.h = hsl.h;
        color.s = hsl.s;
        color.l = hsl.l;
        hslArr.push(color);
    } 

    if (hslArr.length > 5) {
        hslArr.shift(0);
        hslArr.shift(1);
        hslArr.shift(2);
        hslArr.shift(3);
        hslArr.shift(4);
    }

    const radioButtons = document.getElementsByName("harmony");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked === true && radioButtons[i].value === "analogous") {
            calcAnalogous(hsl);
        }
        if (radioButtons[i].checked === true && radioButtons[i].value === "monochromatic") {
            calcMonochromatic(hsl);
        }
        if (radioButtons[i].checked === true && radioButtons[i].value === "triad") {
            calcTriad(hsl);
        }
        if (radioButtons[i].checked === true && radioButtons[i].value === "complementary") {
            calcComplementary(hsl);
        }
        if (radioButtons[i].checked === true && radioButtons[i].value === "compound") {
            calcCompound(hsl);
        }
        if (radioButtons[i].checked === true && radioButtons[i].value === "shades") {
            calcShades(hsl);
        }
    }
    //calcAnalogous(hsl);
    displayColorInfo(hslArr);
}

function calcAnalogous(hsl) {
    console.log("calcAnalogous");
    console.log(hsl);

    hslArr[0].h = hsl.h-40;
    hslArr[1].h = hsl.h-20;
    hslArr[3].h = hsl.h+20;
    hslArr[4].h = hsl.h+40;
    //console.log(hslArr);
    if (hslArr[0].h < 0) {
        hslArr[0].h = hslArr[0].h + 359;
    }
    if (hslArr[1].h < 0) {
        hslArr[1].h = hslArr[1].h + 359;
    }
    if (hslArr[3].h > 359) {
        hslArr[3].h = hslArr[3].h - 359;
    }
    if (hslArr[4].h > 359) {
        hslArr[4].h = hslArr[4].h - 359;
    }

    return hslArr;
}

function calcMonochromatic(hsl) {
    console.log("calcMonochromatic");
    console.log(hsl);

    // for (let index = 0; index <= 4; index++) {
    //     const color = Object.create(Color);
    //     color.h = hsl.h;
    //     color.s = hsl.s;
    //     color.l = hsl.l;
    //     hslArr.push(color);
    // } 

    hslArr[0].s = hsl.s+15;
    hslArr[1].s = hsl.s-15;
    hslArr[3].l = hsl.l+15;
    hslArr[4].l = hsl.l-15;

    if (hslArr[0].s > 100) {
        hslArr[0].s = 100;
    } 
    if (hslArr[1].s < 0) {
        hslArr[1].s = 0;
    }
    if (hslArr[3].l > 100) {
        hslArr[3].l = 100;
    }
    if (hslArr[4].s < 0) {
        hslArr[4].s = 0;
    }

    //console.log(hslArr);
    //displayColorInfo(hslArr);
    return hslArr;
}

function calcTriad(hsl) {
    console.log("calcTriad");
    console.log(hsl);

    // for (let index = 0; index <= 4; index++) {
    //     const color = Object.create(Color);
    //     color.h = hsl.h;
    //     color.s = hsl.s;
    //     color.l = hsl.l;
    //     hslArr.push(color);
    // } 

    hslArr[0].h = hsl.h-120;
    hslArr[1].h = hsl.h-120;
    hslArr[1].l = hsl.l+20;
    hslArr[3].h = hsl.h+120;
    hslArr[3].l = hsl.l+20;
    hslArr[4].h = hsl.h+120;

    if (hslArr[0].h < 0) {
        hslArr[0].h = hslArr[0].h + 359;
    }
    if (hslArr[1].h < 0) {
        hslArr[1].h = hslArr[1].h + 359;
    }
    if (hslArr[1].l > 100) {
        hslArr[1].l = 100;
    }
    if (hslArr[3].h > 359) {
        hslArr[3].h = hslArr[3].h - 359;
    }
    if (hslArr[3].l > 100) {
        hslArr[3].l = 100;
    }
    if (hslArr[4].h > 359) {
        hslArr[4].h = hslArr[4].h - 359;
    }
    //console.log(hslArr);
    // displayColorInfo(hslArr);
    return hslArr;
}

function calcComplementary(hsl) {
    console.log("calcComplementary");
    console.log(hsl);

    // for (let index = 0; index <= 4; index++) {
    //     const color = Object.create(Color);
    //     color.h = hsl.h;
    //     color.s = hsl.s;
    //     color.l = hsl.l;
    //     hslArr.push(color);
    // } 

    hslArr[0].h = hsl.h-180;
    hslArr[1].h = hsl.h-180;
    hslArr[1].l = hsl.l+20;
    hslArr[3].l = hsl.l+20;
    hslArr[4].l = hsl.l-20;

    if (hslArr[0].h < 0) {
        hslArr[0].h = hslArr[0].h + 359;
    }
    if (hslArr[1].h < 0) {
        hslArr[1].h = hslArr[1].h + 359;
    }
    if (hslArr[1].l > 100) {
        hslArr[1].l = 100;
    }
    if (hslArr[3].l > 100) {
        hslArr[3].l = 100;
    }
    if (hslArr[4].l < 0) {
        hslArr[4].l = 0;
    }
    //console.log(hslArr);
    // displayColorInfo(hslArr);
    return hslArr;
}

function calcCompound(hsl) {
    console.log("calcCompound");
    console.log(hsl);

    // for (let index = 0; index <= 4; index++) {
    //     const color = Object.create(Color);
    //     color.h = hsl.h;
    //     color.s = hsl.s;
    //     color.l = hsl.l;
    //     hslArr.push(color);
    // } 

    hslArr[0].h = hsl.h-180;
    hslArr[1].h = hsl.h-160;
    hslArr[3].h = hsl.h+60;
    hslArr[4].h = hsl.h+80;

    if (hslArr[0].h < 0) {
        hslArr[0].h = hslArr[0].h + 359;
    }
    if (hslArr[1].h < 0) {
        hslArr[1].h = hslArr[1].h + 359;
    }
    if (hslArr[3].h > 359) {
        hslArr[3].h = hslArr[3].h - 359;
    }
    if (hslArr[4].h > 359) {
        hslArr[4].h = hslArr[4].h - 359;
    }

    //console.log(hslArr);
    // displayColorInfo(hslArr);
    return hslArr;
}

function calcShades(hsl) {
    console.log("calcShades");
    console.log(hsl);

    // for (let index = 0; index <= 4; index++) {
    //     const color = Object.create(Color);
    //     color.h = hsl.h;
    //     color.s = hsl.s;
    //     color.l = hsl.l;
    //     hslArr.push(color);
    // } 

    hslArr[0].l = hsl.l-30;
    hslArr[1].l = hsl.l-15;
    hslArr[3].l = hsl.l+15;
    hslArr[4].l = hsl.l+30;

    if (hslArr[0].l < 0) {
        hslArr[0].l = 0;
    }
    if (hslArr[1].l < 0) {
        hslArr[1].l = 0;
    }
    if (hslArr[3].l > 100) {
        hslArr[3].l = 100;
    }
    if (hslArr[4].l > 100) {
        hslArr[4].l = 100;
    }

    // console.log(hslArr);
    // displayColorInfo(hslArr);
    return hslArr;
}

function displayColorInfo(hslArr) {
    console.log("displayColorInfo");
    console.log(hslArr);

    for (let index = 0; index <= 4; index++) {
        //console.log(hslArr[index]);
        const rgb = hslToRGB(hslArr[index]);
        //console.log(rgb);
        const hex = rgbToHex(rgb);
        //console.log(hex);
        const css = rgbToCSS(rgb);
        //console.log(css);

        showHex(hex, index);
        showRGB(rgb, index);
        showHSL(hslArr[index], index);
        changeBoxColor(css, index);
    }
}

function hslToRGB(hsl, index) {
    console.log(hsl);
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
    document.querySelector(`#colorinfo${index+1} .hex`).textContent = `HEX: ${hex}`;
}

function showRGB(rgb, index) {
    console.log("showRGB");    
    document.querySelector(`#colorinfo${index+1} .rgb`).textContent = `R: ${rgb.r} G: ${rgb.g} B: ${rgb.b}`;
}

function showHSL(hsl, index) {
    console.log("showHSL");
    const h = Math.round(hsl.h);
    const s = Math.round(hsl.s);
    const l = Math.round(hsl.l);

    document.querySelector(`#colorinfo${index+1} .hsl`).textContent = `H: ${h} S: ${s}% L: ${l}%`;
}

function changeBoxColor(css, index) {
    console.log("changeBoxColor");
    document.querySelector(`#colorinfo${index+1} .colorbox`).style.backgroundColor = css;
}