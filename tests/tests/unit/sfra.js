// These are necessary because of the fact that nodejs doesn't 
// by default include "window"
global["window"] = {};
var intern_1 = require("intern");
var fs = require("fs");
var vm = require("vm");
var jsdom_1 = require("jsdom");
var registerSuite = intern_1["default"].getInterface("object").registerSuite;
var _a = intern_1["default"].getPlugin("chai"), expect = _a.expect, assert = _a.assert;
registerSuite("EDQUtils Unit Tests", {
    tests: {
        "countryAlpha3 works": function () {
            // TODO: The file organization needs to be substantially improved, and then this can be
            // refactored
            var path = "/../../Experian_EDQ_SFRA/cartridges/Experian_EDQ_SFRA/cartridge/static/default/js/EDQUtils.js";
            var globalCode = fs.readFileSync(__dirname + path);
            var dom = new jsdom_1.JSDOM('<!DOCTYPE html>');
            var context = {
                window: dom.window,
                document: dom.window.document
            };
            // TODO: Figure out why this is happening later
            // @ts-ignore
            vm.runInNewContext(globalCode, context, path);
            assert.equal(true, Boolean(context.countryAlpha3), "countryAlpha3 exists as function");
            assert.equal("USA", context.countryAlpha3("US"), "US translate to USA via countryAlpha3");
        }
    }
});
