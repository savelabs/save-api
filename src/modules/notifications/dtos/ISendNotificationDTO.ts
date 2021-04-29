export default interface ISendNotificationDTO {
  student_id: string;
  title: string;
  body: string;
  needsAdmin?: boolean;
  turma?: string | null;
  campus?: string | null;
  matricula?: string | null;
  subject?: string;
  period?: string;
  tags?: 'save' | 'institucional' | 'evento';
}
