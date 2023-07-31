import { prepareRollDialog } from "../helpers/roll.mjs";

/** @extends {ActorSheet} */
export class MySystemActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["mysystem", "sheet", "actor"],
      template: "systems/mysystem/templates/actor/actor-sheet.hbs",
      width: 650,
      height: 650
    });
  }

  /** @override */
  get template() {
    if ( !game.user.isGM && this.actor.limited ) return "systems/mysystem/templates/actor/limited-sheet.hbs";
    return `systems/mysystem/templates/actor/${this.actor.type}-sheet.hbs`;
  }

  /** @override */
  async getData() {
    const context = await super.getData();
    const actorData = this.actor.toObject(false);

    // Encrich editor content
    context.enrichedGeneral = await TextEditor.enrichHTML(this.object.system.description.general, { async: true })
    context.enrichedNotes = await TextEditor.enrichHTML(this.object.system.description.notes, { async: true })
    context.enrichedBiography = await TextEditor.enrichHTML(this.object.system.description.biography, { async: true })

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    return context;
  }

  /** @override */
  activateListeners(hbs) {
    super.activateListeners(hbs);

    // Rollable.
    hbs.find('.check').click(this._onCheck.bind(this));
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */

  _onCheck(event) {
    event.preventDefault();
    const testType = event.currentTarget.dataset.type;
    prepareRollDialog(this, testType)
  }

}
