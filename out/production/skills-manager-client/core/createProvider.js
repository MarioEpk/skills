import React from "react";
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider, batch} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {combineReducers} from 'redux-immutable';
import {ErrorScreen} from 'components/components/error';
import RedBox from "redbox-react";

import i18n from "core/i18n";

// TODO fix what with this (error catching) mess?
export default (reducers, saga) => {
    class AppProvider extends React.Component {
        constructor(props) {
            super(props);
            this.showError = this.showError.bind(this);
            const sagaContext = {};

            /**
             * latency -> redux-dev-tools dropped some actions ( https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#latency )
             */
            /* eslint-disable no-underscore-dangle */
            const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({latency: 10}) : compose;
            const sagaMiddleware = createSagaMiddleware({context: sagaContext});
            const middleware = composeEnhancers(applyMiddleware(reduxBatchMiddleware, sagaMiddleware, reduxBatchMiddleware));
            /* eslint-enable */

            const catchingCombineReducers = (reducersToWrap) => {
                const reducer = combineReducers(reducersToWrap);

                return (state, action) => {
                    try {
                        return reducer(state, action);
                    } catch (e) {
                        this.showError(e);
                        return state;
                    }
                };
            };

            this.store = createStore(catchingCombineReducers(reducers), middleware);
            let myReducers = reducers;
            const isReducerLoaded = (name) => Object.keys(myReducers).includes(name);

            sagaContext.addReducer = (name, reducer) => {
                if (!isReducerLoaded(name)) {
                    myReducers = {...myReducers, [name]: reducer};
                    this.store.replaceReducer(catchingCombineReducers(myReducers));
                }
            };

            this.state = {error: null};
            if (saga) {
                const sagaTask = sagaMiddleware.run(saga);
                sagaTask.toPromise().catch((e) => {
                    sagaTask.cancel();
                    this.showError(e);
                });
            }
        }

        componentDidCatch(error) {
            this.showError(error);
        }

        showError(error) {
            console.error(error);
            const stateError = i18n.translateDirectly("error.appNotAvailable");
            // Do not use for normal app. This hack is here only as a helper to simplify patterns for error state of app,
            // since we do not care much about how app continues after error.
            if (this.updater.isMounted(this)) {
                this.setState({error: stateError});
            } else {
                // eslint-disable-next-line
                this.state = {...this.state, error: stateError};
            }
        }

        render() {
            const {error} = this.state;
            if (error) {
                if (typeof error === "string") {
                    return <ErrorScreen error={error} />;
                } else {
                    return <RedBox error={error} />;
                }
            }
            return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Provider {...this.props} store={this.store} />
            );
        }
    }

    return AppProvider;
};

const reduxBatchMiddleware = () => (next) => (action) => {
    if (Array.isArray(action)) {
        batch(() => action.forEach(next));
    } else {
        next(action);
    }
};
