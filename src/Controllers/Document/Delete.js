import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const { CollectionName, Patch } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({ CollectionName: typer.string, }), { CollectionName });

    const _collection = new BaseCollection({ UserId: _Id, Name: CollectionName });
    const _deletedCount = await _collection.DeleteDocument(Patch);
    const status = _deletedCount > 0 ? 200 : 404;

    await _collection.Update(await _collection.Get().then((response) => {
        response.DocumentCount -= _deletedCount;
        return response;
    }));

    res.status(status).json({
        Success: true,
        DocumentCount: _deletedCount,
        Message: _deletedCount ? 'Documents deleted successfully' : 'Can not find any documents with this conditions'
    });
});
