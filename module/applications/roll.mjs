const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

/**
 * A Foundry VTT ApplicationV2 for handling custom dice rolls.
 */
export default class SarmatiansRollerApp extends HandlebarsApplicationMixin(ApplicationV2) {
  /**
   * Default ApplicationV2 options.
   * @returns {object} Default options for this application.
   * @see {foundry.applications.api.ApplicationV2.DEFAULT_OPTIONS}
   */
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    id: "sarmatins-rolls",
    classes: ["sarmatins-rolls"],
    tag: "form",
    window: {
      width: 400,
      height: "auto",
      minimizable: false,
      resizable: false,
    },
    form: {
      handler: this.#onSubmit,
      closeOnSubmit: true,
    }
  };

  static PARTS = {
    form: {
      template: "systems/sarmatians-blood/templates/apps/rollDialog.hbs"
    }
  }

  constructor(options = {}) {
    super(options);
    this.actor =
      options.actor ??
      game.user.character ??
      (canvas.ready ? canvas.tokens.controlled[0]?.actor : null) ??
      null;
  }

  get title() {
    return game.i18n.localize("SARMATIANS.Roll.Title");
  }

  /**
   * Data to be passed to the Handlebars template.
   * @param {object} [options] - Options passed to the render call.
   * @returns {Promise<object>} Data for the template.
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.rollConfig = this.rollConfig;
    context.actor = this.actor;

    return context;
  }


  /* -------------------------------------------- */
  /* Event Handlers                              */
  /* -------------------------------------------- */
  /**
   * Handle form submission (if not using specific action buttons or if a submit button is used without data-action).
   * This is defined in DEFAULT_OPTIONS.form.handler.
   * @param {SubmitEvent} event - The form submission event.
   * @param {HTMLFormElement} form - The form element.
   * @private
   */
  static async #onSubmit(event, form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const formula = "2d6+" + data.modifier;
    console.log(formula)
    const rollResult = new Roll(formula);
    await rollResult.evaluate();
    rollResult.toMessage();
  }
}
