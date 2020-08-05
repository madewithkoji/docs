import Database from '@withkoji/database';

export default function (app) {

    //Get total votes by fetching all database entries and summing them up
    app.get('/votes', async (req, res) => {
        const database = new Database();
        const rawResults = await database.get('votes');

        let sum = 0;

        for (let i = 0; i < rawResults.length; i++) {
            sum += rawResults[i].amount;
        }

        res.status(200).json({
            success: true,
            votes: sum
        });
    });

    //Submit votes
    //Handling each user (userId) as a separate entry in order to decentralize vote submission
    //This helps prevent errors when syncing votes in the app
    //body: {userId: string, votes: number}
    app.put('/votes/add', async (req, res) => {
        const database = new Database();
        const promises = [];

        const userId = req.body.userId;
        const votes = req.body.votes;

        const rawResults = await database.get('votes');

        const results = rawResults.filter((e) => e.userId === userId);

        //If there's no existing entry/user, create a new one
        const entry = results.length > 0 ? results[0] : { userId: userId, amount: 0 };
        entry.amount += votes;

        promises.push(async () => {
            await database.set('votes', userId, entry);
        });

        await Promise.all(promises.map(async p => p()));

        res.status(200).json({
            success: true
        });
    });
}
