import models from '../models';

const getAllScopes = async () => {
    const scopes = await models.Scope.where('scope');
    return scopes;
}

export default {
    getAllScopes
}