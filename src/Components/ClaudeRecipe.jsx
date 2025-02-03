
import Markdown from 'react-markdown'
function  ClaudeRecipe (props){
    return(
        <section>
        <h2>Chef Borma Recommends:</h2>
        <article className="suggested-recipe-container" aria-live="polite">
          <Markdown>{props.recepie}</Markdown>
        </article>
    </section>
    )
}

export default ClaudeRecipe