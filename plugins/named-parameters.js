const babelTypes = require('@babel/types')

const NamedParametersVisitor = {
    FunctionDeclaration(path) {
        const patternProperties = [];
        path.node.params.forEach((paramNode) => {
           if (babelTypes.isIdentifier(paramNode)) {
                patternProperties.push(
                    babelTypes.objectProperty(paramNode, paramNode, false, true)
                );
           }
           if (babelTypes.isAssignmentPattern(paramNode)) {
                patternProperties.push(
                    babelTypes.objectProperty(paramNode.left, paramNode, false, true)
                );
           }
        });
        path.node.params = [babelTypes.objectPattern(patternProperties)];
    },
    CallExpression(path) {
        const patternProperties = [];
        path.node.arguments.forEach((argumentNode) => {
            patternProperties.push(
                babelTypes.objectProperty(argumentNode.left, argumentNode.right)
            );

        })
        path.node.arguments = [babelTypes.objectPattern(patternProperties)];
    }
};

module.exports = () => ({
   visitor: NamedParametersVisitor
});
