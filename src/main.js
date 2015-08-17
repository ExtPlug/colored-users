define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');

  const ColoredUsers = Plugin.extend({
    name: 'Colored Users',
    description: 'Gives everyone a mostly-unique color.',

    enable() {
      // code to start your plugin
    },

    disable() {
      // code to undo what you did in enable()
    }
  });

  module.exports = ColoredUsers;

});
