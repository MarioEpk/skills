import {takeLatest} from "redux-saga/effects";
import download from "downloadjs";

import {cvApi} from "app/serverApi";

import {EXPORT_CV, EXPORT_CV_TO_DOC} from "./actions";

export default function* () {
    yield takeLatest(EXPORT_CV, exportCv);
    yield takeLatest(EXPORT_CV_TO_DOC, exportCvToDoc);
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

function* exportCvToDoc({payload}) {
    try {
        const response = yield cvApi.exportCvToDoc(payload.id);
        response.then((encodedDoc) => {
            download(`data:application/octet-stream;base64,${encodedDoc}`, `${payload.lastName}_cv.docx`);
        });
    } catch (e) {
        console.error(e);
    }
}
