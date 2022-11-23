import removeAccents from "remove-accents";

const administrationQuickFilter = (row, filter) => {
    if (filter.quickSearch) {
        const searchValue = removeAccents(filter.quickSearch.toLowerCase());
        const name = removeAccents(row.getIn(["name"]).toLowerCase());
        return name.includes(searchValue);
    }
    return true;
};

export const administrationFilterFunctions = [administrationQuickFilter];
