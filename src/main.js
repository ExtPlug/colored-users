define(function (require, exports, module) {

  const Plugin = require('extplug/Plugin');
  const Style = require('extplug/util/Style');
  const users = require('plug/collections/users');
  const color = require('onecolor');

  const COLOR_KEY = '_extplug-colored-users-color';

  const ColoredUsers = Plugin.extend({
    name: 'Colored Users',
    description: 'Gives everyone a mostly-unique color.',

    enable() {
      this.onReset();

      this.listenTo(users, 'add', this.onUser);
      this.listenTo(users, 'reset', this.onReset);
    },

    disable() {
      this.style.remove();
    },

    selectorFor(id) {
      return `#chat .id-${id} .un, ` +
             `.list .user.id-${id} .name`;
    },
    colorFor(id) {
      let hue = Math.round((id * 16777619 % 256) * 16777619 % 256) / 2.56;
      return color(`hsv(${hue}%, 50%, 95%)`);
    },

    onReset() {
      if (this.style) this.style.remove();
      this.style = new Style();
      users.forEach(this.onUser, this);
    },

    onUser(user) {
      let id = user.get('id');
      let color = this.colorFor(id);
      this.style.set(this.selectorFor(id), {
        color: `${color.hex()} !important`
      });
    }
  });

  module.exports = ColoredUsers;

});
