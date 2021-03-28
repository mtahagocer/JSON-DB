import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';
import { filterByPatch, filterByKeyAndValue } from '../../../Helpers';

const searchTypes = ['Patch', 'DeepPatch', 'KeyValue'];

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const {
        SearchType,
        CollectionName,
        Patch,
        KeyList,
        ValueList,
        Strict = true
    } = req.body;

    let searchType = searchTypes.indexOf(SearchType);
    let _filter, _data;

    // #region conditions

    switch (searchType) {

        case 0: {
            if ((!Patch || !Object.keys(Patch).length || typeof Patch !== 'object' || Array.isArray(Patch))) throw new CustomError(`Patch must be a object and required for ${searchTypes[0]}`);

            _filter = filterByPatch(Patch, false);
            break;
        }

        case 1: {
            if ((!Patch || !Object.keys(Patch).length || typeof Patch !== 'object' || Array.isArray(Patch))) throw new CustomError(`Patch must be a object and required for ${searchTypes[1]}`);

            _filter = filterByPatch(Patch, true);
            break;
        }

        case 2: {
            if (!KeyList && !ValueList) throw new CustomError(`KeyList and ValueList required for ${searchTypes[2]}`);
            if ((!Array.isArray(KeyList)) || (!Array.isArray(ValueList))) throw new CustomError('"KeyList" and "ValueList" must be a array');
            if (KeyList.some((item) => typeof item !== 'string')) throw new CustomError('"KeyList items" must be a string object key.');
            if (Strict !== undefined && typeof Strict !== 'boolean') throw new CustomError('"Strict" must be a boolean');

            _filter = filterByKeyAndValue(KeyList, ValueList)(Strict);
            break;
        }

        default: throw new CustomError(`Avaliable search types ${searchTypes.join(' ')}`);
    }

    // #endregion

    _data = await new BaseCollection({ UserId: Id, Name: CollectionName }).GetDocument(_filter);

    const status = _data.length > 0 ? 200 : 404;

    res.status(status).json({
        success: true,
        DocumentCount: _data.length,
        message: 'Document patch successfully',
        Documents: _data
    });
});
