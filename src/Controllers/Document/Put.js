import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import CustomError from '../../Entity/CustomError';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const {
        CollectionName,
        Document,
        Replace = false
    } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({
        CollectionName: typer.string,
        Document: typer.UnknownRecord

    }), { CollectionName, Document });

    if (typeof Replace !== 'boolean') throw new CustomError('Replace is must be a boolean');

    const _document = await new BaseCollection({ UserId: _Id, Name: CollectionName }).UpdateDocument(Document, Replace);

    res.json({
        Success: true,
        Message: 'Document updated successfully',
        Document: _document
    });
});
