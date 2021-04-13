import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const { CollectionName } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({
        CollectionName: typer.string
    }), { CollectionName });

    const _documents = await new BaseCollection({ UserId: _Id, Name: CollectionName }).GetDocument();

    res.json({
        Success: true,
        DocumentCount: _documents.length,
        Message: 'Document readed successfully',
        Documents: _documents
    });
});
