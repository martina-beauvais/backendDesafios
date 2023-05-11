export default class userDTO{
    static getTokenDTO = (user) => {
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            cart: user.cart,
            role: user.role,
            avatar: user.avatar 
        };
    };
};