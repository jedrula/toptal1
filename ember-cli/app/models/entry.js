import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  hours: DS.attr('number'),
  date: DS.attr('date')
});
