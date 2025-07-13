import SarmatiansRollerApp from "../applications/roll.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class SarmatiansActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sarmatians-blood", "sheet", "actor"],
      width: 500,
      height: 800,
      tabs: [{
        navSelector: ".sheet-tabs",
        contentSelector: ".sheet-body"
      }]
    });
  }

  /** @override */
  get template() {
    const sheetTemplate = `systems/sarmatians-blood/templates/actor/${this.actor.type}-sheet.hbs`;

    return sheetTemplate
  }

  /** @override */
  async getData() {
    const context = await super.getData();

    // Encrich editor content
    context.enrichedDescription = await TextEditor.enrichHTML(this.object.system.description, {
      async: true,
      secrets: this.actor.isOwner
    });
    context.enrichedNotes = await TextEditor.enrichHTML(this.object.system.notes, {
      async: true,
      secrets: this.actor.isOwner
    });

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = context.actor.system;
    context.flags = context.actor.flags;
    this._prepareItems(context);

    return context;
  }

  _prepareItems(context) {
    // Initialize containers.
    const item = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || DEFAULT_TOKEN;
      // Append to item.
      if (i.type === 'tool') {
        item.push(i);
      }
    }

    // Assign and return
    context.item = item;
  }

  /** @override */
  _getHeaderButtons() {
    // Get the default buttons from the parent class
    const buttons = super._getHeaderButtons();

    if (!this.actor.testUserPermission(game.user, "OWNER")) return buttons;

    // Add a custom button for roll
    buttons.unshift({
      label: game.i18n.localize("SARMATIANS.Roll.Title"),
      class: "sarmatians-dice-sheet",
      icon: "fas fa-dice",
      onclick: () => new SarmatiansRollerApp().render(true),
    });

    return buttons;
  }


  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Show item summary
    html.find('.item-name').click(ev => {
      const button = ev.currentTarget;
      const li = button.closest(".item");
      const summary = li.getElementsByClassName("item-summary")[0];
      if (summary) {
        const contentHeight = summary.scrollHeight;
        summary.style.height = summary.classList.contains("active") ? "0" : `${contentHeight}px`;
        summary.classList.toggle("active");
      }
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Show items in chat
    html.find('.item-show').click(ev => {
      const button = ev.currentTarget;
      const itemId = button.closest('.item').dataset.itemId;
      const item = this.actor.items.get(itemId);
      if (item) return item.show();
    });

    // Update Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Item
    html.find('.item-delete').click(ev => {
      const button = ev.currentTarget;
      const li = button.closest(".item");
      const item = this.actor.items.get(li?.dataset.itemId);
      return item.delete();
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} the originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = foundry.utils.duplicate(header.dataset);
    const name = game.i18n.localize("BLANK.Item.New");
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    const cls = getDocumentClass("Item");
    return cls.create(itemData, { parent: this.actor });
  }
}
