export interface AuthReponseDto {
    userId: string;
    userName: string;
    userNickName: string;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}