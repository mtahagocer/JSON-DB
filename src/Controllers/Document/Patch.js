import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import { handleFilterAlgorithm } from '../../Business/Document';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const {
        SearchType,
        CollectionName,
        Patch,
        KeyList,
        ValueList,
        Strict = true
    } = req.body;

    let _data;

    _data = await new BaseCollection({ UserId: _Id, Name: CollectionName }).GetDocument(handleFilterAlgorithm({
        SearchType,
        Patch,
        Strict,
        KeyList,
        ValueList
    })
    );

    const status = _data.length > 0 ? 200 : 404;

    res.status(status).json({
        Success: true,
        DocumentCount: _data.length,
        Message: 'Document patch Successfully',
        Documents: _data
    });
});
