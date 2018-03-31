/**
 * @license
 * Milo IDE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Image blocks for Milo (github.com/4and4/MiloServer).
 *
 *
 * @author Ayush Bihani, Arjun Rao
 */

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['regression'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Perform")
        .appendField(new Blockly.FieldDropdown([["Linear Regression","LinearRegression"], ["Logistic Regression","LogisticRegression"], ["Multi Class Logistic Regression","MultiClassLogistic"]]), "regression_type");
    this.appendValueInput("iterations")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Number of Iterations");
    this.appendValueInput("rate")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Learning Rate");
    this.appendValueInput("lambda")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Lambda");
    this.setOutput(true, "regression");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['regression_train'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Train Regression with");
    this.appendValueInput("regression_variable")
        .setCheck("regression")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Regression");
    this.appendValueInput("train")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Train on ");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip(" \"Fits a regresion model on the data\"");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['regression_test'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Test Regression with");
    this.appendValueInput("regression_variable")
        .setCheck("regression")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Regression");
    this.appendValueInput("test")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Predict on ");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip(" \"Tests a regresion model on the data\"");
 this.setHelpUrl("");
  }
};
