import MD5 from "crypto-js/md5";

const qqmailRex = /^[1-9][0-9]{4,10}@qq\.com$/
export const getAvatarByEmail = (email: string): string => {
    if (qqmailRex.test(email))
        return `https://cravatar.cn/avatar/${MD5('email').toString()}`
    return `https://unavatar.io/gravatar/${email}`
}