import {Row} from "app/model/test";
import {fetch} from "core/util";

const getTestData = () => fetch.timeoutPromise(Row.fromServerList([{
    id: 1,
    name: "Prvni",
}, {
    id: 2,
    name: "Druhy",
}]), 1000);

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
