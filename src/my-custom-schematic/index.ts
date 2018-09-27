import {
    chain,
    externalSchematic,
    Rule,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myFile(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        tree.create(options.name || 'hello', 'world');
        return tree;
    };
}

const licenseText = `
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
`;

export function myComponent(options: any): Rule {
    return chain([
        externalSchematic('@schematics/angular', 'component', options),
        (tree: Tree, _context: SchematicContext) => {
            const sourceDir: string = `${options.name}`;

            tree.getDir(sourceDir).visit(filePath => {
                if (!filePath.endsWith('.ts')) {
                    return;
                }

                const content: Buffer = tree.read(filePath) as Buffer;
                if (!content || content.indexOf(licenseText) !== -1) {
                    return;
                }

                tree.overwrite(filePath, licenseText + content);
            });
        }
    ]);
}