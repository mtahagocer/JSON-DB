import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';
import { filterByPatch, filterByKeyAndValue } from '../../../Helpers';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const { CollectionName, Patch, DeepEquality = false, KeyList, ValueList, Strict = true } = req.body;

    if ((!Patch && ((!KeyList && ValueList) || (KeyList && !ValueList))) || (Patch && (KeyList || ValueList))) throw new CustomError(' "Patch" OR "KeyList and ValueList" is required');
    if (Strict !== undefined && typeof Strict !== 'boolean') throw new CustomError('"Strict" must be a boolean');
    if (Patch && !Object.keys(Patch).length) throw new CustomError('"Patch" must be a object');
    if ((KeyList && !Array.isArray(KeyList)) || (ValueList && !Array.isArray(ValueList))) throw new CustomError('"KeyList" and "ValueList" must be a array');
    if (KeyList && KeyList.some((item) => typeof item !== 'string')) throw new CustomError('"KeyList items" must be a string object key.');

    const filter = Patch ? filterByPatch(Patch, DeepEquality) : filterByKeyAndValue(KeyList, ValueList)(Strict);
    const _data = await new BaseCollection({ UserId: Id, Name: CollectionName }).GetDocument(filter);

    const status = _data.length > 0 ? 200 : 404;

    res.status(status).json({
        success: true,
        DocumentCount: _data.length,
        message: 'Document patch successfully',
        Documents: _data
    });
});
