import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const { CollectionName, Document } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({
        CollectionName: typer.string,
        Document: typer.UnknownRecord

    }), { CollectionName, Document });

    const _collection = new BaseCollection({ UserId: _Id, Name: CollectionName });
    const _saved = await _collection.SaveDocument(Document);

    await _collection.Update(await _collection.Get().then((response) => {
        response.DocumentCount += 1;
        return response;
    }));


    res.json({
        Success: true,
        Message: 'Document saved successfully',
        Document: _saved
    });
});
