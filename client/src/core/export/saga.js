import {takeLatest} from "redux-saga/effects";
import {cvApi} from "app/serverApi";
import download from "downloadjs";
import {EXPORT_CV} from "./actions";

export default function* () {
    yield takeLatest(EXPORT_CV, exportCv);
}

function* exportCv({payload}) {
    try {
        const response = yield cvApi.exportCv(payload.id);
        response.then((encodedPdf) => {
            download(`data:application/octet-stream;base64,${encodedPdf}`, "CV.pdf");
        });
    } catch (e) {
        console.error(e);
    }
}
