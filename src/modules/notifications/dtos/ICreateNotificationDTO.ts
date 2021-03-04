export default interface ICreateStudentDTO {
  title: string;
  content: string;
  student_id: string;
  tags: 'save' | 'institucional' | 'evento';
  completedAt: number;
}
