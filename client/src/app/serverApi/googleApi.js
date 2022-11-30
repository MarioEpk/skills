import fetch from "core/fetch";

const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
const GOOGLE_VERIFY_TOKEN_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo";

const fetchGoogleUserInfo = (accessToken) => fetch.doGetExternal(GOOGLE_USER_INFO_URL, {}, `Bearer ${accessToken}`);
const verifyAccessToken = (accessToken) => fetch.doGetExternal(GOOGLE_VERIFY_TOKEN_URL, {accessToken: `${accessToken}`}, {});

export default {
    fetchGoogleUserInfo,
    verifyAccessToken,
};
