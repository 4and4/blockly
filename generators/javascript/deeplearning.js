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
 * @fileoverview Plot blocks for Milo (github.com/4and4/MiloServer).
 *
 *
 * @author Arjun Rao, Ayush Bihani
 */

'use strict';
goog.provide('Blockly.JavaScript.dl');
goog.require('Blockly.JavaScript');


Blockly.JavaScript.dl_constant = function(a) {
    return [parseFloat(a.getFieldValue("NUM")),Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dl_createoptimizer = function(block){
    var optimizer = block.getFieldValue('optimizer');
    var rate = parseFloat(block.getFieldValue('rate'));
    var numBatches = parseInt(block.getFieldValue('numBatches'));
    var batchSize = parseInt(block.getFieldValue('batchSize'));
    var code =  '\n const rate = '+ rate +';' +'\n const optimizer = '+ 'new dl.'+optimizer+'(rate)' + ';'  + '\n' + '\n const numBatches = '+ numBatches+';' +'\n'+ '\n const batchSize = ' + batchSize+';' + '\n' ;
    return code;
};

Blockly.JavaScript['dl_predict'] = function(block) {
    var number_testx = Blockly.JavaScript.valueToCode(block, "NUM", Blockly.JavaScript.ORDER_FUNCTION_CALL);
    var code = 'session.eval(outputTensor,[{tensor: inputTensor, data: dl.Array1D.new('+number_testx+')}])';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dl_number'] = function(block) {
    var arg0 = parseFloat(block.getFieldValue("NUM"));
    var code = "dl.Scalar.new(" + arg0 +")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dl_array1d'] = function(block) {
    var arg0 = Blockly.JavaScript.valueToCode(block, "NUM", Blockly.JavaScript.ORDER_FUNCTION_CALL);
    var code = "dl.Array1D.new(" + arg0 +")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dl_get_scalar'] = function(block) {
    var zero = "dl.Scalar.new(0)";
    arg0 = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || zero;
    var code = arg0+".dataSync()";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dl_arithmetic'] = function(block) {
    // Basic arithmetic operators, and power.
    var OPERATORS = {
      'ADD': ['math.add', Blockly.JavaScript.ORDER_ADDITION],
      'MINUS': ['math.subtract', Blockly.JavaScript.ORDER_SUBTRACTION],
      'MULTIPLY': ['math.multiply', Blockly.JavaScript.ORDER_MULTIPLICATION],
      'DIVIDE': ['math.divide', Blockly.JavaScript.ORDER_DIVISION],
    };
    var tuple = OPERATORS[block.getFieldValue('OP')];
    var operator = tuple[0];
    var order = tuple[1];
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
    var code;
    code = operator+'(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};




Blockly.JavaScript['dl_dataconfiguration'] = function(block) {
    var value_noattributes = Blockly.JavaScript.valueToCode(block, 'noAttributes', Blockly.JavaScript.ORDER_ATOMIC);
    var value_labelshape = Blockly.JavaScript.valueToCode(block, 'labelShape', Blockly.JavaScript.ORDER_ATOMIC);
    var inputTensor = '\n var inputTensor = graph.placeholder(\'input\',[' +  value_noattributes  + ']);';
    var multiplier = '\n var multiplier = graph.variable(\'multiplier\', dl.Array2D.randNormal([1,' +value_noattributes+']));';
    var labelTensor = '\n var labelTensor =  graph.placeholder(\'label\','+ value_labelshape+');';
    var outputTensor = '\n var outputTensor = graph.matmul(multiplier, inputTensor);';
    var costTensor = '\n var costTensor = graph.meanSquaredCost(outputTensor, labelTensor);';
    var code = inputTensor+multiplier+labelTensor+outputTensor+costTensor;
    return code;
};

Blockly.JavaScript['dl_feedentry'] = function(block) {
    var value_inuptx = Blockly.JavaScript.valueToCode(block, 'inuptX', Blockly.JavaScript.ORDER_ATOMIC);
    var value_inputy = Blockly.JavaScript.valueToCode(block, 'inputY', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_costfunction = block.getFieldValue('costFunction');
    // TODO: Assemble JavaScript into code variable.
    var costFunction = '\nvar costFunction = dl.CostReduction.' + dropdown_costfunction +';';
    var shuffledInputProviderBuilder =  '\nvar shuffledInputProviderBuilder = new dl.InCPUMemoryShuffledInputProviderBuilder([' + value_inuptx + ','+  value_inputy +']);';
    var _a = '\nvar _a = shuffledInputProviderBuilder.getInputProviders(), inputProvider = _a[0], labelProvider = _a[1];';
    var FeedEntry = '\nvar FeedEntry = [{tensor: inputTensor, data: inputProvider},{tensor: labelTensor, data: labelProvider}];\n';
    var code = costFunction + shuffledInputProviderBuilder + _a + FeedEntry;
    return code;
};

Blockly.JavaScript['dl_train'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'var cost = session.train(costTensor, FeedEntry, batchSize, optimizer, costFunction);\n';
  return code;
};



