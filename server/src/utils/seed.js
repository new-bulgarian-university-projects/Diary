import bcrypt from 'bcrypt';
import models from '../models';
const createUsersWithEntries = async () => {
    const password = 'asd123';
    bcrypt.hash(password, 10)
        .then(async (hash) => {

            // seed users
            const user1 = new models.User({
                username: 'johndoe',
                email: 'johndoe@gmail.com',
                password: hash
              });
      
            const user2 = new models.User({
                username: 'david',
                email: 'david@gmail.com',
                password: hash
              });

            const users = [user1, user2];
            

              // seed scopes [private, public, onlyLoggedIn]
            const privateScope = new models.Scope({
                scope: 'private',
                friendlyText: 'Only me'
            });
            const publicScope = new models.Scope({
                scope: 'public',
                friendlyText: 'Everyone'
            });
            const onlyLoggedScope = new models.Scope({
                scope: 'onlyLoggedIn',
                friendlyText: 'Only logged in users'
            });

            const scopes = [privateScope, publicScope, onlyLoggedScope];
            
            const tags = ['art', 'rant', 'politics', 'religion'].map(t => new models.Tag({
                                                            text: t}));
            

            // seed entries
            const entry1 = new models.Entry({
                title: 'Wake up early',
                text: 'I think this has been the most exciting day of 2015 so far as today I woke at 6:15am',
                isDeleted: false,
                user: user1.id,
                scope: publicScope.id,
                tags: [tags[0].id, tags[1].id]
            });

            const entry2 = new models.Entry({
                title: 'Start Learning French',
                text: 'Today has been amazing! I start the day with having a French Listening lesson and a Science B2 revision class and 1/2 a maths lesson',
                createdAt: '',
                isDeleted: false,
                user: user1.id,
                scope: privateScope.id,
                tags: [tags[2].id]
            });

            const entry3 = new models.Entry({
                title: 'Always it could get worse',
                text: 'Today I thought I would write about a bit of a problem I have have been struggling with for a few weeks that has actually got progressively worst this week',
                createdAt: '',
                isDeleted: false,
                user: user2.id,
                scope: onlyLoggedScope.id,
                tags: [tags[1].id, tags[3].id]
            });

            const entries = [entry1, entry2, entry3];


            for(const user of users){
                await user.save();
            }
            
            for(const tag of tags){
                await tag.save();
            }

            for(const scope of scopes){
                await scope.save();
            }

            for(const entry of entries){
                await entry.save();
            }
        
            console.log("seeded.")
        })
};

export default {createUsersWithEntries}