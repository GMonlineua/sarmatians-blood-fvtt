export default class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      greatness: new fields.SchemaField({
        value: new fields.NumberField({ requiredPositiveInteger, initial: 10 }),
        max: new fields.NumberField({ requiredPositiveInteger, initial: 10 }),
      }),
      exp: new fields.NumberField({ requiredPositiveInteger, initial: 0 }),
      coins: new fields.NumberField({ requiredPositiveInteger, initial: 0 }),
      inventory: new fields.SchemaField({
        used: new fields.NumberField({ requiredPositiveInteger, initial: 3 }),
        max: new fields.NumberField({ requiredPositiveInteger, initial: 3 }),
      }),
      description: new fields.HTMLField(),
      notes: new fields.HTMLField(),
    };
  }
}
