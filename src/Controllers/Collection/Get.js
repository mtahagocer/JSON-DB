import BaseCollection from '../../Entity/Collection/BaseCollection';
import asyncHandler from 'express-async-handler';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const { Name } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({
        Name: typer.string
    }), { Name });

    const _collection = new BaseCollection({ Name: Name, UserId: _Id });

    const _data = await _collection.Get();

    res.json({
        Success: true,
        Message: `Collection ${Name} readed successfully`,
        Collection: _data
    });
});
