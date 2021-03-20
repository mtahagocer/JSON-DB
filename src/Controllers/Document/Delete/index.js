import BaseDocument from '../../../Entity/Document/BaseDocument';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';
import { filterByKeyAndValue } from '../../../Helpers';

export default asyncHandler(async (req, res) => {
    const { user: { id } } = req;
    const { CollectionName, KeyList, ValueList } = req.body;

    if (!Array.isArray(KeyList) || !Array.isArray(ValueList)) throw new CustomError('"KeyList" and "ValueList" must be a array');
    if (KeyList.some((item) => typeof item !== 'string')) throw new CustomError('"KeyList items" must be a string object key.');

    const _document = new BaseDocument(CollectionName);

    const filter = filterByKeyAndValue(KeyList, ValueList);
    const _data = await _document.Delete(id, filter);
    const status = _data.length > 0 ? 200 : 404;

    res.status(status).json({
        success: true,
        DocumentCount: _data.length,
        message: _data.length ? 'Documents deleted successfully' : 'Can not find any documents with this conditions',
        Document: _data
    });
});
