import fetch from "core/fetch";

const fetchUsers = () => fetch.doGet("/user");

export default {
    fetchUsers,
};
