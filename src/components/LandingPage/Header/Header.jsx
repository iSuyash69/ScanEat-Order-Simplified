import NavBar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";

const Header=()=>{
    return(
        <div className="header-container">
            <NavBar/>
            <SearchBar/>
        </div>
    );
}

export default Header;