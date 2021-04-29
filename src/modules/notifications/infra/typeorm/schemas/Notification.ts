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
  title: string;

  @Column()
  content: string;

  @Column()
  student_id: string;

  @Column()
  completedAt: number;

  @Column({ nullable: true })
  subject?: string;

  @Column({ nullable: true })
  period?: string;

  @Column()
  tags: 'save' | 'institucional' | 'evento';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
