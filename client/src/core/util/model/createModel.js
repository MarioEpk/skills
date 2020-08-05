import {Record, List} from 'immutable';

/**
 * Creates model class with fromServer and fromServerList methods.
 * @param {string} name Model class name.
 * @param {Function} fromJson Transformation function from json to object prototype. Must return valid object even for empty JSON.
 *
 * @example
 *  export default createModel('Agent', (json) => ({
        idAgentContractAgent: json.IdObject_AgentContract_Agent,
        legalEntity: LegalEntity.fromServer(json.Agent),
        branch: Branch.fromServer(json.Branch),
        socialNetwork: SocialNetwork.fromServer(json.SocialNetwork),
        productList: List(json.Products),
    });
 */
export default (name, fromJson) => {
    const prototype = fromJson({});
    const Class = Record(prototype, name);
    Class.fromServer = (json = {}) => new Class(fromJson(json));
    Class.fromServerList = (json = []) => List(json.map(Class.fromServer));
    return Class;
};
