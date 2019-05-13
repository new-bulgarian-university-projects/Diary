import models from '../models';

const getAllScopes = async () => {
    const scopes = await models.Scope.where('scope')
                                     .ne('private');
    return scopes;
}

export default {
    getAllScopes
}