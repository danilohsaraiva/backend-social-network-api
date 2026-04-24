export interface ResponseUserDto {
    userName: string,
    userNickName: string,
    imageUrl?: string | null
    isActive: boolean
    createdAt: Date;
    updatedAt: Date;
}