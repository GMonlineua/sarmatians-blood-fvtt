// Import Actor Sheet
import { BlankActor } from "./documents/actor.mjs";
import { BlankActorSheet } from "./sheets/actor-sheet.mjs";
import { BlankItem } from "./documents/item.mjs";
import { BlankItemSheet } from "./sheets/item-sheet.mjs";

// Helpers
import { preprocessChatMessage, renderChatMessage } from "./applications/chat-portraits.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars-helpers.mjs";

Hooks.once('init', async function() {

  game.blank = {
    BlankActor,
    BlankItem
  };

  // Define custom Entity classes and Data Models
  CONFIG.Actor.documentClass = BlankActor;
  CONFIG.Item.documentClass = BlankItem;


  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("blank", BlankActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("blank", BlankItemSheet, { makeDefault: true });

  registerHandlebarsHelpers();
});

// Preprocess chat message before it is created hook
Hooks.on("preCreateChatMessage", preprocessChatMessage);

// Render chat message hook
Hooks.on("renderChatMessage", renderChatMessage);
