/**
 * Wraps every word of an element in <span class="word">…</span> so words can be animated.
 * Inline elements (e.g. <span class="accent">) stay as one unit.
 */
export function splitWords(element: HTMLElement): HTMLElement[] {
    const fragment = document.createDocumentFragment();

    const addWord = (content: Node): void => {
        const word = document.createElement('span');
        word.className = 'word';
        word.append(content);
        fragment.append(word, ' ');
    };

    element.childNodes.forEach((node) =>
        node.nodeType === Node.TEXT_NODE
            ? (node.textContent ?? '').split(/\s+/).filter(Boolean).forEach((text) => addWord(document.createTextNode(text)))
            : addWord(node.cloneNode(true)),
    );

    element.replaceChildren(fragment);
    return Array.from(element.querySelectorAll<HTMLElement>('.word'));
}
