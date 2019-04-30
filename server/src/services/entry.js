import models from '../models';

const getAllEntries = async () => {
    const entries = await models.Entry.find()
                    .select(["-text","-isDeleted","-updatedAt"])
                    .populate('tags', ['text'])
                    .populate('user', ['username']);

    return entries;
};

const getEntryById = async (id) => {
    if(!id) {
        return null;
    }

    const entry = await models.Entry.findById(id)
                    .select('-isDeleted')
                    .populate('tags', ['text'])
                    .populate('user', ['username']);

    return entry;
}


export default {
    getAllEntries,
    getEntryById
}