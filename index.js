const omitObjectKeys = (originalObject = {}, keysToOmit = []) => {    
    const clonedObject = { ...originalObject };      
    
    for (const path of keysToOmit) {
        delete clonedObject[path];
    }     
  
    return clonedObject;
}

const OMIT_READ_ROOT = 'readRoot';

const OmitReadRootPlugin = (builder) => {
    let rootFieldNamesToOmit = []
    builder.hook('build', (input) => {
        rootFieldNamesToOmit = []
        return input;
    });
    builder.hook("GraphQLObjectType:fields", (fields, _, { scope }) => {
        if (scope.isRootQuery) {
            return omitObjectKeys(fields, Array.from(rootFieldNamesToOmit))
        }
        return fields;
    });
    builder.hook("GraphQLObjectType:fields:field", (input, { pgOmit }, { scope }) => {
        const introspection = scope.pgFieldIntrospection
        const isConstraintRootRead= scope.isRootQuery
            && introspection
            && introspection.kind === 'constraint'
        if (isConstraintRootRead && pgOmit(introspection, OMIT_READ_ROOT)) {
            rootFieldNamesToOmit.push(scope.fieldName)
        }
        return input;
    });
};

module.exports.OmitReadRootPlugin = OmitReadRootPlugin;
