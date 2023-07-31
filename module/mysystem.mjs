// Import document classes.
import { MySystemActor } from "./documents/actor.mjs";
// Import sheet classes.
import { MySystemActorSheet } from "./sheets/actor-sheet.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { preprocessChatMessage, renderChatMessage } from "./helpers/chat-portraits.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {

  game.mysystem = {
    MySystemActor
  };

  // Define custom Document classes and other configurations
  CONFIG.Actor.documentClass = MySystemActor;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mysystem", MySystemActorSheet, { makeDefault: true });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Chat Message                   */
/* -------------------------------------------- */

// Preprocess chat message before it is created hook
Hooks.on("preCreateChatMessage", preprocessChatMessage);

// Render chat message hook
Hooks.on("renderChatMessage", renderChatMessage);

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper('concat', function() {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});
