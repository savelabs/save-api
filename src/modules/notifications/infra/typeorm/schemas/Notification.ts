import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  student_id: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  completedAt: Date;

  @Column()
  tags: 'save' | 'institucional' | 'evento';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
