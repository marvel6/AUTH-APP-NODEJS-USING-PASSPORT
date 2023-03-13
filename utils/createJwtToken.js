const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token;
}


const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)



const attachCookiesToResponse = ({ res, user, refreshToken }) => {

    const accessTokens = createJWT({ payload: { user } })
    const refreshTokens = createJWT({ payload: { user, refreshToken } })

    const accessTime = 1000 * 60 * 60 * 24
    const refreshTime = 1000 * 60 * 60 * 24 * 30



    res.cookie('accessToken', accessTokens, {
        httpOnly: true,
        expires: new Date(Date.now() + accessTime),
        signed: true,
        secure: process.env.NODE_ENV === 'production'

    })


    res.cookie('refreshToken', refreshTokens, {
        httpOnly: true,
        expires: new Date(Date.now() + refreshTime),
        signed: true,
        secure: process.env.NODE_ENV === 'production'
    })

}

module.exports = {
    verifyToken,
    attachCookiesToResponse
}