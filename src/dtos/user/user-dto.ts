export interface CreateUserDto {
    userName: string,
    userNickName: string,
    password: string,
    imageUrl?: string | null
    isActive?: boolean
}

export interface ResponseUserDto {
    userName: string,
    userNickName: string,
    imageUrl?: string | null
    isActive: boolean
    createdAt: Date;
    updatedAt: Date;
}