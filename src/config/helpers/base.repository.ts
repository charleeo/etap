export class BaseRepository {
  constructor(public readonly repo?: any) {}

  /**
   * update an  entity depending on the provided conitions
   * @param condition
   * @param col
   * @param object
   */
  public async updateEntity(condition, col: string, object: object) {
    const entity = await this.repo
      .createQueryBuilder()
      .where(`${col} = :key`, { key: condition })
      .update({ ...object })
      .returning('*')
      .updateEntity(true)
      .execute();

    return entity.raw[0];
  }
}
