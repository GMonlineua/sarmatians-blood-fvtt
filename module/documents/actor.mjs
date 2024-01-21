/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class BlankActor extends Actor {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override*/
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
  }
}
