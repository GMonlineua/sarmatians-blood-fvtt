export class ToolData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      type: new fields.StringField({ initial: "special" }),
      damage: new fields.NumberField({ integer: true, min: 0 }),
      damage: new fields.NumberField({ integer: true, min: 0 }),
      protection: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, min: 0 }),
        max: new fields.NumberField({ integer: true, min: 0 }),
      }),
      description: new fields.HTMLField()
    }
  }
}
