import BaseDocument from '../../../Entity/Document/BaseDocument';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const { CollectionName } = req.body;
    
    const _document = new BaseDocument(CollectionName);
    const _data = await _document.Get(Id);

    res.json({
        success: true,
        DocumentCount: _data.length,
        message: 'Document readed successfully',
        Documents: _data
    });
});
