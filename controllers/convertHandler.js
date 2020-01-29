/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

"use strict";

function ConvertHandler() {
  this.getNum = function(input) {
    // Split at first letter
    const indexToSplit = input.search(/[A-Za-z]/);
    const numString =
      indexToSplit === -1 ? input : input.substring(0, indexToSplit);

    // Default to 1 if no number provided
    if (numString === "") return 1;

    // Check for fraction
    const fractionMatch = numString.match(/^(\d*\.?\d*)\/(\d*\.?\d*)$/);
    if (fractionMatch) {
      return Number(fractionMatch[1]) / Number(fractionMatch[2]) || NaN;
    }

    // Check for non-fraction number
    const nonFractionMatch = numString.match(/^\d*\.?\d*$/);
    if (nonFractionMatch) {
      return Number(numString) || NaN;
    }

    // Return NaN in all other cases
    return NaN;
  };

  this.getUnit = function(input) {
    // Split at first letter
    const indexToSplit = input.search(/[A-Za-z]/);
    const unitString = input.substring(indexToSplit);

    if (unitString.match(/^(gal|L|lbs|kg|mi|km)$/i)) {
      if (unitString.match(/^L$/i)) {
        return unitString.toUpperCase();
      } else {
        return unitString.toLowerCase();
      }
    } else {
      return null;
    }
  };

  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        return null;
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        return null;
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const roundToFiveDecimals = n => Math.round(n * 100000) / 100000;

    switch (initUnit) {
      case "gal":
        return roundToFiveDecimals(initNum * galToL);
      case "L":
        return roundToFiveDecimals(initNum / galToL);
      case "lbs":
        return roundToFiveDecimals(initNum * lbsToKg);
      case "kg":
        return roundToFiveDecimals(initNum / lbsToKg);
      case "mi":
        return roundToFiveDecimals(initNum * miToKm);
      case "km":
        return roundToFiveDecimals(initNum / miToKm);
      default:
        return null;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (!initNum) {
      return "invalid number" + (!initUnit ? " and unit" : "");
    } else if (!initUnit) {
      return "invalid unit";
    } else {
      return (
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum +
        " " +
        this.spellOutUnit(returnUnit)
      );
    }
  };
}

module.exports = ConvertHandler;
