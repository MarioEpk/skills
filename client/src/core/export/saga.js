import {takeLatest} from "redux-saga/effects";
import {cvApi} from "app/serverApi";
import download from "downloadjs";
import {EXPORT_CV} from "./actions";

export default function* () {
    yield takeLatest(EXPORT_CV, exportCv);
}

function* exportCv({payload}) {
    try {
        const response = yield cvApi.exportCv(payload);
        response.then((encodedPdf) => {
            const binaryString = window.atob(encodedPdf);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);

            for (let i = 0; i < binaryLen; i += 1) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            download(bytes, "CV.pdf");
        });
    } catch (e) {
        console.error(e);
    }
}
