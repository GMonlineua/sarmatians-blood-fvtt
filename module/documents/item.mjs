//
/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class SarmatiansItem extends Item {
  prepareData() {
    super.prepareData();
  }

  /**
   * Handle clickable show description.
   * @param {Event} event   The originating click event
   * @private
   */
  async show() {
    const item = this;

    const renderData = {
      name: item.name,
      description: item.system.description
    };

    const message = await renderTemplate("systems/bitd/templates/apps/rollItem.hbs", renderData);
    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: message
    };
    ChatMessage.create(chatData);
  }
}
