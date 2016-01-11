import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  entries: DS.hasMany('entry'),
  hours: DS.attr('number')
});
