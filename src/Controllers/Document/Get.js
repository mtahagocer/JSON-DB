import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const { CollectionName } = req.body;

    const _documents = await new BaseCollection({ UserId: Id, Name: CollectionName }).GetDocument();

    res.json({
        Success: true,
        DocumentCount: _documents.length,
        Message: 'Document readed Successfully',
        Documents: _documents
    });
});
