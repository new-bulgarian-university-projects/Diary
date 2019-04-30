import models from '../models';

const getAllEntries = async (query) => {
    console.log("incoming query ", query);

    // query tags
    let tagSearchQuery = null;
    if(query.tag){
        const tagParams = await models.Tag.find()
                .or({text: query.tag})
                .select('_id')
                .then((res)=> {
                    return res.map(r => r._id.toString())
                });

        tagSearchQuery  = {tags: {"$in": tagParams}};   
    }
    
    //query  scope
    let scopeSearchQuery = null;
    if(query.scope){
        const scopeParam = await models.Scope
                .findOne({scope: query.scope})
                .select('_id');

        scopeSearchQuery  = {scope: scopeParam};   
    }
    // merge the queries from scope and tag searches
    const mergedSearch = Object.assign({}, scopeSearchQuery, tagSearchQuery);

    const entries = await models.Entry.find(mergedSearch)
                    .select(["-text","-isDeleted","-updatedAt"])
                    .populate('tags', ['text'])
                    .populate('scope')
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
                    .populate('scope')
                    .populate('user', ['username']);

    return entry;
}

const saveEntry = async (data) => {
    try {
        const createdEntry = await models.Entry.create(data);
        return createdEntry;
    } catch (e) {
        throw e;
    }
}

export default {
    getAllEntries,
    getEntryById, 
    saveEntry
}