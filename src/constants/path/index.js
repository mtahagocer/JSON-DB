import path from 'path';

let _paths = {
    db: './DB'
};


const paths = Object.keys( _paths ).map( ( key ) => {
    return {
        [ key ]: path.join( __dirname, _paths[ key ] )
    };
} );

export default paths;
