

define('extplug/colored-users/main',['require','exports','module','extplug/Plugin','extplug/util/Style','plug/collections/users','onecolor'],function (require, exports, module) {

  var Plugin = require('extplug/Plugin');
  var Style = require('extplug/util/Style');
  var users = require('plug/collections/users');
  var color = require('onecolor');

  var COLOR_KEY = '_extplug-colored-users-color';

  var ColoredUsers = Plugin.extend({
    name: 'Colored Users',
    description: 'Gives everyone a mostly-unique color.',

    enable: function enable() {
      this.onReset();

      this.listenTo(users, 'add', this.onUser);
      this.listenTo(users, 'reset', this.onReset);
    },

    disable: function disable() {
      this.style.remove();
    },

    selectorFor: function selectorFor(id) {
      return '#chat .id-' + id + ' .un, ' + ('.list .user.id-' + id + ' .name');
    },
    colorFor: function colorFor(id) {
      var hue = Math.round(id * 16777619 % 256 * 16777619 % 256) / 2.56;
      return color('hsv(' + hue + '%, 50%, 95%)');
    },

    onReset: function onReset() {
      if (this.style) this.style.remove();
      this.style = new Style();
      users.forEach(this.onUser, this);
    },

    onUser: function onUser(user) {
      var id = user.get('id');
      var color = this.colorFor(id);
      this.style.set(this.selectorFor(id), {
        color: color.hex() + ' !important'
      });
    }
  });

  module.exports = ColoredUsers;
});
