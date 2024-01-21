//
/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class BlankItem extends Item {
  prepareData() {
    super.prepareData();
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
   getRollData() {
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }
}
