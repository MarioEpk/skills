export default (link) => {
    const newWindow = window.open(link, "_blank");
    newWindow.opener = null; // https://www.owasp.org/index.php/HTML5_Security_Cheat_Sheet#Tabnabbing
};
