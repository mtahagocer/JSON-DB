import BaseCollection from '../../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import { handleFilterAlgorithm } from '../../../Business/Document';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const
        {
            CollectionName,
            Patch,
            SearchType,
            KeyList,
            ValueList,
            Strict = true
        } = req.body;


    const _collection = new BaseCollection({ UserId: Id, Name: CollectionName });
    const _deletedCount = await _collection.DeleteDocument(handleFilterAlgorithm(
        SearchType,
        Patch,
        Strict,
        KeyList,
        ValueList
    ));
    const status = _deletedCount > 0 ? 200 : 404;

    await _collection.Update(await _collection.Get().then((response) => {
        response.DocumentCount -= _deletedCount.length;
        return response;
    }));

    res.status(status).json({
        success: true,
        DocumentCount: _deletedCount,
        message: _deletedCount ? 'Documents deleted successfully' : 'Can not find any documents with this conditions'
    });
});
