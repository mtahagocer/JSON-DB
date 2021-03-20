import BaseDocument from '../../../Entity/Document/BaseDocument';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';
import { filterByPatch } from '../../../Helpers';

export default asyncHandler(async (req, res) => {
    const { user: { id } } = req;
    const { Patch, CollectionName, DeepEquality = false } = req.body;

    if (!Patch) throw new CustomError('"Patch" is required');
    if (!Object.keys(Patch).length) throw new CustomError('"Patch" must be a object');

    const _document = new BaseDocument({ CollectionName, Patch });

    const filter = filterByPatch(Patch, DeepEquality);
    const _data = await _document.Get(id, filter);
    const status = _data.length > 0 ? 200 : 404;

    res.status(status).json({
        success: true,
        DocumentCount: _data.length,
        message: 'Document patch successfully',
        Document: _data
    });
});
