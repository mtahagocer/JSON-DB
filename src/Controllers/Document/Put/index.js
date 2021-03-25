import BaseCollection from '../../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const {
        CollectionName, Document
    } = req.body;

    const _document = await new BaseCollection({ UserId: Id, Name: CollectionName }).UpdateDocument(Document);

    res.json({
        success: true,
        message: 'Document updated successfully',
        Documents: _document
    });
});
