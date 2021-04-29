export default interface ICreateStudentDTO {
  title: string;
  content: string;
  student_id: string;
  tags: 'save' | 'institucional' | 'evento';
  subject?: string;
  period?: string;
  completedAt: number;
}
