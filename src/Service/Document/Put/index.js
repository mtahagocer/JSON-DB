import BaseCollection from '../../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import CustomError from '../../../Entity/CustomError';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const {
        CollectionName,
        Document,
        Replace = false
    } = req.body;

    if (!Document) throw new CustomError('Document is required');
    if (typeof Replace !== 'boolean') throw new CustomError('Replace is must be a boolean');

    const _document = await new BaseCollection({ UserId: Id, Name: CollectionName }).UpdateDocument(Document, Replace);

    res.json({
        success: true,
        message: 'Document updated successfully',
        Document: _document
    });
});
