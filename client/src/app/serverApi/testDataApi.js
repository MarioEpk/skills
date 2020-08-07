import {fetch} from "core/util";

const getTestData = () => fetch.doGet("/skills");

const getFormFieldErrorResponse = (fieldKey) => (
    new Promise((_, reject) => {
        setTimeout(() => {
            const error = new fetch.RequestError({
                status: 412,
                response: {
                    body: {
                        errors: ["Testovací error ve formuláři"],
                        fieldErrors: [
                            {
                                field: fieldKey,
                                message: `Testovací chyba pro field: ${fieldKey}`,
                            },
                        ],
                    },
                },
            });
            reject(error);
        }, 1000);
    })
);

export default {
    getTestData,
    getFormFieldErrorResponse,
};
