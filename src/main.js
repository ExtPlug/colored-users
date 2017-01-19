import Plugin from 'extplug/Plugin';
import Style from 'extplug/util/Style';
import users from 'plug/collections/users';
import color from 'onecolor';

const ColoredUsers = Plugin.extend({
  name: 'Colored Users',
  description: 'Gives everyone a mostly unique color.',

  enable() {
    this.onReset();

    this.listenTo(users, 'add', this.onUser);
    this.listenTo(users, 'reset', this.onReset);
  },

  disable() {
    this.style.remove();
  },

  selectorFor(id) {
    return `#chat .id-${id} .un, .list .user.id-${id} .name`;
  },

  colorFor(id) {
    const hue = Math.round((id * 16777619 % 256) * 16777619 % 256) / 2.56;
    return color(`hsv(${hue}%, 50%, 95%)`);
  },

  onReset() {
    if (this.style) this.style.remove();
    this.style = new Style();
    users.forEach(this.onUser, this);
  },

  onUser(user) {
    const id = user.get('id');
    const color = this.colorFor(id);
    this.style.set(this.selectorFor(id), {
      color: `${color.hex()} !important`
    });
  }
});

export default ColoredUsers;
