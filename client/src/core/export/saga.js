import {takeLatest} from "redux-saga/effects";
import download from "downloadjs";

import {cvApi} from "app/serverApi";

import {EXPORT_CV} from "./actions";

export default function* () {
    yield takeLatest(EXPORT_CV, exportCv);
}

function* exportCv({payload}) {
    try {
        const response = yield cvApi.exportCv(payload.id);
        response.then((encodedPdf) => {
            download(`data:application/octet-stream;base64,${encodedPdf}`, `${payload.lastName}_cv.pdf`);
        });
    } catch (e) {
        console.error(e);
    }
}
