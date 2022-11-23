import fetch from "core/fetch";

const USER_URL = "/user";

const fetchUsers = () => fetch.doGet(USER_URL);
const fetchCertificatesForAllUsers = () => fetch.doGet(`${USER_URL}/certificate`);
const fetchEducationsForAllUsers = () => fetch.doGet(`${USER_URL}/education`);

export default {
    fetchUsers,
    fetchCertificatesForAllUsers,
    fetchEducationsForAllUsers,
};
