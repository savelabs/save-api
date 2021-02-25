import ICreateGradeDTO from '../dtos/CreateGradeDTO';
import Grade from '../infra/typeorm/schemas/Grade';

export default interface IGradeRepository {
  create(data: ICreateGradeDTO): Promise<Grade>;
  update(data: ICreateGradeDTO): Promise<Grade>;
  checkExists(matricula: string): Promise<Grade | undefined>;
}
