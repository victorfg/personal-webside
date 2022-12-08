import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

export const CodeblockCustom = ({content, language}) => {
    return (
        <SyntaxHighlighter code={content || ''} language={language || 'jsx'}/>
    )
}