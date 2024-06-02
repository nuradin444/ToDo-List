export interface Tasks {
    id?: string;
    Description: string;
    CreatedDate: Date;
    isCompleted: boolean;
    CompletedDate: Date | null;
}