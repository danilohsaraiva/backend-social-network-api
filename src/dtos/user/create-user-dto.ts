export interface CreateUserDto {

    userName: string,
    userNickName: string,
    password: string,
    imageUrl?: string
    isActive: boolean

}