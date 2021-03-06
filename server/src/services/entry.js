import models from '../models';

const getAllEntries = async (query, user) => {
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
    
    //TODO: It's good idea to move filtering on the client


    //query  scope
    let scopeSearchQuery = null;
    let scopeParam;

    if(query.scope){
        if(query.scope !== 'private') {
            // get only selected
            scopeParam = await models.Scope
            .findOne({scope: query.scope})
            .select('_id');
        }
    }else {
        // when no parameters are send, return all scopes id except private, for the next query
        scopeParam = await models.Scope
                .where('scope')
                .ne('private')
                .select('_id');   
    }
    scopeSearchQuery  = {scope: scopeParam};   
    // merge the queries from scope and tag searches
    const mergedSearch = Object.assign({}, scopeSearchQuery, tagSearchQuery);


    const entries = await models.Entry.find(mergedSearch)
                    .and({isDeleted: false})
                    .select(["-text","-isDeleted","-updatedAt"])
                    .populate('tags', ['text'])
                    .populate('scope')
                    .populate('user', ['username']);

    return entries;
};

const getEntryForUser = async (username) => {
    if (!username) {
        return null;
    }

    // could not find a solution to do this in a single query :/
    const id = await models.User.findOne({username})
                            .select(['_id']);

    const entries = await models.Entry.find({user: id, isDeleted: false})
                            .select(['-isDeleted', '-updatedAt'])
                            .populate('user',['username']);

    return entries;
}

const getEntryById = async (id) => {
    if(!id) {
        return null;
    }

    const entry = await models.Entry.findById(id)
                    .and({isDeleted: false})
                    .select('-isDeleted')
                    .populate('tags', ['text'])
                    .populate('scope')
                    .populate('user', ['username']);

    return entry;
}

const saveEntry = async (data) => {
    if(!data){
        return null;
    }

    try {
        const createdEntry = await models.Entry.create(data);
        return createdEntry;
    } catch (e) {
        throw e;
    }
}

const removeEntry = async (userId, entryId) => {
    if(!userId || !entryId)
        return null;
    console.log(userId, entryId);
    return models.Entry.findOneAndUpdate({_id: entryId, user: userId}, {$set: {isDeleted: true}})
                        .select(['_id', 'title', 'isDeleted']);
}

export default {
    getAllEntries,
    getEntryById, 
    getEntryForUser,
    saveEntry,
    removeEntry
}