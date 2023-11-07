import { Link } from "react-router-dom";

const SearchBar=()=>{

    return(
        <div className="searchBar-container">
            <div className="background-img"></div>
            <div className="searchBox">
               <Link style={{width:'80%'}} to="/search"><input type="text" placeholder="Enter name of Food or Dish"></input></Link>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
}

export default SearchBar;