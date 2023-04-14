export default class userDTO {
    static getTokenDTO = (user) => {
        return {
            name:`${user.firstName} ${user.lastName}`,
            role:user.role,
            id:user._id,
            avatar:user.avatar
        }
    }
}
