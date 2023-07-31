/** @extends {Actor} */
export class MySystemActor extends Actor {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {}

  /** @override*/
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.mysystem || {};
  }
}
