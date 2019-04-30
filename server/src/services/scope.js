import models from '../models';

const getAllScopes = async () => {
    const scopes = await models.Scope.find();
    return scopes;
}

export default {
    getAllScopes
}