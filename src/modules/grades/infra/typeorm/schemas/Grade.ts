import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

import GradesSchemaDTO from '../../../dtos/GradesSchemaDTO';

@Entity('grades')
class Grade {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  matricula: string;

  @Column()
  periodo: string;

  @Column()
  boletins: Array<GradesSchemaDTO>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Grade;
