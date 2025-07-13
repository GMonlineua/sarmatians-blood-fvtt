import * as models from './data/_module.mjs';
import { SarmatiansActor } from "./documents/actor.mjs";
import { SarmatiansItem } from "./documents/item.mjs";
import { SarmatiansActorSheet } from "./sheets/actor-sheet.mjs";
import { SarmatiansItemSheet } from "./sheets/item-sheet.mjs";

// Import modules
import { preprocessChatMessage, renderChatMessage } from "./applications/chat-portraits.mjs";
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars-helpers.mjs";
import { SARMATIANS } from './helpers/config.mjs';

Hooks.once('init', async function() {

  game.sarmatian = {
    SarmatiansActor,
    SarmatiansItem
  };

  CONFIG.SARMATIANS = SARMATIANS;

  // Define custom Entity classes and Data Models
  CONFIG.Actor.documentClass = SarmatiansActor;
  CONFIG.Actor.dataModels = {
    'character': models.CharacterData,
    'monster': models.MonsterData
  };

  CONFIG.Item.documentClass = SarmatiansItem;
  CONFIG.Item.dataModels = {
    'tool': models.ToolData
  };


  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("bitd", SarmatiansActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("bitd", SarmatiansItemSheet, { makeDefault: true });

  registerHandlebarsHelpers();

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

// Preprocess chat message before it is created hook
Hooks.on("preCreateChatMessage", preprocessChatMessage);

// Render chat message hook
Hooks.on("renderChatMessage", renderChatMessage);

