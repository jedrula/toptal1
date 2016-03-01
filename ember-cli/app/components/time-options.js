import Ember from 'ember';
import PowerSelectComponent from './power-select';
//import { defaultOptions } from './power-select';
var availableHourOptions = [];
for(var i=0;i<25;i++) {
  availableHourOptions.push(i);
}
debugger;
export default Ember.Component.extend({
  availableHourOptions: availableHourOptions
});
