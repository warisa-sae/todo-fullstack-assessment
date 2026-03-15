export interface Todo {
    id :number;
    title :string;
    isCompleted :boolean;
}
export interface ApiResponse<T> {
    success :boolean;
    message :string;
    data :T; 
}