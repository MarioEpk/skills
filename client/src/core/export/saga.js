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
            // download(encodedPdf);
            // decode a base-64 encoded string.
            const binaryString = window.atob(encodedPdf);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);

            for (let i = 0; i < binaryLen; i += 1) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            download(bytes, "textUInt8Array.pdf");

            // const blob = new Blob([bytes], {type: "application/pdf"});
            // const link = URL.createObjectURL(blob);
            // window.open(link, '_blank');
        });
    } catch (e) {
        console.error(e);
    }
}
