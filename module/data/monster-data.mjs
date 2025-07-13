export default class MonsterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredPositiveInteger = { ...requiredInteger, min: 0 };

    return {
      greatness: new fields.SchemaField({
        value: new fields.NumberField({ requiredPositiveInteger, initial: 10 }),
        max: new fields.NumberField({ requiredPositiveInteger, initial: 10 }),
      }),
      damage: new fields.NumberField({ requiredPositiveInteger, initial: 1 }),
      description: new fields.HTMLField(),
      notes: new fields.HTMLField(),
    };
  }
}
