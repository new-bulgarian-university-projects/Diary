import models from '../models';

const getAllTags  = async () => {
    const tags = await models.Tag.find();
    return tags;
}

export default {
    getAllTags
}