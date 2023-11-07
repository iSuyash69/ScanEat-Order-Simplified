import FoodTypeCard from "./FoodTypeCard/FoodTypeCardSection";
import "./FoodTypeCardSection.css"

const FoodTypeCardSection=()=>{
    return(
        <div className="food-type-card-section-main-container">
            <h3>What's on your mind?</h3>
            <div className="food-type-card-container">
                <FoodTypeCard/>
            </div>
        </div>
    );
}

export default FoodTypeCardSection;