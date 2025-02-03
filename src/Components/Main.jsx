import {useState, useRef, useEffect} from "react"
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromDeepSeek } from "../ai.js";
import Loading from '/Loading.svg'
function Main() {

     const [myingredients ,setMyingredients]= useState([]);
     const [recipeShown,setRecipeShown] =useState(false)
     const [Recepie,setRecipe] =useState("")
     const [loading, setLoading] = useState(false); //  loading for track the svg displaying
     const recipeSection = useRef(null)

    useEffect(()=> {
        if(Recepie!== ''&& recipeSection.current !== null){
            recipeSection.current.scrollIntoView()
        }
    },[Recepie])


     async function getRecipe() {
        setLoading(true);  // Show loader
        try {
            const AiRecepie = await getRecipeFromDeepSeek(myingredients)
            setRecipe(AiRecepie)
            setRecipeShown(prevrecepieShow => !prevrecepieShow)  
        } catch (error) {
            console.error('Error fetching recipe:', error);
        } finally{
            setLoading(false)
        }
    }
    

     const ingredientsListItems = myingredients.map(ingredient => (
           <li key={ingredient}>{ingredient}</li>
       ))
   
       function AddIngredient(formData) {
           const newIngredient = formData.get("ingredient")
           console.log(newIngredient);
            
           setMyingredients(prevIngredient =>
            [...prevIngredient ,newIngredient ]
           )
           
       }
   


    return(
            <main>
            <form action={AddIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button className="btn">Add ingredient</button>
            </form>
            {myingredients.length > 0 && <IngredientsList 
            ingListItems = {ingredientsListItems}
            toggle={getRecipe}
            ref={recipeSection}
            myingredient={myingredients}/>}
            
            {/* we see if it is time to fetch to start loading */}
            {loading ? 
    <img src={Loading} alt="loading..." className="loadingSvg" />: 
    (recipeShown ? <ClaudeRecipe recepie={Recepie}/> : null)
}   
        </main>
    )
}

export default Main

