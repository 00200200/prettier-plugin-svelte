import { ParserOptions } from '../options';
import { Node } from '../print/nodes';
import { hasSnippedContent, unsnipContent } from './snipTagContent';

export function getText(node: Node, options: ParserOptions, unsnip = false) {
    const leadingComments: Node[] = (node as any).leadingComments;
    const trailingComments: Node[] = (node as any).trailingComments;
    const text = options.originalText.slice(
        options.locStart(
            // if there are comments before the node they are not included
            // in the `start` of the node itself
            (leadingComments && leadingComments[0]) || node,
        ),
        options.locEnd(trailingComments?.[trailingComments.length - 1] || node),
    );

    if (!unsnip || !hasSnippedContent(text)) {
        return text;
    }

    return unsnipContent(text);
}
