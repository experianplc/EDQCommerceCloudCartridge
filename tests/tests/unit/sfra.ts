// These are necessary because of the fact that nodejs doesn't 
// by default include "window"
global["window"] = {};

import intern from "intern";
import * as fs from "fs";
import * as vm from "vm";
import { JSDOM } from "jsdom";

const { registerSuite } = intern.getInterface("object");
const { expect, assert } = intern.getPlugin("chai");

registerSuite("EDQUtils Unit Tests", {

  tests: {

    "countryAlpha3 works"() {
      // TODO: The file organization needs to be substantially improved, and then this can be
      // refactored
      let path: string = "/../../Experian_EDQ_SFRA/cartridges/Experian_EDQ_SFRA/cartridge/static/default/js/EDQUtils.js";
      let globalCode: Buffer = fs.readFileSync(__dirname + path);
      const dom = new JSDOM('<!DOCTYPE html>');
      let context: any = {
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

